'use client';

import React, { useState } from 'react';
import { Lock, Unlock, Vote, FileText, Award, CheckCircle2, ShieldCheck, Download, Sparkles, Send } from 'lucide-react';
import { VerificationResult } from '../lib/types';

interface GatedContentProps {
  isVerified: boolean;
  verificationResult: VerificationResult | null;
}

export const GatedContent: React.FC<GatedContentProps> = ({
  isVerified,
  verificationResult,
}) => {
  const [activeTab, setActiveTab] = useState<'alpha' | 'dao' | 'credential'>('alpha');
  const [selectedProposalVote, setSelectedProposalVote] = useState<string | null>(null);
  const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);

  const handleCastVote = () => {
    if (!selectedProposalVote) return;
    setVoteSubmitted(true);
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
            This module requires a verified Zero-Knowledge PrivaPass proof. Submit your confidential credentials in the portal above to unlock anonymous DAO governance and confidential intel.
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
            onClick={() => setActiveTab('dao')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'dao'
                ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Vote className="w-3.5 h-3.5" />
            <span>Private DAO Vote</span>
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
              <span className="text-lg font-bold text-white font-mono">Epoch #42 (Active)</span>
              <p className="text-[11px] text-gray-400 mt-1">
                Synchronized with Lace DApp Connector and Preprod prover nodes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Anonymous DAO Voting */}
      {activeTab === 'dao' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-xl bg-obsidian-900/90 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-white">
                Proposal #014: Enable Multi-Asset Confidential Escrow on Midnight
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                100% Anonymous Ballot
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Cast your vote using your zero-knowledge credential token. Your wallet address is never linked to your choice on-chain.
            </p>

            {voteSubmitted ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center gap-3 text-xs font-mono text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Zero-knowledge ballot cast anonymously on Midnight Preprod! Vote token recorded without voter linkage.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {['Approve & Deploy Upgrade', 'Reject Proposal', 'Abstain'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedProposalVote(option)}
                    className={`w-full p-3 rounded-xl text-xs font-mono text-left flex items-center justify-between border transition-all ${
                      selectedProposalVote === option
                        ? 'bg-emerald-900/40 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : 'bg-obsidian-950 border-gray-800 text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    <span>{option}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedProposalVote === option ? 'border-emerald-400 bg-emerald-500' : 'border-gray-600'
                    }`}>
                      {selectedProposalVote === option && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleCastVote}
                  disabled={!selectedProposalVote}
                  className={`w-full mt-3 py-3 rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all ${
                    selectedProposalVote
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                      : 'bg-obsidian-800 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Anonymous ZK Vote</span>
                </button>
              </div>
            )}
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
            ZK Authorization Token • Compact verifyAccess() • Proof Hash: {verificationResult?.proofHash}
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
