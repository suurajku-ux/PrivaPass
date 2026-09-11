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
    <main className="min-h-screen flex flex-col justify-between text-gray-100 bg-obsidian-950">
      
      {/* 1. Header */}
      <Header
        walletState={walletState}
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
      />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 flex-1 w-full">
        
        {/* 2. Hero Section */}
        <section className="text-center max-w-3xl mx-auto pt-4 pb-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-witness text-xs font-mono mb-4 shadow-neon-violet">
            <Sparkles className="w-3.5 h-3.5 text-violet-300" />
            <span>Midnight Compact • Level-3 Protocol Implementation</span>
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

      {/* 7. Footer */}
      <footer className="w-full border-t border-violet-900/40 bg-obsidian-900/80 backdrop-blur-md py-8 mt-16 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-violet-400" />
            <span className="font-semibold text-gray-200">PrivaPass Protocol</span>
            <span className="text-gray-500">|</span>
            <span>Midnight Preprod Testnet (Compact v0.20.0)</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              ZK Circuits Active
            </span>
            <span className="text-gray-400">
              Witness Isolation: 100% Enforced
            </span>
          </div>
        </div>
      </footer>

    </main>
  );
}
