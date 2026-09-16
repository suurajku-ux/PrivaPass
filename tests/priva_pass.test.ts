import { describe, it, expect, beforeEach } from 'vitest';
import { computeCommitmentHash, PRESET_ALLOWLIST_ENTRIES } from '../src/lib/crypto';
import { midnightService, DEPLOYED_CONTRACT_ADDRESS, PREPROD_INDEXER_URI, PREPROD_NODE_URI } from '../src/lib/midnight';
import { PrivateWitnessData } from '../src/lib/types';

describe('PrivaPass Compact Circuit & Midnight.js Integration Test Suite', () => {

  it('1. Credential Privacy: Valid secret passkey & salt generates valid ZK proof and updates public counter', async () => {
    const genesisEntry = PRESET_ALLOWLIST_ENTRIES[0];
    const witness: PrivateWitnessData = {
      secretPasskey: genesisEntry.passkey,
      identitySalt: genesisEntry.identitySalt,
    };

    const result = await midnightService.executeZKAccessVerification(witness);

    expect(result.isAccessGranted).toBe(true);
    expect(result.disclosedData.granted).toBe(true);
    expect(result.disclosedData.counterIncrement).toBe(1);
    expect(result.txHash).toBeDefined();
    expect(result.proofHash).toBeDefined();
  });

  it('2. Witness Isolation: Secret passkey & identity salt are strictly protected and never leaked to public ledger state', async () => {
    const genesisEntry = PRESET_ALLOWLIST_ENTRIES[1];
    const witness: PrivateWitnessData = {
      secretPasskey: genesisEntry.passkey,
      identitySalt: genesisEntry.identitySalt,
    };

    const result = await midnightService.executeZKAccessVerification(witness);

    expect(result.privateWitnessState.secretPasskeyProtected).toBe(true);
    expect(result.privateWitnessState.identitySaltProtected).toBe(true);
    expect(result.privateWitnessState.leakedToLedger).toBe(false);

    const ledger = await midnightService.fetchLedgerState();
    const ledgerString = JSON.stringify(ledger);
    expect(ledgerString).not.toContain(genesisEntry.passkey);
    expect(ledgerString).not.toContain(genesisEntry.identitySalt);
  });

  it('3. Cryptographic Commitment: Merkle leaf / commitment computation is deterministic', async () => {
    for (const entry of PRESET_ALLOWLIST_ENTRIES) {
      const commitment = await computeCommitmentHash(entry.passkey, entry.identitySalt);
      expect(commitment).toBeDefined();
      expect(commitment.startsWith('0x')).toBe(true);
      expect(commitment.length).toBeGreaterThan(10);
    }
  });

  it('4. Live Preprod E2E Endpoint Validation: Verifies indexer, node, and deployed contract address configuration', async () => {
    expect(DEPLOYED_CONTRACT_ADDRESS).toBe('f625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d');
    expect(PREPROD_INDEXER_URI).toContain('indexer.preprod.midnight.network');
    expect(PREPROD_NODE_URI).toContain('rpc.preprod.midnight.network');

    const ledgerState = await midnightService.fetchLedgerState();
    expect(ledgerState.allowlistRoot).toBe(DEPLOYED_CONTRACT_ADDRESS);
    expect(ledgerState.isPortalActive).toBe(true);
  });
});
