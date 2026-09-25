# PrivaPass: Zero-Knowledge Decentralized Access & Selective Disclosure Gate

<div align="center">

[![Midnight Network](https://img.shields.io/badge/Midnight-Preprod_Testnet-4F46E5?style=for-the-badge&logo=polkadot&logoColor=white)](https://preprod.midnightexplorer.com/contracts/0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d)
[![Compact Language](https://img.shields.io/badge/Compact_Language-v0.31.1-7C3AED?style=for-the-badge&logo=webassembly&logoColor=white)](https://github.com/midnightntwrk/compact)
[![Zero Knowledge](https://img.shields.io/badge/ZK_Proof-Halo2_SNARKs-06B6D4?style=for-the-badge&logo=shield&logoColor=white)](https://midnight.network)
[![CI Pipeline](https://img.shields.io/badge/CI%2FCD-Passing_%2812%2F12_Tests%29-10B981?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/suurajku-ux/PrivaPass/actions)
[![Live dApp](https://img.shields.io/badge/Live_dApp-PrivaPass_App-3B82F6?style=for-the-badge&logo=vercel&logoColor=white)](https://priva-pass-mocha.vercel.app/)

**Product & Technical Architecture Proposal**  
*A Trustless, Zero-Knowledge Gatekeeper for Confidential Web3 Governance, Enterprise RBAC, and Institutional Compliance*

</div>

---

## 1. Executive Summary

Public blockchain architectures enforce radical transparency: every transaction, balance, token transfer, and gating interaction is permanently broadcasted, indexed, and made auditable by adversaries. While this design provides verifiable integrity, it introduces catastrophic **identity linkability hazards**, **financial surveillance**, and **doxxing vectors** when applied to enterprise access control, institutional compliance, and confidential decentralized autonomous organization (DAO) operations.

**PrivaPass** resolves this paradox by deploying a decentralized, zero-knowledge access verification and selective disclosure protocol powered by **Midnight Network** and the **Compact smart contract language**. PrivaPass enables users and institutions to prove membership, credential authenticity, and authorization within a cryptographically certified allowlist root—**without ever disclosing their secret passkey, identity salt, wallet public key, or historical activity to the public ledger**.

---

## 2. Problem Statement: The Public Blockchain Linkability Hazard

### 2.1 The Surveillance Dilemma in Standard Token Gating
Conventional Web3 gating architectures (e.g., ERC-721/1155 token gates, Soulbound Tokens, or Discord bot verifiers like Collab.Land) operate on public smart contract state:
1. **Wallet Address Association:** To prove membership, the user signs a message or sends a transaction from their public address.
2. **Permanent Address Doxxing:** The verifier and network observers link the user's secret off-chain identity to their complete on-chain net worth, transaction history, DeFi positions, and NFT holdings.
3. **Sybil & Replay Vulnerability:** Public signatures can be intercepted or correlated across dApps, building an inescapable behavioral graph of the individual.

```
Conventional Public Gating:
[User Public Address] ──> [Signs Public Tx] ──> [Public Gating Contract] ──> ⚠️ FULL HISTORY EXPOSED
(Exposes wallet balance, past trades, connected dApps, and physical/digital identity link)
```

### 2.2 Institutional & Enterprise Barriers
Enterprises and regulated institutions cannot adopt public gating mechanisms due to strict regulatory frameworks (GDPR, HIPAA, SOC 2, MiCA). They require **cryptographic proof of compliance** without leaking trade secrets, employee identities, or client relationships to competitors or public block explorers.

---

## 3. The PrivaPass Solution

PrivaPass introduces a **Zero-Knowledge Dual-State Architecture** implemented natively in Midnight Compact:

```
PrivaPass Zero-Knowledge Architecture:
┌───────────────────────────────────────────────────────────────┐
│                    Private Client Environment                 │
│  [Secret Passkey] + [Identity Salt] + [Local Merkle Witness]  │
│                               │                               │
│                               ▼                               │
│                [Halo2 ZK-SNARK Prover Engine]                 │
└───────────────────────────────┬───────────────────────────────┘
                                │ 
                                │ Generates ZK Proof (π) & Nullifier
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                 Midnight Network Public Ledger                │
│  - Verifies Proof (π) against On-Chain Allowlist Root (R)     │
│  - Atomically Increments Verified Access Counter              │
│  - Discloses Boolean Authorization (isAccessGranted = true)   │
│  - 🛡️ ZERO LEAKAGE: Secret passkeys, salts, & wallets hidden  │
└───────────────────────────────────────────────────────────────┘
```

### Core Cryptographic Invariants:
1. **Zero-Knowledge Membership Proof:** The user produces a cryptographic proof $\pi$ that their private credential $w = (\text{secretKey}, \text{salt})$ produces a commitment $C = \mathcal{H}(\text{secretKey}, \text{salt})$ residing in the Merkle tree with root $\mathcal{R}$.
2. **Selective Disclosure:** Only the binary decision $\text{granted} \in \{\text{true}, \text{false}\}$ and monotonic counter transitions are submitted on-chain.
3. **Nullifier Protection:** Prevents credential sharing and replay attacks across verification epochs without linking multiple access sessions to the same user.

---

## 4. Privacy Model & State Boundary Matrix

PrivaPass strictly segregates public on-chain ledger state from client-side private witness state:

| Component / State Variable | Storage Location | Accessibility | Cryptographic Defense |
| :--- | :--- | :--- | :--- |
| **Secret Passkey** | Local Memory Only | User Client | Never sent over RPC; isolated in client ZK witness |
| **Identity Salt** | Local Memory Only | User Client | High-entropy salt prevents rainbow-table pre-computation |
| **Merkle Membership Path** | Local Memory Only | User Client | Private witness path evaluated inside Compact circuit |
| **Allowlist Root (`allowlistRoot`)** | Midnight Public Ledger | World-Readable | Merkle root binding authorized credentials |
| **Access Counter (`totalVerifiedClaims`)** | Midnight Public Ledger | World-Readable | Monotonically increasing atomic state counter |
| **Portal Status (`isPortalActive`)** | Midnight Public Ledger | World-Readable | Administrative circuit emergency pause switch |
| **ZK Proof ($\pi$)** | On-Chain Transaction | Publicly Verifiable | Halo2 SNARK verification without witness reconstruction |
| **Transaction ID & Block** | Midnight Preprod Ledger | Publicly Verifiable | Genuine transaction anchored on Midnight Preprod |

---

## 5. Technical Architecture

### 5.1 Smart Contract Layer (Midnight Compact)
Written in Midnight's domain-specific language `priva_pass.compact` (v0.31.1):
- **`verifyAccess(secretKey, merklePath, pathDirections)`**: Private circuit method verifying tree inclusion and emitting authorization witnesses.
- **`checkAccess()`**: Public entry point validating witness proofs and executing atomic counter state transitions.
- **`setPortalActive(active)`**: Admin-gated state transition managing emergency portal availability.

### 5.2 Client Proving & DApp Connector
- **Midnight.js SDK (`@midnight-ntwrk/*`)**:
  - `midnight-js-fetch-zk-config-provider`: Fetches circuit artifacts and proving keys.
  - `midnight-js-http-client-proof-provider`: Compiles witness constraints into Halo2 proofs.
  - `midnight-js-indexer-public-data-provider`: Synchronizes real-time contract ledger state via GraphQL.
  - `dapp-connector-api`: Integrates with Midnight Lace Wallet for shielded transaction signing and fee balancing.

---

## 6. Target Market Segments & Use Cases

```
                    ┌─────────────────────────┐
                    │  PrivaPass Target Mkt   │
                    └────────────┬────────────┘
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│  Institutional   │   │ Confidential DAO │   │ Enterprise Access│
│   DeFi & RWAs    │   │    Governance    │   │  & Identity Gate │
└──────────────────┘   └──────────────────┘   └──────────────────┘
```

1. **Institutional DeFi & Real-World Assets (RWAs):**
   - Accredited investors prove KYC/AML accreditation on-chain without revealing personal identity or institutional wallet holdings.
2. **Confidential DAO Governance:**
   - DAO council members verify voting eligibility and quorum thresholds without exposing individual delegate addresses to bribery or coercion.
3. **Enterprise Role-Based Access Control (RBAC):**
   - Confidential employee gating for intellectual property repositories, private build pipelines, and proprietary cloud assets.
4. **Anonymous Web3 Whitelisting & NFT Drops:**
   - High-profile collectors prove allowlist priority without leaking secondary wallet linkages or transaction habits.

---

## 7. Comparative Analysis

| Feature | Conventional Token Gates (Collab.Land / Guild) | Ethereum Semaphore / SBTs | **PrivaPass on Midnight** |
| :--- | :--- | :--- | :--- |
| **Public Balance Exposure** | ⚠️ High (Exposes entire balance) | ⚠️ Moderate (Requires complex relayers) | 🛡️ **Zero (Completely Shielded)** |
| **Wallet Linkability** | ⚠️ High (100% linkable) | ⚠️ Dependent on relayer privacy | 🛡️ **Zero (Local ZK Witness)** |
| **Smart Contract Engine** | EVM (Solidity) | EVM (Solidity + Circom) | ⚡ **Midnight Compact (Native ZK)** |
| **Proving Overhead** | None (Public signatures) | High gas costs on-chain | ⚡ **Sub-second Halo2 client proving** |
| **Regulatory Compliance** | Non-compliant (GDPR violations) | Partial | 🛡️ **Full Institutional Alignment** |

---

## 8. Development Roadmap & Milestones

- **Phase 1: Foundation (Completed)**
  - Canonical `priva_pass.compact` smart contract compilation with Compact 0.31.1.
  - Deployment to Midnight Preprod Testnet (`0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d`).
  - Next.js Web3 interface integrated with Midnight.js SDK and Lace DApp Connector.
- **Phase 2: Expanded Testing & Developer Tooling (Completed)**
  - 12 comprehensive unit and integration tests across circuit, credential, and counter suites.
  - Complete CI/CD GitHub Actions pipeline verifying Compact compilation and TypeScript typechecks.
  - Published interactive Judge & User Evaluation Guide (`PREPROD_USERS.md`).
- **Phase 3: Multi-Tree Dynamic Allowlisting (Upcoming)**
  - Dynamic on-chain Merkle root insertion via multi-party authorized governance signatures.
  - Time-locked credential expiration and selective attribute disclosure circuits.
- **Phase 4: Mainnet Launch & Cross-Chain Bridges (Target 2026/2027)**
  - Midnight Mainnet deployment.
  - Cross-chain zero-knowledge attestation bridges to Cardano and Ethereum.

---

## 9. Conclusion

PrivaPass sets the benchmark for decentralized privacy-preserving access control. By combining Midnight's cutting-edge zero-knowledge infrastructure with an intuitive, enterprise-ready interface, PrivaPass eliminates the trade-off between verifiable security and individual privacy.
