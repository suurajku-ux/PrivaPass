/**
// ============================================================================
// PrivaPass Cryptographic Utility & Merkle Integration
// ----------------------------------------------------------------------------
// Implements canonical persistent hashing with strict domain separation
// matching Compact circuits in contract/priva_pass.compact
// ============================================================================
*/

import {
  pad32,
  toHex,
  fromHex,
  stringToBytes32,
  sha256,
  persistentHash,
  leafOf,
  nullifierOf,
  CanonicalMerkleTree,
  MerkleProof,
  GENESIS_SECRETS,
  GENESIS_MERKLE_TREE,
  CANONICAL_ALLOWLIST_ROOT
} from './merkle_tree';

export {
  pad32,
  toHex,
  fromHex,
  stringToBytes32,
  sha256,
  persistentHash,
  leafOf,
  nullifierOf,
  CanonicalMerkleTree,
  GENESIS_SECRETS,
  GENESIS_MERKLE_TREE,
  CANONICAL_ALLOWLIST_ROOT
};
export type { MerkleProof };

// Helper to convert string / hex to Uint8Array
export function hexToBytes(hex: string): Uint8Array {
  return fromHex(hex);
}

export function bytesToHex(bytes: Uint8Array): string {
  return `0x${toHex(bytes)}`;
}

/**
 * Deterministic hash matching Compact's persistent_hash([secretKey, salt])
 */
export async function computeCommitmentHash(secretPasskey: string, identitySalt: string): Promise<string> {
  const keyBytes = stringToBytes32(secretPasskey);
  const saltBytes = stringToBytes32(identitySalt);
  
  const combined = new Uint8Array(64);
  combined.set(keyBytes, 0);
  combined.set(saltBytes, 32);

  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', combined);
    return bytesToHex(new Uint8Array(hashBuffer));
  } else {
    return `0x${toHex(sha256(combined))}`;
  }
}

// Preset verified credentials registered in the Genesis allowlist root
export const PRESET_ALLOWLIST_ENTRIES = [
  {
    id: 'pass-01',
    title: 'Genesis DAO Founding Member',
    tier: 'Genesis DAO Tier-1' as const,
    passkey: GENESIS_SECRETS[0],
    identitySalt: 'SALT_MIDNIGHT_VALIDATOR_NODE_01',
    commitment: `0x${toHex(leafOf(GENESIS_SECRETS[0]))}`,
    badgeColor: 'text-violet-400 border-violet-500/40 bg-violet-500/10'
  },
  {
    id: 'pass-02',
    title: 'Accredited Institutional Participant',
    tier: 'Accredited Investor' as const,
    passkey: GENESIS_SECRETS[1],
    identitySalt: 'SALT_INSTITUTIONAL_ESCROW_02',
    commitment: `0x${toHex(leafOf(GENESIS_SECRETS[1]))}`,
    badgeColor: 'text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10'
  },
  {
    id: 'pass-03',
    title: 'Midnight Core Security Auditor',
    tier: 'Security Auditor' as const,
    passkey: GENESIS_SECRETS[2],
    identitySalt: 'SALT_FORMAL_VERIFICATION_NODE_03',
    commitment: `0x${toHex(leafOf(GENESIS_SECRETS[2]))}`,
    badgeColor: 'text-cyber-emerald border-cyber-emerald/40 bg-cyber-emerald/10'
  }
];
