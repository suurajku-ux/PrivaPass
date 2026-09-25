<div align="center">
  <img src="public/logo.svg" alt="PrivaPass Logo" width="130" />
  <h1>🛡️ PrivaPass: Zero-Knowledge Confidential Credentials & Private Allowlist Protocol</h1>
  <p><strong>Visible Proof. Invisible Data. Native Midnight Network Protocol.</strong></p>
</div>

[![Product X Profile](https://img.shields.io/badge/Product_X_Profile-@PrivaPassweb3-000000?style=flat-square&logo=x&logoColor=white)](https://x.com/PrivaPassweb3)
[![Midnight Explorer](https://img.shields.io/badge/Preprod_Contract-0xf625ba...ac84d-4F46E5?style=flat-square&logo=polkadot&logoColor=white)](https://preprod.midnightexplorer.com/contracts/0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-priva--pass--mocha.vercel.app-8b5cf6?style=flat-square&logo=vercel)](https://priva-pass-mocha.vercel.app/)
[![Demo Video](https://img.shields.io/badge/Demo_Video-Watch_Walkthrough-ec4899?style=flat-square&logo=googlephotos)](https://photos.app.goo.gl/8cQfGT4vxdVdxT1D9)
[![Proposal](https://img.shields.io/badge/Proposal-PROPOSAL.md-blue?style=flat-square&logo=markdown)](PROPOSAL.md)
[![Judge Guide](https://img.shields.io/badge/Judge_Guide-PREPROD__USERS.md-orange?style=flat-square&logo=readme)](PREPROD_USERS.md)
[![Tests](https://img.shields.io/badge/Tests-12%2F12_Passing-10b981?style=flat-square)](tests/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions_Passing-10b981?style=flat-square&logo=githubactions)](https://github.com/suurajku-ux/PrivaPass/actions)

> 🐦 **Official Product X Profile**: **[https://x.com/PrivaPassweb3](https://x.com/PrivaPassweb3)** (`@PrivaPassweb3`)  
> 🚀 **Live dApp Website**: **[https://priva-pass-mocha.vercel.app/](https://priva-pass-mocha.vercel.app/)**  
> 📹 **Interactive Demo Video**: **[https://photos.app.goo.gl/8cQfGT4vxdVdxT1D9](https://photos.app.goo.gl/8cQfGT4vxdVdxT1D9)**  
> 📄 **Product Architecture Proposal**: **[`PROPOSAL.md`](PROPOSAL.md)**  
> 🧪 **Judge & Tester Evaluation Guide**: **[`PREPROD_USERS.md`](PREPROD_USERS.md)**

> **Production-Grade Midnight Network Decentralized Application (dApp)**  
> Built with **Midnight Compact (v0.31.1)**, **Midnight.js SDK**, **Lace Wallet Connector**, and **Next.js / Tailwind CSS**.

---

## 📜 Deployed Smart Contract (Midnight Preprod)

| Parameter | Value |
|---|---|
| **Contract Name** | `PrivaPassProtocol` / `Gatecheck` |
| **Official Product X Profile** | **[https://x.com/PrivaPassweb3](https://x.com/PrivaPassweb3)** (`@PrivaPassweb3`) |
| **Live Web Application** | **[https://priva-pass-mocha.vercel.app/](https://priva-pass-mocha.vercel.app/)** |
| **Demo Video Walkthrough** | **[https://photos.app.goo.gl/8cQfGT4vxdVdxT1D9](https://photos.app.goo.gl/8cQfGT4vxdVdxT1D9)** |
| **Deployed Contract Address** | `0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d` |
| **Midnight Explorer Link** | **[https://preprod.midnightexplorer.com/contracts/0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d](https://preprod.midnightexplorer.com/contracts/0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d)** |
| **Target Network** | Midnight Preprod Testnet |
| **Deployment Pipeline** | Automated GitHub Actions (`.github/workflows/deploy.yml`) |
| **Smart Contract Language** | **Midnight Compact (`v0.31.1`)** |
| **ZK Proving Engine** | Halo2 / Compact Zero-Knowledge Prover |
| **DUST Synchronization** | Optimized 5,000-event batch sync & WASM Heap Patched |

---

## 🎥 Video Demonstration & Walkthrough

[![PrivaPass Video Demo](https://img.shields.io/badge/🎬_Watch_Live_Demo-Google_Photos-8b5cf6?style=for-the-badge&logo=googlephotos&logoColor=white)](https://photos.app.goo.gl/8cQfGT4vxdVdxT1D9)

> 📹 **Live Demonstration**: [Click here to watch the full PrivaPass Zero-Knowledge DApp Video Walkthrough](https://photos.app.goo.gl/8cQfGT4vxdVdxT1D9)  
> *Demonstrating Lace wallet connection, private witness isolation, in-browser ZK-SNARK proof generation, and automatic gated VIP portal unlocking.*

---

## 🚀 1. Level-3 Product Proposal & Core Concept

*For the comprehensive architecture and market proposal, see [`PROPOSAL.md`](PROPOSAL.md).*

### 📌 Project Name: **PrivaPass**
### 💡 Core Concept
**PrivaPass** is a privacy-preserving credential verification and private allowlist protocol engineered natively on the **Midnight Network**. 

Traditional blockchain allowlists and token-gated portals (e.g. on Ethereum or Solana) inherently expose every participant's wallet address, identity connections, and timing heuristics on a public ledger. This creates catastrophic privacy vulnerabilities for:
1. **Accredited & Institutional Investors** who cannot disclose their fund addresses on public token sales.
2. **Confidential DAO Governance** where high-stakes voters face retaliation if their vote or tier is publicly linked to their wallet.
3. **Enterprise & VIP Access Gates** requiring cryptographic proof of authorization without revealing business-sensitive identity vectors.

### 🔑 Solution
PrivaPass solves this by utilizing **Zero-Knowledge Witness Isolation** via Midnight's **Compact** language:
- Users supply their secret credential passkey and identity blinding salt locally into their client environment.
- The Compact circuit (`verifyAccess`) mathematically checks the zero-knowledge commitment against the authorized allowlist root.
- The smart contract deliberately exposes **only** the boolean authorization token (`disclose(true)`) and updates an anonymous verified entry counter on the public ledger.
- **Result:** 100% user anonymity with zero correlation between on-chain execution and off-chain identity.

---

## 🔐 2. Cryptographic Privacy Model

The core security thesis of PrivaPass relies on Midnight's **Strict Witness Sandboxing** and **Selective Ledger Disclosure**.

```mermaid
flowchart TD
    subgraph Local Client Sandbox [🔒 Client-Side Local Witness Sandbox]
        A[User Secret Passkey] --> C[In-Browser ZK Prover]
        B[Identity Blinding Salt] --> C
        C -->|Compute Commitment| D["H(Passkey, Salt)"]
        D -->|Synthesize Circuit Constraints| E[Compact ZK-SNARK Proof]
    end

    subgraph Midnight Preprod Ledger [🌐 Public Midnight Ledger]
        E -->|Submit ZK Proof Only| F["verifyAccess() Circuit"]
        G[Public Allowlist Root] --> F
        F -->|Assert Match & Status| H[Constraint Validation]
        H -->|disclose true| I[Public Access Token: true]
        H -->|State Transition| J[totalVerifiedClaims + 1]
    end

    classDef private fill:#2d124d,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef public fill:#0f2b38,stroke:#06b6d4,stroke-width:2px,color:#fff;
    class A,B,C,D,E private;
    class F,G,H,I,J public;
```

### Privacy Matrix: What Observers See vs What Stays Private

| Data Vector | Location | Privacy Status | Exposure Risk |
| :--- | :--- | :--- | :--- |
| **Secret Passkey** | Local Client Memory (`witness`) | 🔒 100% Confidential | **Zero (Never leaves client)** |
| **Identity Blinding Salt** | Local Client Memory (`witness`) | 🔒 100% Confidential | **Zero (Never leaves client)** |
| **User Wallet Identity / IP** | Off-Chain User | 🔒 100% Anonymous | **Zero (No identity linkage)** |
| **ZK-SNARK Proof** | Midnight Preprod Ledger | 🌐 Public | **Zero (Zero-Knowledge)** |
| **Access Grant Token** | Midnight Preprod Ledger | 🌐 Public (`disclose(true)`) | **Intended access flag** |
| **Verified Claims Counter** | Public Ledger State | 🌐 Public Counter (`+1`) | **Aggregated metric only** |

### 🔄 End-to-End ZK Credential Verification Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 Credential Holder
    participant UI as 💻 PrivaPass Web Portal
    participant Circuit as ⚡ Compact ZK Circuit
    participant Wallet as 🔑 Lace Midnight Wallet
    participant Preprod as 🌐 Midnight Preprod Ledger

    User->>UI: Input Secret Passkey & Identity Salt
    UI->>Circuit: Ingest Local Witness (secretKey, merklePath, pathDirections)
    Note over Circuit: Compute H(Passkey, Salt)<br/>Assert commitment in AllowlistRoot
    Circuit-->>UI: Zero-Knowledge SNARK Proof Synthesized
    UI->>Wallet: Request Proof Transaction Authorization
    Wallet-->>UI: User Signature Approved
    UI->>Preprod: Submit Proof with disclose(isAccessGranted: true)
    Preprod->>Preprod: Validate Proof & Increment totalVerifiedClaims (+1)
    Preprod-->>UI: Verification Confirmed On-Chain
    UI-->>User: Unlock Confidential VIP Gate (0 Identities Leaked)
```

---

## 📜 3. Smart Contract (`priva_pass.compact`)

The smart contract is written in Midnight's **Compact** language (`v0.31.1`) and is located in [`contract/priva_pass.compact`](contract/priva_pass.compact).

### Key Features:
- **`witness getSecretPasskey(): Bytes[32]`**: Ingests private secret passkey into local ZK constraint engine.
- **`witness getIdentitySalt(): Bytes[32]`**: Ingests private salt to prevent rainbow-table analysis.
- **`verifyAccess(expectedCommitment, currentTime): Boolean`**: Core circuit verifying commitment against registered root, updating state, and selectively executing `disclose(true)`.
- **`initializePortal(adminPk, initialRoot)`**: One-time constructor circuit.
- **`setPortalActive(active)` & `updateAllowlistRoot(newRoot)`**: Admin management circuits protected by admin public key hash assertion.

---

## 🐦 4. Active Product X (Twitter) Profile

As part of the mandatory **Level-3 Midnight Ecosystem Submission Criteria (Product X Profile)**, PrivaPass maintains an active public presence on X (formerly Twitter) dedicated to communicating zero-knowledge architecture updates, Midnight Preprod deployment milestones, and developer engagement.

[![Follow on X](https://img.shields.io/badge/Follow_on_X-@PrivaPassweb3-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/PrivaPassweb3)

| Parameter | Official Value |
|---|---|
| **Product X (Twitter) URL** | **[https://x.com/PrivaPassweb3](https://x.com/PrivaPassweb3)** |
| **Product X Handle** | `@PrivaPassweb3` |
| **Product Bio** | *"Zero-Knowledge Confidential Credentials & Private Allowlist Protocol built natively on Midnight Network with Compact smart contracts. Visible proof, invisible data."* |
| **Developer / Author Handle** | **[@suurajku_ux](https://x.com/suurajku_ux)** |
| **Primary Topics Covered** | • Midnight Compact v0.31.1 Circuit constraints and witness sandboxing<br/>• In-browser ZK-SNARK proof generation with Lace wallet integration<br/>• Preprod testnet contract deployment logs and public state verification events<br/>• Confidential DAO governance & accredited investor allowlists |

---

## 💻 5. Frontend Architecture & Design

Built with **Next.js (App Router)**, **Tailwind CSS**, and **Lucide Icons** adhering to an **Electric Violet & Obsidian Dark Cyber Aesthetic**:
- **Bespoke PrivaPass Brand Logo**: Custom vector cryptographic shield with glowing ZK aperture and Midnight neon gradient.
- **Lace Wallet Connector**: Seamless connection with account address, tDU balance, and Preprod network health.
- **Live Verification Radar**: Animated radar sweeping component tracking real-time verified claims counter and allowlist root state.
- **Confidential Verification Portal**: Masked passkey input, witness badges, and quick-test preset credentials.
- **Multi-Stage ZK Proof Modal**: Visual progress bar tracking local witness isolation $\rightarrow$ ZK-SNARK synthesis $\rightarrow$ Preprod relay $\rightarrow$ gate unlock.
- **Dynamic Gated Content Panel**: Unlocked VIP area featuring **Confidential Intel Manifesto**, **100% Anonymous DAO Voting**, and **Verifiable ZK Credential Vault**.

---

## 🛠️ 6. Getting Started & Local Setup

### Prerequisites
- **Node.js**: v20.x or v22.x+
- **npm** or **pnpm**
- *(Optional)* Midnight Compact Compiler (`compact`) & Lace Wallet extension.

### Installation

```bash
# 1. Clone repository
git clone https://github.com/suurajku-ux/PrivaPass.git
cd PrivaPass

# 2. Install dependencies
npm install

# 3. Compile the Compact smart contract
mkdir -p contract/managed
compact compile contract/priva_pass.compact ./contract/managed

# 4. Run automated unit & integration test suites (12 tests)
npm test

# 5. Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the PrivaPass dApp.

---

## 🧪 7. Automated Testing Suite (12/12 Passing)

PrivaPass includes a comprehensive Vitest automated test suite structured across 3 dedicated test files verifying Compact ZK circuit constraints, private witness isolation, Merkle commitments, and Preprod state assertions:

| Test File | Test Cases | Scope / Verification Focus |
| :--- | :--- | :--- |
| [`tests/priva_pass.test.ts`](tests/priva_pass.test.ts) | 4 Tests | Compact Circuit verification, witness isolation, deterministic commitments, live Preprod endpoint configuration |
| [`tests/credential.test.ts`](tests/credential.test.ts) | 5 Tests | Merkle leaf generation, collision resistance, invalid key rejection, salt boundary entropy, privacy invariants |
| [`tests/counter.test.ts`](tests/counter.test.ts) | 3 Tests | Public claim counter monotonicity, emergency portal deactivation, on-chain ledger state schema consistency |

<div align="center">
  <img src="image.png" alt="PrivaPass Passing Automated Tests" width="850" />
</div>

Run the test suite with:
```bash
npm test
```

---

## 🔄 8. CI/CD Pipeline (GitHub Actions)

Every commit and pull request triggers an automated GitHub Actions pipeline ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) that explicitly installs the Midnight Compact compiler CLI, compiles `contract/priva_pass.compact`, executes all 12 Vitest tests, and validates the Next.js production build:

<div align="center">
  <img src="image-1.png" alt="PrivaPass GitHub Actions CI/CD Pipeline Passing" width="850" />
</div>

### ⚙️ Pipeline Verification Steps:
1. **Repository Checkout & Setup**: Configures Node.js v22 runtime with npm caching.
2. **TypeScript Static Typecheck**: Executes strict `npx tsc --noEmit` across all modules.
3. **Explicit Compact Compilation**: Downloads and runs `compact compile contract/priva_pass.compact ./contract/managed` to generate contract bindings.
4. **Automated Test Suite**: Runs all 12 Vitest unit and integration tests (`npm test`).
5. **Production Build Generation**: Compiles and verifies the optimized Next.js static production bundle (`npm run build`).

---

## 👤 Author & GitHub Details

| Parameter | Link / Reference |
|---|---|
| **Official Product X (Twitter)** | **[https://x.com/PrivaPassweb3](https://x.com/PrivaPassweb3)** (`@PrivaPassweb3`) |
| **Author / Developer** | [suurajku-ux](https://github.com/suurajku-ux) |
| **Developer X (Twitter)** | [https://x.com/suurajku_ux](https://x.com/suurajku_ux) (`@suurajku_ux`) |
| **GitHub Profile** | [https://github.com/suurajku-ux](https://github.com/suurajku-ux) |
| **Project Repository** | [https://github.com/suurajku-ux/PrivaPass](https://github.com/suurajku-ux/PrivaPass) |
| **Live Web App (Vercel)** | [https://priva-pass-mocha.vercel.app/](https://priva-pass-mocha.vercel.app/) |
| **Demo Video Walkthrough** | [https://photos.app.goo.gl/8cQfGT4vxdVdxT1D9](https://photos.app.goo.gl/8cQfGT4vxdVdxT1D9) |
| **Preprod Explorer Contract** | [0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d](https://preprod.midnightexplorer.com/contracts/0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d) |
| **Target Network** | Midnight Preprod Testnet |
| **Contract Language** | Midnight Compact (`v0.31.1`) |
| **License** | MIT Open Source License |

---

## 📄 License & Acknowledgements

MIT License — Developed for the Midnight Network Ecosystem by [suurajku-ux](https://github.com/suurajku-ux).  
Built with [Midnight Compact](https://docs.midnight.network) and [Next.js](https://nextjs.org).
