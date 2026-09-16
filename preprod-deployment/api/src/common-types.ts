import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import type { PrivaPassPrivateState, Contract, Witnesses } from '@midnight-ntwrk/bboard-contract';

export const privaPassPrivateStateKey = 'privaPassPrivateState';
export type PrivateStateId = typeof privaPassPrivateStateKey;

// Backward compat
export const bboardPrivateStateKey = privaPassPrivateStateKey;

export type PrivateStates = {
  readonly privaPassPrivateState: PrivaPassPrivateState;
};

export type PrivaPassContract = Contract<PrivaPassPrivateState, Witnesses<PrivaPassPrivateState>>;
export type PrivaPassCircuitKeys = Exclude<keyof PrivaPassContract['impureCircuits'], number | symbol>;
export type PrivaPassProviders = MidnightProviders<PrivaPassCircuitKeys, PrivateStateId, PrivaPassPrivateState>;
export type DeployedPrivaPassContract = FoundContract<PrivaPassContract>;

export type PrivaPassDerivedState = {
  readonly allowlistRoot: string;
  readonly totalVerifiedClaims: bigint;
  readonly isPortalActive: boolean;
  readonly isIssuer: boolean;
};

// Aliases for compatibility
export type BBoardContract = PrivaPassContract;
export type BBoardCircuitKeys = PrivaPassCircuitKeys;
export type BBoardProviders = PrivaPassProviders;
export type DeployedBBoardContract = DeployedPrivaPassContract;
export type BBoardDerivedState = PrivaPassDerivedState;
