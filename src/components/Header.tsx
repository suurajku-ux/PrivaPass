'use client';

import React from 'react';
import { Shield, Lock, Wallet, Globe, LogOut, CheckCircle2 } from 'lucide-react';
import { WalletState } from '../lib/types';

interface HeaderProps {
  walletState: WalletState;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  walletState,
  onConnectWallet,
  onDisconnectWallet,
}) => {
  return (
    <header className="w-full border-b border-violet-900/40 bg-obsidian-950/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-900 p-0.5 shadow-neon-violet">
            <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-violet-400" />
              <Lock className="w-3 h-3 text-cyan-400 absolute -bottom-0.5 -right-0.5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
                PrivaPass
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Midnight ZK
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Confidential Credentials & Allowlist Protocol
            </p>
          </div>
        </div>

        {/* Network & Wallet Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Network Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian-850/80 border border-violet-900/50">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </div>
            <Globe className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-mono text-gray-300 font-medium">
              Midnight Preprod
            </span>
          </div>

          {/* Lace Wallet Button */}
          {walletState.isConnected && walletState.address ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-obsidian-800/90 border border-violet-500/40 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-gray-200 font-semibold">
                  {walletState.address.slice(0, 8)}...{walletState.address.slice(-6)}
                </span>
                <span className="hidden md:inline px-1.5 py-0.5 rounded bg-violet-900/60 text-violet-300 text-[11px]">
                  {walletState.balanceTDU.toFixed(1)} tDU
                </span>
              </div>
              <button
                onClick={onDisconnectWallet}
                title="Disconnect Wallet"
                className="p-2 rounded-xl bg-obsidian-800/90 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-violet-900/40 hover:border-red-500/40 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onConnectWallet}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 hover:from-violet-500 to-indigo-600 hover:to-indigo-500 text-white text-xs font-semibold shadow-neon-violet hover:shadow-neon-glow transition-all duration-300 transform active:scale-95"
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Lace Wallet</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
