'use client';

import React, { useState } from 'react';
import { Lock, Unlock, FileText, Award, CheckCircle2, ShieldCheck, Download, Sparkles, Key, ExternalLink } from 'lucide-react';
import { VerificationResult } from '../lib/types';
import { DEPLOYED_CONTRACT_ADDRESS } from '../lib/midnight';

interface GatedContentProps {
  isVerified: boolean;
  verificationResult: VerificationResult | null;
}

export const GatedContent: React.FC<GatedContentProps> = ({
  isVerified,
  verificationResult,
}) => {
  const [activeTab, setActiveTab] = useState<'alpha' | 'proof' | 'credential'>('alpha');

  const handleDownloadProof = () => {
    if (!verificationResult) return;
    const proofBlob = new Blob([JSON.stringify(verificationResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(proofBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `privapass-proof-${verificationResult.txHash.slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isVerified) {
    return (
      <div className="w-full rounded-2xl glass-panel p-8 sm:p-12 border border-violet-900/40 text-center relative overflow-hidden">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-obsidian-900 border border-violet-800/50 flex items-center justify-center mb-4 text-violet-400">
            <Lock className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-xl font-bold text-gray-200 mb-2">
            Gated VIP Area Restricted
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mb-6 leading-relaxed">
            This module requires a verified Zero-Knowledge PrivaPass proof. Submit your confidential credentials in the portal above to unlock confidential intel and cryptographic attestations.
          </p>
          <div className="px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-800/40 text-violet-300 text-xs font-mono">
            Waiting for Compact <code className="text-violet-200">verifyAccess()</code> validation
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl glass-panel-glow p-6 sm:p-8 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.2)] animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-500/20 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Unlock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
              UNLOCKED PRIVAPASS PORTAL
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>Confidential Tier Member Access</span>
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-obsidian-900 border border-emerald-500/30">
          <button
            onClick={() => setActiveTab('alpha')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'alpha'
                ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>VIP Alpha Intel</span>
          </button>

          <button
            onClick={() => setActiveTab('proof')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'proof'
                ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>On-Chain Attestation</span>
          </button>

          <button
            onClick={() => setActiveTab('credential')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'credential'
                ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>ZK Credential</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Alpha Intel & Confidential Documents */}
      {activeTab === 'alpha' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-xl bg-obsidian-900/90 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                CONFIDENTIAL PROTOCOL ROADMAP & ALLOCATION MANIFESTO
              </span>
              <span className="text-[10px] font-mono text-gray-400 bg-obsidian-950 px-2 py-0.5 rounded border border-gray-800">
                ZK-DECRYPTED
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              Welcome to the PrivaPass Genesis Council. As a verified confidential credential holder on Midnight Preprod, you possess zero-knowledge authorization to inspect private contract parameters, strategic liquidity milestones, and encrypted bridge endpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-obsidian-950/80 border border-violet-900/40">
              <span className="text-xs font-mono text-violet-400 block mb-1">MIDNIGHT SHIELD POOL</span>
              <span className="text-lg font-bold text-white font-mono">$4,250,000 tDU</span>
              <p className="text-[11px] text-gray-400 mt-1">
                Zero-knowledge liquidity vault protected by Compact threshold circuits.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-950/80 border border-cyan-900/40">
              <span className="text-xs font-mono text-cyan-400 block mb-1">PRIVACY ROUTER EPOCH</span>
              <span className="text-lg font-bold text-white font-mono">Preprod Epoch (Active)</span>
              <p className="text-[11px] text-gray-400 mt-1">
                Synchronized with Lace DApp Connector and Preprod prover nodes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: On-Chain Proof & Attestation */}
      {activeTab === 'proof' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-xl bg-obsidian-900/90 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-400" />
                <span>Zero-Knowledge Proof Attestation</span>
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                SucceedEntirely
              </span>
            </div>
            
            <p className="text-xs text-gray-400 mb-4">
              Your confidential credential proof has been evaluated and confirmed on Midnight Preprod via Compact circuit constraints.
            </p>

            <div className="space-y-2 text-xs font-mono mb-4">
              <div className="p-3 rounded-lg bg-obsidian-950 border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-gray-400">Transaction ID:</span>
                <span className="text-emerald-300 break-all">{verificationResult?.txHash}</span>
              </div>
              <div className="p-3 rounded-lg bg-obsidian-950 border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-gray-400">Deployed Contract:</span>
                <span className="text-cyan-300 break-all">{DEPLOYED_CONTRACT_ADDRESS}</span>
              </div>
              <div className="p-3 rounded-lg bg-obsidian-950 border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-gray-400">Nullifier Status:</span>
                <span className="text-emerald-400 font-semibold">Recorded (Replay Protected)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadProof}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Proof JSON</span>
              </button>
              
              <a
                href={`https://preprod.midnightexplorer.com/contracts/0x${DEPLOYED_CONTRACT_ADDRESS.replace(/^0x/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-obsidian-950 hover:bg-obsidian-800 border border-gray-700 text-gray-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View in Midnight Explorer</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: ZK Credential Badge */}
      {activeTab === 'credential' && (
        <div className="p-6 rounded-xl bg-obsidian-900/90 border border-emerald-500/30 text-center animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-4">
            <div className="w-full h-full bg-obsidian-950 rounded-[14px] flex items-center justify-center">
              <Award className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <h4 className="text-lg font-bold text-white mb-1">
            Midnight PrivaPass Verified Credential
          </h4>
          <p className="text-xs text-gray-400 max-w-md mx-auto mb-4 font-mono">
            ZK Authorization Token • Compact verifyAccess() • Contract: {DEPLOYED_CONTRACT_ADDRESS.slice(0, 16)}...
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cryptographically Verified on Midnight Preprod</span>
          </div>
        </div>
      )}

    </div>
  );
};
