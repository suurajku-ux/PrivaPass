'use client';

import React from 'react';
import { EyeOff, Eye, Lock, Shield, Check, X, ShieldAlert, Cpu } from 'lucide-react';

export const PrivacyMatrix: React.FC = () => {
  return (
    <div className="w-full rounded-2xl glass-panel p-6 sm:p-8 border border-violet-800/40">
      
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-witness text-xs font-mono mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>ZERO-KNOWLEDGE PRIVACY MATRIX</span>
        </div>
        <h3 className="text-2xl font-extrabold text-white">
          Cryptographic Witness Isolation Model
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          How Midnight Network’s Compact zero-knowledge execution environment separates confidential witnesses from public ledger state.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Private Witness Sandbox (100% Isolated) */}
        <div className="rounded-2xl p-6 bg-obsidian-900/90 border border-violet-500/30 relative overflow-hidden shadow-neon-violet">
          <div className="flex items-center justify-between pb-4 border-b border-violet-900/50 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                <EyeOff className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Kept 100% Private (Local Witness)</span>
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                </h4>
                <p className="text-[11px] text-violet-300 font-mono">
                  Never transmitted or logged on-chain
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3.5 text-xs font-mono">
            
            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-violet-900/30 flex items-start gap-3">
              <Lock className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-gray-200 block">Secret Access Passkey</span>
                <span className="text-gray-400 text-[11px]">e.g. <code className="text-violet-300">getSecretPasskey()</code> witness</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-violet-900/30 flex items-start gap-3">
              <Lock className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-gray-200 block">Identity Blinding Factor & Salt</span>
                <span className="text-gray-400 text-[11px]">e.g. <code className="text-violet-300">getIdentitySalt()</code> entropy</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-violet-900/30 flex items-start gap-3">
              <Lock className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-gray-200 block">Real Physical & Wallet Identity</span>
                <span className="text-gray-400 text-[11px]">Zero correlation to user address or IP</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-violet-900/30 flex items-start gap-3">
              <Lock className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-gray-200 block">Allowlist Pre-Image Tree Path</span>
                <span className="text-gray-400 text-[11px]">Evaluated exclusively within in-browser ZK circuit</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Public Ledger State (Minimal Disclosed) */}
        <div className="rounded-2xl p-6 bg-obsidian-900/90 border border-cyan-500/30 relative overflow-hidden shadow-neon-cyan">
          <div className="flex items-center justify-between pb-4 border-b border-cyan-900/50 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  What On-Chain Observers See
                </h4>
                <p className="text-[11px] text-cyan-300 font-mono">
                  Disclosed through Compact <code className="text-cyan-200">disclose()</code>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3.5 text-xs font-mono">
            
            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-cyan-900/30 flex items-start gap-3">
              <Cpu className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-gray-200 block">Anonymous ZK-SNARK Proof</span>
                <span className="text-gray-400 text-[11px]">Validates constraint satisfaction mathematically</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-cyan-900/30 flex items-start gap-3">
              <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-gray-200 block">Access Authorization Boolean</span>
                <span className="text-gray-400 text-[11px]"><code className="text-cyan-300">disclose(true)</code> access token</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-cyan-900/30 flex items-start gap-3">
              <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-gray-200 block">Total Claims Counter</span>
                <span className="text-gray-400 text-[11px]"><code className="text-cyan-300">totalVerifiedClaims.increment(1)</code></span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950/80 border border-cyan-900/30 flex items-start gap-3">
              <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-gray-200 block">Proof Timestamp & Block ID</span>
                <span className="text-gray-400 text-[11px]">Records execution epoch on Midnight Preprod</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
