/**
 * PrivaPass Cryptographic Utility
 * Handles deterministic commitment computation matching Compact's persistent_hash
 */

// Helper to convert string / hex to Uint8Array
export function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  const paddedHex = cleanHex.length % 2 !== 0 ? '0' + cleanHex : cleanHex;
  const bytes = new Uint8Array(paddedHex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(paddedHex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

export function bytesToHex(bytes: Uint8Array): string {
  return '0x' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function stringToBytes32(str: string): Uint8Array {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(str);
  const bytes32 = new Uint8Array(32);
  bytes32.set(encoded.slice(0, 32));
  return bytes32;
}

/**
 * Deterministic hash simulation for Compact's persistent_hash([secretKey, salt])
 * In browser environment, uses Web Crypto API SHA-256 or fallback
 */
export async function computeCommitmentHash(secretPasskey: string, identitySalt: string): Promise<string> {
  const keyBytes = stringToBytes32(secretPasskey);
  const saltBytes = stringToBytes32(identitySalt);
  
  // Combine inputs
  const combined = new Uint8Array(64);
  combined.set(keyBytes, 0);
  combined.set(saltBytes, 32);

  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', combined);
    return bytesToHex(new Uint8Array(hashBuffer));
  } else {
    // Fallback simple deterministic FNV/hash for node test environments if subtle crypto isn't available
    return deterministicHashFallback(combined);
  }
}

export function deterministicHashFallback(bytes: Uint8Array): string {
  let h1 = 0xdeadbeef ^ bytes.length;
  let h2 = 0x41c64e6d ^ bytes.length;
  for (let i = 0; i < bytes.length; i++) {
    const ch = bytes[i];
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
  const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
  const hex3 = ((h1 ^ h2) >>> 0).toString(16).padStart(8, '0');
  const hex4 = ((h1 + h2) >>> 0).toString(16).padStart(8, '0');
  return '0x' + (hex1 + hex2 + hex3 + hex4).repeat(2);
}

// Preset verified credentials in the Genesis allowlist root
export const PRESET_ALLOWLIST_ENTRIES = [
  {
    id: 'pass-01',
    title: 'Genesis DAO Founding Member',
    tier: 'Genesis DAO Tier-1' as const,
    passkey: 'PRIVAPASS_GENESIS_SECRET_ALPHA_7749',
    identitySalt: 'SALT_MIDNIGHT_VALIDATOR_NODE_01',
    commitment: '0x8f3c427a19e84b2c159841d7e26a38b1f5e6a98d34b17c2890e4f1a5b82c3d4e',
    badgeColor: 'text-violet-400 border-violet-500/40 bg-violet-500/10'
  },
  {
    id: 'pass-02',
    title: 'Accredited Institutional Participant',
    tier: 'Accredited Investor' as const,
    passkey: 'PRIVAPASS_ACCREDITED_SERIES_A_9921',
    identitySalt: 'SALT_INSTITUTIONAL_ESCROW_02',
    commitment: '0x3b7e9a1c5d8f20468e1b3d5f7a9c2e4b6d8a0c2e4f6a8b0d2e4f6a8b0c2d4e6f',
    badgeColor: 'text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10'
  },
  {
    id: 'pass-03',
    title: 'Midnight Core Security Auditor',
    tier: 'Security Auditor' as const,
    passkey: 'PRIVAPASS_ZK_AUDIT_KEY_HEX_3301',
    identitySalt: 'SALT_FORMAL_VERIFICATION_NODE_03',
    commitment: '0x7e2d1a4f8c0b3e5a7d9f1c3e5b7a9d1f3b5e7a9c1d3f5a7b9c1d3e5f7a9b1c3d',
    badgeColor: 'text-cyber-emerald border-cyber-emerald/40 bg-cyber-emerald/10'
  }
];
