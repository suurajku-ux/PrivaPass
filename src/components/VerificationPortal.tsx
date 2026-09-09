'use client';

import React, { useState } from 'react';
import { KeyRound, Eye, EyeOff, Sparkles, Fingerprint, Lock, Shield, Layers, HelpCircle, Check } from 'lucide-react';
import { PRESET_ALLOWLIST_ENTRIES } from '../lib/crypto';
import { PrivateWitnessData } from '../lib/types';

interface VerificationPortalProps {
  onVerify: (witness: PrivateWitnessData) => Promise<void>;
  isLoading: boolean;
}

export const VerificationPortal: React.FC<VerificationPortalProps> = ({
  onVerify,
  isLoading,
}) => {
  const [passkey, setPasskey] = useState<string>('');
  const [identitySalt, setIdentitySalt] = useState<string>('');
  const [showPasskey, setShowPasskey] = useState<boolean>(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');

  const handleSelectPreset = (entry: typeof PRESET_ALLOWLIST_ENTRIES[0]) => {
    setSelectedPresetId(entry.id);
    setPasskey(entry.passkey);
    setIdentitySalt(entry.identitySalt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim() || !identitySalt.trim()) return;

    await onVerify({
      secretPasskey: passkey.trim(),
      identitySalt: identitySalt.trim(),
    });
  };

  return (
    <div className="w-full rounded-2xl glass-panel p-6 sm:p-8 border border-violet-800/40 relative overflow-hidden">
      
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <KeyRound className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-violet-300 font-bold">
              CONFIDENTIAL CREDENTIAL VERIFICATION
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Zero-Knowledge Witness Input
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Your passkey and salt are processed locally via Midnight.js witness providers and never transmitted to the blockchain.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-gray-400">Quick Test Keys:</span>
          {PRESET_ALLOWLIST_ENTRIES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-200 border ${
                selectedPresetId === preset.id
                  ? 'bg-violet-600 text-white border-violet-400 shadow-neon-violet'
                  : 'bg-obsidian-850 hover:bg-obsidian-800 text-gray-300 border-violet-900/40'
              }`}
            >
              {preset.tier.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Passkey Input Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
              <span>Secret Access Passkey</span>
              <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full badge-witness text-[10px] font-mono font-medium">
              <Lock className="w-3 h-3" />
              <span>Private Witness (Kept Local)</span>
            </div>
          </div>
          
          <div className="relative">
            <input
              type={showPasskey ? 'text' : 'password'}
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="e.g. PRIVAPASS_GENESIS_SECRET_ALPHA_7749"
              required
              className="w-full px-4 py-3.5 rounded-xl glass-input text-sm text-gray-100 placeholder-gray-500 font-mono pr-12 focus:ring-1 focus:ring-violet-500"
            />
            <button
              type="button"
              onClick={() => setShowPasskey(!showPasskey)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors p-1"
            >
              {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Identity Salt / Commitment Parameter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
              <span>Identity Blinding Salt</span>
              <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full badge-witness text-[10px] font-mono font-medium">
              <Fingerprint className="w-3 h-3" />
              <span>Private Witness (Kept Local)</span>
            </div>
          </div>
          
          <input
            type="text"
            value={identitySalt}
            onChange={(e) => setIdentitySalt(e.target.value)}
            placeholder="e.g. SALT_MIDNIGHT_VALIDATOR_NODE_01"
            required
            className="w-full px-4 py-3.5 rounded-xl glass-input text-sm text-gray-100 placeholder-gray-500 font-mono focus:ring-1 focus:ring-violet-500"
          />
        </div>

        {/* Public Output Disclaimer Notice */}
        <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-violet-900/40 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-semibold text-gray-200">Public Disclosure Scope:</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono badge-ledger">
                disclose(isAccessGranted: true)
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              Midnight Compact executes <code className="text-violet-300">verifyAccess()</code>. Only the verified counter increment (+1) and access authorization flag are written to the public ledger. Your passkey never leaves this browser tab.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading || !passkey.trim() || !identitySalt.trim()}
          className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 transition-all duration-300 shadow-neon-violet ${
            isLoading || !passkey.trim() || !identitySalt.trim()
              ? 'bg-obsidian-800 text-gray-500 cursor-not-allowed border border-gray-700/30'
              : 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-neon-glow transform hover:-translate-y-0.5 active:translate-y-0'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating Zero-Knowledge SNARK Proof...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-violet-200" />
              <span>Generate ZK Access Proof & Unlock Gate</span>
            </>
          )}
        </button>

      </form>

    </div>
  );
};
