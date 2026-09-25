# 🚀 PrivaPass Midnight Preprod Deployment & Verifiable Evidence

## 📋 Verifiable On-Chain Contract Information

| Field | Value |
|---|---|
| **Contract Name** | `PrivaPassProtocol` |
| **Contract Address** | `0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d` |
| **Network** | Midnight Preprod Testnet |
| **Explorer URL** | [https://preprod.midnightexplorer.com/contracts/0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d](https://preprod.midnightexplorer.com/contracts/0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d) |
| **Indexer Endpoint** | `https://indexer.preprod.midnight.network/api/v4/graphql` |
| **RPC Node Endpoint** | `https://rpc.preprod.midnight.network` |
| **Proof Engine** | Halo2 ZK-SNARK Prover / Compact Runtime v0.20+ |

---

## 🛠️ Reproducible CI/CD Deployment Process

1. **Compact Contract Compilation**:
   - Compiles `contracts/priva_pass.compact` via the official `compact` CLI into TypeScript managed bindings in `src/managed/priva_pass`.
2. **Provider Pipeline Initialization**:
   - Configures the 5 official Midnight SDK providers:
     - `FetchZkConfigProvider`: Fetches proving and verification keys.
     - `httpClientProofProvider`: Communicates with the Halo2 proof server.
     - `indexerPublicDataProvider`: Queries the live Midnight Preprod GraphQL indexer.
     - `levelPrivateStateProvider`: Manages encrypted local private state.
     - `MidnightWalletProvider`: Handles unshielded tNIGHT and shielded DUST synchronization.
3. **Optimized DUST Sync & WASM Memory Management**:
   - `batchUpdates: { size: 5000, timeout: 10, spacing: 0 }` for high-throughput sync.
   - CoreWallet WASM state lifecycle patch applied via `patch-wallet-sdk.mjs` to prevent heap exhaustion.
4. **On-Chain Deployment**:
   - Deploys the compiled Compact contract via `deployContract()` and exports verifiable `deployment.json` and `deployed_contract.json` artifacts.

---

## 🔒 Security & Wallet Configuration

- **Wallet Secrets**: Deployment reads the mandatory `WALLET_SEED` directly from encrypted GitHub Repository Secrets without hardcoded fallbacks.
- **Witness Isolation**: All private credentials (`secretKey`, `merklePath`, `pathDirections`) remain strictly in client runtime memory and are never written to or leaked on the public ledger.
