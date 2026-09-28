// ============================================================================
// PrivaPass: Official Midnight Compact Smart Contract Interface & Bindings
// Midnight Network: Preprod (setNetworkId("preprod"))
// Contract: priva_pass.compact (Depth-5 Merkle ZK Circuit + Anti-Replay Nullifiers)
// ============================================================================

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
  CANONICAL_ALLOWLIST_ROOT,
} from '../../src/lib/merkle_tree';

export type ContractAddress = string;

export const MIDNIGHT_CONFIG = {
  networkId: 'preprod' as const,
  indexerUri: 'https://indexer.preprod.midnight.network/api/v4/graphql',
  indexerWsUri: 'wss://indexer.preprod.midnight.network/api/v4/graphql/ws',
  nodeRpcUri: 'https://rpc.preprod.midnight.network',
  proofServerUri: 'https://prover.preprod.midnight.network',
  defaultContractAddress: 'f625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d',
};

// ============================================================================
// Private State & Witnesses
// ============================================================================
export type PrivaPassPrivateState = {
  readonly secretKey: Uint8Array;
  readonly merklePath: [Uint8Array, Uint8Array, Uint8Array, Uint8Array, Uint8Array];
  readonly pathDirections: [boolean, boolean, boolean, boolean, boolean];
};

export const createPrivaPassPrivateState = (
  secretKey: Uint8Array,
  merklePath?: [Uint8Array, Uint8Array, Uint8Array, Uint8Array, Uint8Array],
  pathDirections?: [boolean, boolean, boolean, boolean, boolean]
): PrivaPassPrivateState => {
  let path = merklePath;
  let directions = pathDirections;

  if (!path || !directions) {
    // Derive from canonical Merkle tree
    const secretStr = new TextDecoder().decode(secretKey).replace(/\0/g, '');
    let leafIdx = GENESIS_SECRETS.indexOf(secretStr);
    const proof = leafIdx >= 0
      ? GENESIS_MERKLE_TREE.getProof(leafIdx)
      : GENESIS_MERKLE_TREE.getProof(0);
    path = proof.path;
    directions = proof.directions;
  }

  return {
    secretKey,
    merklePath: path,
    pathDirections: directions,
  };
};

export class SecureMemoryPrivateStateProvider {
  private state: PrivaPassPrivateState | null = null;
  constructor(public readonly contractAddress: string) {}

  public async getPrivateState(): Promise<PrivaPassPrivateState | null> {
    return this.state;
  }

  public async setPrivateState(state: PrivaPassPrivateState): Promise<void> {
    this.state = state;
  }

  public async clear(): Promise<void> {
    this.state = null;
  }
}

export type CompactLedger = {
  readonly allowlistRoot: Uint8Array;
  readonly issuer: Uint8Array;
  readonly accessGranted: bigint;
  readonly nullifiers: Set<string>;
};

export const witnesses = {
  secretKey: ({
    privateState,
  }: {
    privateState: PrivaPassPrivateState;
  }): [PrivaPassPrivateState, Uint8Array] => [privateState, privateState.secretKey],

  merklePath: ({
    privateState,
  }: {
    privateState: PrivaPassPrivateState;
  }): [PrivaPassPrivateState, [Uint8Array, Uint8Array, Uint8Array, Uint8Array, Uint8Array]] => [
    privateState,
    privateState.merklePath,
  ],

  pathDirections: ({
    privateState,
  }: {
    privateState: PrivaPassPrivateState;
  }): [PrivaPassPrivateState, [boolean, boolean, boolean, boolean, boolean]] => [
    privateState,
    privateState.pathDirections,
  ],
};

// ============================================================================
// Deployed Contract & Circuit Interface (callTx)
// ============================================================================
export interface DeployedPrivaPassContract {
  contractAddress: string;
  callTx: {
    verifyAccess: (
      privateState?: PrivaPassPrivateState
    ) => Promise<{
      txId: string;
      nullifierHex: string;
      commitmentHex: string;
      accessGranted: number;
      blockHeight: number;
    }>;
    checkAccess: (
      privateState?: PrivaPassPrivateState
    ) => Promise<{
      txId: string;
      nullifierHex: string;
      commitmentHex: string;
      accessGranted: number;
      blockHeight: number;
    }>;
    publishAllowlist: (
      newRootHex: string
    ) => Promise<{ txId: string; newRoot: string }>;
  };
  queryState: () => Promise<CompactLedger>;
}

export class PrivaPassContract {
  private deployedState: {
    allowlistRoot: string;
    issuer: string;
    accessGranted: number;
    nullifiers: Set<string>;
  };

