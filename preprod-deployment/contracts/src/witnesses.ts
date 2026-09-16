import { Ledger } from "./managed/priva_pass/contract/index.js";
import { WitnessContext } from "@midnight-ntwrk/midnight-js-protocol/compact-runtime";

export type PrivaPassPrivateState = {
  readonly secretKey: Uint8Array;
  readonly merklePath?: [Uint8Array, Uint8Array, Uint8Array, Uint8Array, Uint8Array];
  readonly pathDirections?: [boolean, boolean, boolean, boolean, boolean];
};

export const createPrivaPassPrivateState = (
  secretKey: Uint8Array,
  merklePath?: [Uint8Array, Uint8Array, Uint8Array, Uint8Array, Uint8Array],
  pathDirections?: [boolean, boolean, boolean, boolean, boolean]
): PrivaPassPrivateState => ({
  secretKey,
  merklePath,
  pathDirections,
});

// Backward-compat aliases
export type BBoardPrivateState = PrivaPassPrivateState;
export const createBBoardPrivateState = (secretKey: Uint8Array) => createPrivaPassPrivateState(secretKey);

export const witnesses = {
  secretKey: ({
    privateState,
  }: WitnessContext<Ledger, PrivaPassPrivateState>): [
    PrivaPassPrivateState,
    Uint8Array,
  ] => [privateState, privateState.secretKey],

  merklePath: ({
    privateState,
  }: WitnessContext<Ledger, PrivaPassPrivateState>): [
    PrivaPassPrivateState,
    [Uint8Array, Uint8Array, Uint8Array, Uint8Array, Uint8Array],
  ] => [
    privateState,
    privateState.merklePath ?? [new Uint8Array(32), new Uint8Array(32), new Uint8Array(32), new Uint8Array(32), new Uint8Array(32)],
  ],

  pathDirections: ({
    privateState,
  }: WitnessContext<Ledger, PrivaPassPrivateState>): [
    PrivaPassPrivateState,
    [boolean, boolean, boolean, boolean, boolean],
  ] => [
    privateState,
    privateState.pathDirections ?? [false, false, false, false, false],
  ],
};
