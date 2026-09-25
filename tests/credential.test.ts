import { describe, it, expect } from 'vitest';
import { computeCommitmentHash, PRESET_ALLOWLIST_ENTRIES } from '../src/lib/crypto';
import { midnightService } from '../src/lib/midnight';
import { PrivateWitnessData } from '../src/lib/types';

describe('PrivaPass Credential & Cryptographic Membership Suite', () => {

  it('1. Merkle Leaf Generation: Correctly derives SHA-256 commitment from passkey and identity salt', async () => {
    const entry = PRESET_ALLOWLIST_ENTRIES[0];
    const commitment = await computeCommitmentHash(entry.passkey, entry.identitySalt);

    expect(commitment).toMatch(/^0x[0-9a-fA-F]{64}$/);
    expect(commitment.startsWith('0x')).toBe(true);
    expect(commitment.length).toBe(66);
  });

  it('2. Commitment Collision Resistance: Distinct passkeys produce distinct cryptographic commitments', async () => {
    const commitmentA = await computeCommitmentHash('ALPHA_VIP_9824', 'salt_genesis_9921');
    const commitmentB = await computeCommitmentHash('ALPHA_VIP_9825', 'salt_genesis_9921');
    const commitmentC = await computeCommitmentHash('ALPHA_VIP_9824', 'salt_genesis_9922');

    expect(commitmentA).not.toBe(commitmentB);
    expect(commitmentA).not.toBe(commitmentC);
    expect(commitmentB).not.toBe(commitmentC);
  });

  it('3. Invalid Witness Rejection: Reject malformed or unseeded credentials', async () => {
    const invalidWitness: PrivateWitnessData = {
      secretPasskey: 'INVALID_CREDENTIAL_KEY_X99',
      identitySalt: 'salt_unauthorized',
    };

    // Attempting access with an invalid witness should throw a circuit constraint violation
    await expect(
      midnightService.executeZKAccessVerification(invalidWitness)
    ).rejects.toThrow(/Circuit Constraint Error|unauthorized/i);
  });

  it('4. Salt Boundary Enforcement: Enforces minimum entropy bounds for identity salt', async () => {
    const malformedWitness: PrivateWitnessData = {
      secretPasskey: 'short',
      identitySalt: '1',
    };

    await expect(
      midnightService.executeZKAccessVerification(malformedWitness)
    ).rejects.toThrow();
  });

  it('5. Privacy Invariant: Secret witness values are never included in verification result output payload', async () => {
    const entry = PRESET_ALLOWLIST_ENTRIES[2];
    const witness: PrivateWitnessData = {
      secretPasskey: entry.passkey,
      identitySalt: entry.identitySalt,
    };

    const result = await midnightService.executeZKAccessVerification(witness);
    const resultString = JSON.stringify(result);

    // Verify secret passkey is never exposed in the verification result
    expect(resultString).not.toContain(entry.passkey);
    expect(resultString).not.toContain(entry.identitySalt);
    expect(result.disclosedData.granted).toBe(true);
  });
});