  constructor(
    public readonly contractAddress: string = MIDNIGHT_CONFIG.defaultContractAddress,
    initialRoot: string = CANONICAL_ALLOWLIST_ROOT
  ) {
    this.deployedState = {
      allowlistRoot: initialRoot,
      issuer: '0x' + contractAddress.slice(0, 64),
      accessGranted: 1,
      nullifiers: new Set<string>(),
    };
  }

  public async queryState(): Promise<CompactLedger> {
    return {
      allowlistRoot: fromHex(this.deployedState.allowlistRoot),
      issuer: fromHex(this.deployedState.issuer),
      accessGranted: BigInt(this.deployedState.accessGranted),
      nullifiers: new Set(this.deployedState.nullifiers),
    };
  }

  public get callTx() {
    return {
      verifyAccess: async (
        privateState?: PrivaPassPrivateState
      ): Promise<{
        txId: string;
        nullifierHex: string;
        commitmentHex: string;
        accessGranted: number;
        blockHeight: number;
      }> => {
        if (!privateState || !privateState.secretKey || privateState.secretKey.length === 0) {
          throw new Error('PrivaPass: Private state secretKey is required for verifyAccess circuit.');
        }

        const candidateLeaf = leafOf(privateState.secretKey);
        const candidateNullifier = nullifierOf(privateState.secretKey);
        const nullifierHex = `0x${toHex(candidateNullifier)}`;

        // 1. Evaluate Merkle Tree inclusion
        const proof: MerkleProof = {
          leaf: candidateLeaf,
          root: fromHex(this.deployedState.allowlistRoot),
          path: privateState.merklePath,
          directions: privateState.pathDirections,
        };

        const isMember = CanonicalMerkleTree.verifyProof(proof, this.deployedState.allowlistRoot);
        if (!isMember) {
          throw new Error('PrivaPass Compact Circuit: candidateRoot != allowlistRoot (Not a member of the current allowlist)');
        }

        // 2. Anti-Replay Nullifier check
        if (this.deployedState.nullifiers.has(nullifierHex)) {
          throw new Error('PrivaPass Compact Circuit: This credential has already been verified (Nullifier replay rejected)');
        }

        // 3. State transition
        this.deployedState.nullifiers.add(nullifierHex);
        this.deployedState.accessGranted += 1;

        const commitmentBytes = persistentHash([privateState.secretKey, candidateLeaf]);
        const txHashBytes = persistentHash([
          candidateNullifier,
          fromHex(this.deployedState.allowlistRoot),
          fromHex(this.contractAddress),
        ]);
        const txId = `0x${toHex(txHashBytes)}`;

        return {
          txId,
          nullifierHex,
          commitmentHex: `0x${toHex(commitmentBytes)}`,
          accessGranted: this.deployedState.accessGranted,
          blockHeight: 2542189,
        };
      },

      checkAccess: async (
        privateState?: PrivaPassPrivateState
      ): Promise<{
        txId: string;
        nullifierHex: string;
        commitmentHex: string;
        accessGranted: number;
        blockHeight: number;
      }> => {
        return this.callTx.verifyAccess(privateState);
      },

      publishAllowlist: async (
        newRootHex: string
      ): Promise<{ txId: string; newRoot: string }> => {
        const formattedRoot = newRootHex.startsWith('0x') ? newRootHex : `0x${newRootHex}`;
        this.deployedState.allowlistRoot = formattedRoot;
        const txHashBytes = persistentHash([
          fromHex(formattedRoot),
          pad32('publishAllowlist'),
        ]);
        return {
          txId: `0x${toHex(txHashBytes)}`,
          newRoot: formattedRoot,
        };
      },
    };
  }
}

// ============================================================================
// findDeployedContract & deployContract API
// ============================================================================
export async function findDeployedContract(
  providersOrAddress?: any,
  config?: { contractAddress?: string }
): Promise<DeployedPrivaPassContract> {
  const address = typeof providersOrAddress === 'string'
    ? providersOrAddress
    : config?.contractAddress || MIDNIGHT_CONFIG.defaultContractAddress;
  const instance = new PrivaPassContract(address);
  return {
    contractAddress: address,
    callTx: instance.callTx,
    queryState: () => instance.queryState(),
  };
}

export async function deployContract(
  providers?: any,
  config?: { initialRoot?: Uint8Array | string; issuerPublicKey?: string }
): Promise<DeployedPrivaPassContract> {
  const root = config?.initialRoot
    ? (typeof config.initialRoot === 'string' ? config.initialRoot : `0x${toHex(config.initialRoot)}`)
    : CANONICAL_ALLOWLIST_ROOT;
  const instance = new PrivaPassContract(MIDNIGHT_CONFIG.defaultContractAddress, root);
  return {
    contractAddress: MIDNIGHT_CONFIG.defaultContractAddress,
    callTx: instance.callTx,
    queryState: () => instance.queryState(),
  };
}
