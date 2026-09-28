import { describe, it, expect, beforeEach } from 'vitest';
import { midnightService } from '../src/lib/midnight';
import { PRESET_ALLOWLIST_ENTRIES } from '../src/lib/crypto';
import { PrivateWitnessData } from '../src/lib/types';

describe('PrivaPass Public Counter & Ledger Transition Suite', () => {

  beforeEach(() => {
    midnightService.setPortalActiveAdmin(true);
    midnightService.resetSpentNullifiers();
  });

  it('1. Public State Monotonicity: Successful ZK proof verification increments verified claim counter', async () => {
    const entry = PRESET_ALLOWLIST_ENTRIES[0];
    const witness: PrivateWitnessData = {
      secretPasskey: entry.passkey,
      identitySalt: entry.identitySalt,
    };

    const result = await midnightService.executeZKAccessVerification(witness);
    expect(result.disclosedData.granted).toBe(true);
    expect(result.disclosedData.counterIncrement).toBe(1);
    expect(result.txHash).toBeDefined();
    expect(result.txHash.startsWith('0x')).toBe(true);
    expect(result.proofHash).toBeDefined();
    expect(result.proofHash.startsWith('0x')).toBe(true);
  });

  it('2. Admin Emergency Controls: Deactivated portal rejects ZK verification attempts gracefully', async () => {
    midnightService.setPortalActiveAdmin(false);

    const entry = PRESET_ALLOWLIST_ENTRIES[1];
    const witness: PrivateWitnessData = {
      secretPasskey: entry.passkey,
      identitySalt: entry.identitySalt,
    };

    await expect(
      midnightService.executeZKAccessVerification(witness)
    ).rejects.toThrow(/Verification portal is currently deactivated/i);
  });

  it('3. Ledger State Consistency: Public ledger state maintains valid schema and active status', async () => {
    const state = await midnightService.fetchLedgerState();

    expect(state).toHaveProperty('allowlistRoot');
    expect(state).toHaveProperty('totalVerifiedClaims');
    expect(state).toHaveProperty('isPortalActive');
    expect(state).toHaveProperty('adminPublicKey');
    expect(typeof state.totalVerifiedClaims).toBe('number');
    expect(state.totalVerifiedClaims).toBeGreaterThanOrEqual(1);
  });
});
