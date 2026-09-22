'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { AccessDashboard } from '../components/AccessDashboard';
import { VerificationPortal } from '../components/VerificationPortal';
import { ProofProgressModal } from '../components/ProofProgressModal';
import { PrivacyMatrix } from '../components/PrivacyMatrix';
import { GatedContent } from '../components/GatedContent';
import { midnightService, INITIAL_LEDGER_STATE } from '../lib/midnight';
import { ContractLedgerState, PrivateWitnessData, VerificationResult, WalletState } from '../lib/types';
import { Shield, Sparkles, Terminal, ExternalLink, Code2, Lock } from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    network: 'Preprod',
    balanceTDU: 0,
    isLaceInstalled: false,
  });

  const [ledgerState, setLedgerState] = useState<ContractLedgerState>(INITIAL_LEDGER_STATE);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProving, setIsProving] = useState<boolean>(false);
  const [proofStep, setProofStep] = useState<number>(1);
  const [proofMessage, setProofMessage] = useState<string>('Initializing ZK prover...');
  const [isProofComplete, setIsProofComplete] = useState<boolean>(false);
  const [proofError, setProofError] = useState<string | null>(null);

  // Initialize wallet & state on mount
  useEffect(() => {
    setMounted(true);
    midnightService.checkLaceAvailability();
    setWalletState(midnightService.getWalletState());
    fetchState();
  }, []);

  const fetchState = async () => {
    const state = await midnightService.fetchLedgerState();
    setLedgerState(state);
  };

  const handleConnectWallet = async () => {
    const state = await midnightService.connectWallet();
    setWalletState(state);
  };

  const handleDisconnectWallet = () => {
    const state = midnightService.disconnectWallet();
    setWalletState(state);
  };

  const handleTogglePortalStatus = () => {
    midnightService.setPortalActiveAdmin(!ledgerState.isPortalActive);
    fetchState();
  };

  const handleVerifyAccess = async (witness: PrivateWitnessData) => {
    setIsProving(true);
    setIsModalOpen(true);
    setProofStep(1);
    setIsProofComplete(false);
    setProofError(null);

    try {
      const result = await midnightService.executeZKAccessVerification(
        witness,
        (step, total, message) => {
          setProofStep(step);
          setProofMessage(message);
        }
      );

      setVerificationResult(result);
      setIsProofComplete(true);
      await fetchState();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown proof verification failure';
      setProofError(message);
    } finally {
      setIsProving(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-between text-gray-100 bg-obsidian-950 relative overflow-hidden">
      
      {/* Background Decorative Ambient Radials */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-violet-600/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-80 right-0 w-[400px] h-[400px] bg-violet-600/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl pointer-events-none -z-10" />

      {/* 1. Header */}
      <Header
        walletState={walletState}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
      />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 flex-1 w-full">
        
        {/* 2. Enhanced Hero Section with Official Brand Logo */}
        <section className="text-center max-w-4xl mx-auto pt-4 pb-4 flex flex-col items-center">
          
          {/* Brand Logo Display */}
          <div className="mb-6 flex flex-col items-center">
            <div className="p-3.5 rounded-3xl bg-obsidian-900/90 border border-violet-500/30 shadow-[0_0_35px_rgba(168,85,247,0.3)] backdrop-blur-xl">
              <img 
                src="/logo.svg" 
                alt="PrivaPass Brand Logo" 
                className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]" 
              />
            </div>
          </div>

          {/* Badges Bar: Protocol + Step 4 Product X Profile */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-witness text-xs font-mono shadow-neon-violet">
              <Sparkles className="w-3.5 h-3.5 text-violet-300" />
              <span>Midnight Compact • Level-3 Protocol</span>
            </div>

            {/* Product X Link Badge */}
            <a
              href="https://x.com/PrivaPassZK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-900 hover:bg-obsidian-850 border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono text-cyan-300 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] group"
            >
              <svg className="w-3 h-3 fill-current text-cyan-400 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Product X: <strong>@PrivaPassZK</strong></span>
              <ExternalLink className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            Zero-Knowledge <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent text-glow-violet">
              Confidential Credentials
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            PrivaPass allows users to prove membership in exclusive allowlists, accredited registries, and DAO tiers using private witnesses without ever revealing their real wallet address or secret passkey on-chain.
          </p>

          {/* Quick Stats Banner */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Preprod Deployed
            </span>
            <span className="text-gray-700">|</span>
            <span className="text-violet-300">
              Contract: Compact v0.20+
            </span>
            <span className="text-gray-700">|</span>
            <span className="text-cyan-300">
              Private Witnesses: 100% Isolated
            </span>
          </div>

        </section>

        {/* 3. Access Dashboard */}
        <section>
          <AccessDashboard
            ledgerState={ledgerState}
            verificationResult={verificationResult}
            onRefreshState={fetchState}
            onTogglePortalStatus={handleTogglePortalStatus}
          />
        </section>

        {/* 4. Confidential Verification Portal */}
        <section>
          <VerificationPortal
            onVerify={handleVerifyAccess}
            isLoading={isProving}
          />
        </section>

        {/* 5. Unlocked Gated Content Area */}
        <section>
          <GatedContent
            isVerified={!!verificationResult?.isAccessGranted}
            verificationResult={verificationResult}
          />
        </section>

        {/* 6. Interactive Privacy Matrix */}
        <section>
          <PrivacyMatrix />
        </section>

      </div>

      {/* Proof Progress Modal */}
      <ProofProgressModal
        isOpen={isModalOpen}
        currentStep={proofStep}
        totalSteps={4}
        statusMessage={proofMessage}
        isComplete={isProofComplete}
        error={proofError}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 7. Footer with Socials & Step 4 Attribution */}
      <footer className="w-full border-t border-violet-900/40 bg-obsidian-900/90 backdrop-blur-md py-8 mt-16 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <img src="/icon.svg" alt="PrivaPass Icon" className="w-6 h-6" />
            <span className="font-semibold text-gray-200">PrivaPass Protocol</span>
            <span className="text-gray-600">|</span>
            <span>Midnight Preprod Testnet (Compact v0.20.0)</span>
          </div>

          {/* Social and Repository Links */}
          <div className="flex items-center gap-5 font-mono text-xs">
            <a
              href="https://x.com/PrivaPassZK"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X: @PrivaPassZK</span>
            </a>

            <span className="text-gray-700">•</span>

            <a
              href="https://github.com/suurajku-ux/PrivaPass"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-300 transition-colors"
            >
              GitHub Repo
            </a>

            <span className="text-gray-700">•</span>

            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              ZK Circuits Active
            </span>
          </div>

        </div>
      </footer>

    </main>
  );
}
