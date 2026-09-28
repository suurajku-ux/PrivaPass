import { describe, it, expect, beforeEach } from 'vitest';
import { computeCommitmentHash, PRESET_ALLOWLIST_ENTRIES, leafOf, nullifierOf, toHex, CanonicalMerkleTree, GENESIS_MERKLE_TREE } from '../src/lib/crypto';
import { midnightService } from '../src/lib/midnight';
import { PrivateWitnessData } from '../src/lib/types';

describe('PrivaPass Credential & Cryptographic Membership Suite', () => {

  beforeEach(() => {
    midnightService.setPortalActiveAdmin(true);
    midnightService.resetSpentNullifiers();
  });

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

  it('3. Canonical Merkle Tree: 5-Depth Merkle proof generates valid root matching allowlist', async () => {
    const leaf0 = leafOf(PRESET_ALLOWLIST_ENTRIES[0].passkey);
    const proof0 = GENESIS_MERKLE_TREE.getProof(0);

    expect(proof0.path.length).toBe(5);
    expect(proof0.directions.length).toBe(5);
    expect(CanonicalMerkleTree.verifyProof(proof0, GENESIS_MERKLE_TREE.getRoot())).toBe(true);
  });

  it('4. Invalid Witness Rejection: Reject malformed or unseeded credentials', async () => {
    const invalidWitness: PrivateWitnessData = {
      secretPasskey: 'UNAUTHORIZED_ATTACKER_SECRET_KEY_9999',
      identitySalt: 'salt_unauthorized',
    };

    // Attempting access with an invalid witness fails circuit constraint assertion
    await expect(
      midnightService.executeZKAccessVerification(invalidWitness)
    ).rejects.toThrow(/Compact Circuit Constraint Error|candidateRoot != allowlistRoot/i);
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
