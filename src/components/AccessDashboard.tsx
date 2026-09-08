'use client';

import React from 'react';
import { ShieldCheck, ShieldAlert, Cpu, Database, Activity, RefreshCw, Radio } from 'lucide-react';
import { ContractLedgerState, VerificationResult } from '../lib/types';

interface AccessDashboardProps {
  ledgerState: ContractLedgerState;
  verificationResult: VerificationResult | null;
  onRefreshState: () => void;
  onTogglePortalStatus?: () => void;
}

export const AccessDashboard: React.FC<AccessDashboardProps> = ({
  ledgerState,
  verificationResult,
  onRefreshState,
  onTogglePortalStatus,
}) => {
  const isVerified = verificationResult?.isAccessGranted;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 1. Main Status Card (Locked vs Verified) */}
      <div className={`col-span-1 lg:col-span-2 relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-500 ${
        isVerified ? 'glass-panel-glow border-emerald-500/50' : 'glass-panel border-violet-800/40'
      }`}>
        
        {/* Ambient Glow */}
        <div className={`absolute -right-16 -top-16 w-64 h-64 rounded-full filter blur-3xl opacity-20 pointer-events-none transition-colors duration-500 ${
          isVerified ? 'bg-emerald-400' : 'bg-violet-600'
        }`} />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-5">
            <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl p-0.5 transition-all duration-500 ${
              isVerified 
                ? 'bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]' 
                : 'bg-gradient-to-br from-violet-600 to-indigo-900 shadow-neon-violet'
            }`}>
              <div className="w-full h-full bg-obsidian-900 rounded-[14px] flex items-center justify-center">
                {isVerified ? (
                  <ShieldCheck className="w-8 h-8 text-emerald-400 animate-bounce" />
                ) : (
                  <ShieldAlert className="w-8 h-8 text-violet-400 animate-pulse" />
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono tracking-widest uppercase text-gray-400">
                  PROTOCOL ACCESS STATUS
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                  isVerified 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                }`}>
                  {isVerified ? 'ZK VERIFIED' : 'RESTRICTED'}
                </span>
              </div>

              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isVerified ? 'text-white text-glow-cyan' : 'text-gray-200'
              }`}>
                {isVerified ? 'PrivaPass Verified Member' : 'Confidential Gate Locked'}
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-lg">
                {isVerified
                  ? 'Your zero-knowledge witness was verified by Midnight Preprod ledger. Unlocked anonymous credentials token active.'
                  : 'Submit your private passkey witness below to generate a zero-knowledge membership proof.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            <button
              onClick={onRefreshState}
              title="Refresh On-Chain State"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-violet-800/40 text-xs font-mono text-gray-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-violet-400" />
              <span>Sync Ledger</span>
            </button>
          </div>

        </div>

        {/* Verification Sub-stats */}
        {isVerified && verificationResult && (
          <div className="mt-6 pt-6 border-t border-emerald-500/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-gray-400 block text-[10px]">TX HASH</span>
              <span className="text-emerald-300 font-bold">{verificationResult.txHash.slice(0, 10)}...</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">PROOF SNARK ID</span>
              <span className="text-cyan-300 font-bold">{verificationResult.proofHash.slice(0, 12)}...</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">PREPROD BLOCK</span>
              <span className="text-violet-300 font-bold">#{verificationResult.blockHeight}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">WITNESS LEAK RISK</span>
              <span className="text-emerald-400 font-bold">0.00% (ZK Isolated)</span>
            </div>
          </div>
        )}

      </div>

      {/* 2. Live Verification Radar & Protocol Metrics */}
      <div className="col-span-1 rounded-2xl glass-panel p-6 flex flex-col justify-between relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-gray-300">
              Midnight Radar
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] text-cyan-400 font-mono">
            <Radio className="w-3 h-3 animate-pulse" />
            Live Preprod
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="space-y-4">
          
          <div className="flex items-center justify-between p-3 rounded-xl bg-obsidian-900/80 border border-violet-900/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-violet-600/20 text-violet-400">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block font-mono">TOTAL VERIFIED CLAIMS</span>
                <span className="text-lg font-bold text-white font-mono">{ledgerState.totalVerifiedClaims}</span>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
              +1 On Proof
            </span>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-900/80 border border-violet-900/30">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] text-gray-400 font-mono">ALLOWLIST ROOT HASH</span>
              </div>
              <span className="text-[10px] text-violet-400 font-mono">Compact Tree</span>
            </div>
            <p className="text-xs font-mono text-gray-300 truncate bg-obsidian-950 p-1.5 rounded border border-violet-900/20">
              {ledgerState.allowlistRoot}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <span className="text-gray-400">Portal Gate Status:</span>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                ledgerState.isPortalActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {ledgerState.isPortalActive ? 'Active Gate' : 'Paused'}
              </span>
              {onTogglePortalStatus && (
                <button
                  onClick={onTogglePortalStatus}
                  className="text-[10px] text-gray-400 hover:text-violet-300 underline"
                  title="Toggle portal status for circuit testing"
                >
                  (Toggle)
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
