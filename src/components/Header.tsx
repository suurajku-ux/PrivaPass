'use client';

import React from 'react';
import { Wallet, Globe, LogOut, CheckCircle2 } from 'lucide-react';
import { WalletState } from '../lib/types';
import { PrivaPassLogo } from './PrivaPassLogo';

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
    <header className="w-full border-b border-violet-900/40 bg-obsidian-950/85 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Proper Signature Logo */}
        <div className="flex items-center">
          <PrivaPassLogo size="md" animated={true} />
        </div>

        {/* Action Controls: Socials, Network & Wallet */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Product X (Twitter) Profile Link Button - STEP 4 COMPLIANCE */}
          <a
            href="https://x.com/PrivaPassZK"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow PrivaPass on X (@PrivaPassZK)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-violet-800/40 hover:border-violet-500/60 text-xs font-mono text-gray-300 hover:text-white transition-all shadow-sm hover:shadow-neon-violet group"
          >
            {/* Minimalist X Logo SVG */}
            <svg className="w-3.5 h-3.5 fill-current text-gray-400 group-hover:text-violet-300 transition-colors" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="hidden md:inline font-semibold text-gray-300 group-hover:text-white">@PrivaPassZK</span>
            <span className="hidden lg:inline text-[10px] px-1.5 py-0.2 rounded bg-violet-900/60 text-violet-300">X</span>
          </a>

          {/* GitHub Repository Link Button */}
          <a
            href="https://github.com/suurajku-ux/PrivaPass"
            target="_blank"
            rel="noopener noreferrer"
            title="View PrivaPass Source Code on GitHub"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-violet-800/40 hover:border-violet-500/60 text-xs font-mono text-gray-300 hover:text-white transition-all"
          >
            <svg className="w-3.5 h-3.5 fill-current text-gray-400" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="text-[11px] font-semibold text-gray-300">GitHub</span>
          </a>

          {/* Network Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-obsidian-850/90 border border-violet-900/50">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </div>
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono text-gray-300 font-medium">
              Midnight Preprod
            </span>
          </div>

          {/* Lace Wallet Button */}
          {walletState.isConnected && walletState.address ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-obsidian-800/90 border border-violet-500/40 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-gray-200 font-semibold">
                  {walletState.address.slice(0, 7)}...{walletState.address.slice(-5)}
                </span>
                <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-violet-900/60 text-violet-300 text-[11px]">
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
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 hover:from-violet-500 to-indigo-600 hover:to-indigo-500 text-white text-xs font-semibold shadow-neon-violet hover:shadow-neon-glow transition-all duration-300 transform active:scale-95"
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Lace</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};

