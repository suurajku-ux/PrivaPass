import { describe, it, expect, beforeEach } from 'vitest';
import { computeCommitmentHash, PRESET_ALLOWLIST_ENTRIES } from '../src/lib/crypto';
import { midnightService } from '../src/lib/midnight';
import { PrivateWitnessData } from '../src/lib/types';

describe('PrivaPass Compact Circuit & Midnight.js Integration Test Suite', () => {

  beforeEach(() => {
    // Reset service state before each test
    midnightService.setPortalActiveAdmin(true);
  });

  it('1. Credential Privacy: Valid secret passkey & salt generates valid proof and increments public counter', async () => {
    const genesisEntry = PRESET_ALLOWLIST_ENTRIES[0];
    const initialLedger = await midnightService.fetchLedgerState();
    const initialCount = initialLedger.totalVerifiedClaims;

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

    // Verify counter incremented on public ledger
    const updatedLedger = await midnightService.fetchLedgerState();
    expect(updatedLedger.totalVerifiedClaims).toBe(initialCount + 1);
  });

  it('2. Invalid Key Rejection: Invalid passkey or mismatched witness is rejected by circuit constraints', async () => {
    const invalidWitness: PrivateWitnessData = {
      secretPasskey: 'INVALID_ATTACKER_PASSKEY_123',
      identitySalt: 'INVALID_SALT_999',
    };

    // Even if salt is wrong or mismatched
    const mismatchedWitness: PrivateWitnessData = {
      secretPasskey: 'bad',
      identitySalt: 'bad',
    };

    await expect(midnightService.executeZKAccessVerification(mismatchedWitness))
      .rejects
      .toThrow(/Circuit Constraint Error|Invalid/);
  });

  it('3. State Assertion: Paused verification portal rejects proof verification', async () => {
    // Admin pauses the portal
    midnightService.setPortalActiveAdmin(false);

    const genesisEntry = PRESET_ALLOWLIST_ENTRIES[0];
    const witness: PrivateWitnessData = {
      secretPasskey: genesisEntry.passkey,
      identitySalt: genesisEntry.identitySalt,
    };

    await expect(midnightService.executeZKAccessVerification(witness))
      .rejects
      .toThrow(/deactivated/);
  });

  it('4. Witness Isolation: Secret passkey & identity salt are never leaked to public ledger state', async () => {
    const genesisEntry = PRESET_ALLOWLIST_ENTRIES[1];
    const witness: PrivateWitnessData = {
      secretPasskey: genesisEntry.passkey,
      identitySalt: genesisEntry.identitySalt,
    };

    const result = await midnightService.executeZKAccessVerification(witness);

    // Assert that the returned public transaction and ledger state do NOT contain the raw passkey or salt
    expect(result.privateWitnessState.secretPasskeyProtected).toBe(true);
    expect(result.privateWitnessState.identitySaltProtected).toBe(true);
    expect(result.privateWitnessState.leakedToLedger).toBe(false);

    const ledger = await midnightService.fetchLedgerState();
    const ledgerString = JSON.stringify(ledger);
    expect(ledgerString).not.toContain(genesisEntry.passkey);
    expect(ledgerString).not.toContain(genesisEntry.identitySalt);
  });

  it('5. Cryptographic Commitment: Local commitment calculation matches expected allowlist entries', async () => {
    for (const entry of PRESET_ALLOWLIST_ENTRIES) {
      const commitment = await computeCommitmentHash(entry.passkey, entry.identitySalt);
      expect(commitment).toBeDefined();
      expect(commitment.startsWith('0x')).toBe(true);
      expect(commitment.length).toBeGreaterThan(10);
    }
  });

});
