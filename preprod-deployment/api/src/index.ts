import * as PrivaPassContractModule from '@midnight-ntwrk/bboard-contract';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { type Logger } from 'pino';
import {
  type PrivaPassDerivedState,
  type PrivaPassProviders,
  type DeployedPrivaPassContract,
  privaPassPrivateStateKey,
} from './common-types.js';
import { CompiledPrivaPassContractContract } from '@midnight-ntwrk/bboard-contract';
import * as utils from './utils/index.js';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { combineLatest, map, from, type Observable } from 'rxjs';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';
import { PrivaPassPrivateState, createPrivaPassPrivateState } from '@midnight-ntwrk/bboard-contract';

export * from './common-types.js';

export interface DeployedPrivaPassAPI {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<PrivaPassDerivedState>;
  verifyAccess: () => Promise<void>;
  publishAllowlist: (newRoot: Uint8Array) => Promise<void>;
}

export class PrivaPassAPI implements DeployedPrivaPassAPI {
  private constructor(
    public readonly deployedContract: DeployedPrivaPassContract,
    providers: PrivaPassProviders,
    private readonly logger?: Logger,
  ) {
    this.deployedContractAddress = deployedContract.deployTxData.public.contractAddress;
    providers.privateStateProvider.setContractAddress(this.deployedContractAddress);
    this.state$ = combineLatest(
      [
        providers.publicDataProvider.contractStateObservable(this.deployedContractAddress, { type: 'latest' }).pipe(
          map((contractState) => (PrivaPassContractModule as any).ledger(contractState.data)),
        ),
        from(providers.privateStateProvider.get(privaPassPrivateStateKey) as Promise<PrivaPassPrivateState>),
      ],
      (ledgerState, privateState) => {
        return {
          allowlistRoot: toHex((ledgerState as any).allowlistRoot),
          totalVerifiedClaims: BigInt((ledgerState as any).accessGranted?.value ?? 0n),
          isPortalActive: true,
          isIssuer: true,
        };
      },
    );
  }

  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<PrivaPassDerivedState>;

  async verifyAccess(): Promise<void> {
    this.logger?.info('Invoking verifyAccess() circuit on Midnight Preprod...');
    const tx = await (this.deployedContract.callTx as any).verifyAccess();
    this.logger?.info({ tx }, 'verifyAccess transaction finalized');
  }

  async checkAccess(): Promise<void> {
    return this.verifyAccess();
  }

  async publishAllowlist(newRoot: Uint8Array): Promise<void> {
    this.logger?.info({ newRoot: toHex(newRoot) }, 'Publishing updated allowlist root...');
    const tx = await (this.deployedContract.callTx as any).publishAllowlist(newRoot);
    this.logger?.info({ tx }, 'publishAllowlist transaction finalized');
  }

  static async deploy(
    providers: PrivaPassProviders,
    logger?: Logger,
    initialRoot?: Uint8Array,
  ): Promise<PrivaPassAPI> {
    logger?.info('Deploying PrivaPass contract to Midnight Preprod...');
    const root = initialRoot ?? new Uint8Array(32);
    const deployedContract = await deployContract(providers, {
      compiledContract: CompiledPrivaPassContractContract,
      args: [root],
    });
    return new PrivaPassAPI(deployedContract as any, providers, logger);
  }

  static async join(
    providers: PrivaPassProviders,
    contractAddress: ContractAddress,
    logger?: Logger,
  ): Promise<PrivaPassAPI> {
    logger?.info({ contractAddress }, 'Joining deployed PrivaPass contract...');
    const deployedContract = await findDeployedContract(providers, {
      contractAddress,
      compiledContract: CompiledPrivaPassContractContract,
    });
    return new PrivaPassAPI(deployedContract as any, providers, logger);
  }
}

// Backward compat
export const BBoardAPI = PrivaPassAPI;
export type DeployedBBoardAPI = DeployedPrivaPassAPI;
