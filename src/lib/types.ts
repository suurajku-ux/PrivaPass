export interface ContractLedgerState {
  allowlistRoot: string;
  totalVerifiedClaims: number;
  isPortalActive: boolean;
  lastVerifiedTimestamp: number;
  adminPublicKey: string;
}

export interface PrivateWitnessData {
  secretPasskey: string;
  identitySalt: string;
}

export interface VerificationResult {
  isAccessGranted: boolean;
  txHash: string;
  proofHash: string;
  commitment: string;
  timestamp: number;
  blockHeight: number;
  disclosedData: {
    granted: boolean;
    counterIncrement: number;
  };
  privateWitnessState: {
    secretPasskeyProtected: boolean;
    identitySaltProtected: boolean;
    leakedToLedger: false;
  };
}

export type ProofStepStatus = 'idle' | 'in_progress' | 'completed' | 'failed';

export interface ProofStep {
  id: string;
  label: string;
  detail: string;
  status: ProofStepStatus;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  network: 'Preprod' | 'Local' | 'Devnet';
  balanceTDU: number;
  isLaceInstalled: boolean;
}

export interface AllowlistEntry {
  id: string;
  title: string;
  tier: 'Accredited Investor' | 'Genesis DAO Tier-1' | 'Security Auditor' | 'Confidential VIP';
  passkey: string;
  identitySalt: string;
  commitment: string;
  badgeColor: string;
}
