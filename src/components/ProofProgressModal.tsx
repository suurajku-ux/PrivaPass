'use client';

import React from 'react';
import { Cpu, ShieldCheck, CheckCircle2, Loader2, Sparkles, X } from 'lucide-react';

interface ProofProgressModalProps {
  isOpen: boolean;
  currentStep: number;
  totalSteps: number;
  statusMessage: string;
  onClose: () => void;
  isComplete: boolean;
  error?: string | null;
}

const STEPS = [
  {
    title: 'Witness Isolation',
    desc: 'Extracting private passkey & salt into local ZK memory sandbox',
  },
  {
    title: 'ZK-SNARK Synthesis',
    desc: 'Generating mathematical constraint proof via Compact prover',
  },
  {
    title: 'Preprod Relay',
    desc: 'Broadcasting zero-knowledge transaction to Midnight Preprod',
  },
  {
    title: 'Disclose & Gate Unlock',
    desc: 'Finalizing ledger counter & emitting boolean access token',
  },
];

export const ProofProgressModal: React.FC<ProofProgressModalProps> = ({
  isOpen,
  currentStep,
  totalSteps,
  statusMessage,
  onClose,
  isComplete,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel-glow p-6 sm:p-8 border border-violet-500/40 shadow-[0_0_50px_rgba(139,92,246,0.3)]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-violet-900/40 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                {isComplete ? 'Proof Verified Successfully' : error ? 'Proof Verification Error' : 'Zero-Knowledge Prover Pipeline'}
              </h4>
              <p className="text-xs text-gray-400 font-mono">
                Midnight Compact ZK Engine • Preprod Testnet
              </p>
            </div>
          </div>

          {(isComplete || error) && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-obsidian-850 hover:bg-obsidian-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Message */}
        <div className="mb-6 p-3 rounded-xl bg-obsidian-900/90 border border-violet-900/40 flex items-center gap-3">
          {error ? (
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          ) : isComplete ? (
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
          ) : (
            <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
          )}
          <span className={`text-xs font-mono font-medium ${
            error ? 'text-red-400' : isComplete ? 'text-emerald-300' : 'text-violet-300'
          }`}>
            {error || statusMessage}
          </span>
        </div>

        {/* Step-by-Step Flow */}
        <div className="space-y-4 mb-6">
          {STEPS.map((step, idx) => {
            const stepNum = idx + 1;
            const isCurrent = currentStep === stepNum && !isComplete && !error;
            const isDone = currentStep > stepNum || isComplete;
            const isPending = currentStep < stepNum && !isComplete;

            return (
              <div
                key={step.title}
                className={`flex items-start gap-3.5 p-3 rounded-xl transition-all duration-300 ${
                  isCurrent
                    ? 'bg-violet-950/60 border border-violet-500/50 shadow-neon-violet'
                    : isDone
                    ? 'bg-obsidian-900/60 border border-emerald-500/30'
                    : 'bg-obsidian-900/20 border border-gray-800/30 opacity-60'
                }`}
              >
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-mono">
                      {stepNum}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${
                      isDone ? 'text-emerald-300' : isCurrent ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      Step 0{stepNum}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        {isComplete && (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Enter Unlocked VIP Portal</span>
          </button>
        )}

        {error && (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-red-600/80 hover:bg-red-500 text-white text-xs font-bold transition-all"
          >
            Close & Retry
          </button>
        )}

      </div>
    </div>
  );
};
