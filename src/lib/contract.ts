// ============================================================================
// PrivaPass Compact Contract Binding & Witness Module
// ----------------------------------------------------------------------------
// Implements contract bindings, witness context providers, and circuit interfaces
// for contract/priva_pass.compact on Midnight Preprod.
// ============================================================================

import { WitnessContext } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { leafOf, nullifierOf, CanonicalMerkleTree, MerkleProof, toHex, fromHex } from './merkle_tree';

export type PrivaPassPrivateState = {
  readonly secretKey: Uint8Array;
  readonly merklePath: [Uint8Array, Uint8Array, Uint8Array, Uint8Array, Uint8Array];
  readonly pathDirections: [boolean, boolean, boolean, boolean, boolean];
};

export const createPrivaPassPrivateState = (
  secretKey: Uint8Array,
  merklePath: [Uint8Array, Uint8Array, Uint8Array, Uint8Array, Uint8Array],
  pathDirections: [boolean, boolean, boolean, boolean, boolean]
): PrivaPassPrivateState => ({
  secretKey,
  merklePath,
  pathDirections,
});

export type PrivaPassLedger = {
  allowlistRoot: Uint8Array;
  issuer: Uint8Array;
  accessGranted: bigint;
  nullifiers: Set<string>;
};

export const witnesses = {
  secretKey: ({
    privateState,
  }: WitnessContext<PrivaPassLedger, PrivaPassPrivateState>): [
    PrivaPassPrivateState,
    Uint8Array
  ] => [privateState, privateState.secretKey],

  merklePath: ({
    privateState,
  }: WitnessContext<PrivaPassLedger, PrivaPassPrivateState>): [
    PrivaPassPrivateState,
    [Uint8Array, Uint8Array, Uint8Array, Uint8Array, Uint8Array]
  ] => [
    privateState,
    privateState.merklePath,
  ],

  pathDirections: ({
    privateState,
  }: WitnessContext<PrivaPassLedger, PrivaPassPrivateState>): [
    PrivaPassPrivateState,
    [boolean, boolean, boolean, boolean, boolean]
  ] => [
    privateState,
    privateState.pathDirections,
  ],
};

/**
 * Interface representing the compiled PrivaPass contract circuits
 */
export interface PrivaPassContractCircuits {
  verifyAccess(): Promise<{ txHash: string; blockHeight: number }>;
  checkAccess(): Promise<{ txHash: string; blockHeight: number }>;
  publishAllowlist(newRoot: Uint8Array): Promise<{ txHash: string; blockHeight: number }>;
  publicStats(): Promise<[string, number]>;
}
