# PrivaPass Preprod Evaluation & Judge Testing Guide

<div align="center">

[![Midnight Preprod](https://img.shields.io/badge/Midnight-Preprod_Testnet-4F46E5?style=for-the-badge&logo=polkadot&logoColor=white)](https://preprod.midnightexplorer.com/contracts/0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d)
[![Verified Contract](https://img.shields.io/badge/Preprod_Contract-0xf625ba69...c84d-10B981?style=for-the-badge&logo=shield&logoColor=white)](https://preprod.midnightexplorer.com/contracts/0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d)
[![Live dApp](https://img.shields.io/badge/Live_dApp-priva--pass--mocha.vercel.app-3B82F6?style=for-the-badge&logo=vercel&logoColor=white)](https://priva-pass-mocha.vercel.app/)

**Step-by-Step Instructions for Hackathon Judges, Evaluators, and Community Testers**

</div>

---

## 1. Quick Verification Overview

| Parameter | Value |
| :--- | :--- |
| **Network** | Midnight Preprod Testnet |
| **Deployed Contract Address** | `0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d` |
| **Preprod Block Explorer** | [View Contract on Explorer](https://preprod.midnightexplorer.com/contracts/0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d) |
| **Live Web3 Application** | [https://priva-pass-mocha.vercel.app/](https://priva-pass-mocha.vercel.app/) |
| **Official Demo Video** | [Watch Video Walkthrough](https://photos.app.goo.gl/8cQfGT4vxdVdxT1D9) |
| **Twitter / X Community** | [@PrivaPassweb3](https://x.com/PrivaPassweb3) |

---

## 2. Prerequisites & Wallet Setup

To interact with PrivaPass on the live Midnight Preprod testnet, complete the following one-time setup:

### Step 2.1: Install Midnight Lace Wallet
1. Download and install the **Midnight Lace Wallet Extension** (or 1AM Wallet) in Chrome / Brave.
2. Create or restore a wallet account.
3. Open Wallet Settings and set the network endpoint to **Midnight Preprod**.

### Step 2.2: Obtain Testnet Funds (tNIGHT & tDUST)
1. Copy your shielded coin address from Lace Wallet.
2. Request free Preprod testnet tokens from the official [Midnight Preprod Faucet](https://faucet.preprod.midnight.network/).
3. Confirm tokens are received in your wallet balance.

---

## 3. Step-by-Step Testnet Gating Flow

### Step 3.1: Connect Wallet
1. Visit the live dApp: **[https://priva-pass-mocha.vercel.app/](https://priva-pass-mocha.vercel.app/)**
2. Click **"Connect Lace Wallet"** in the top navigation bar.
3. Approve the connection modal in your Midnight Lace extension.

### Step 3.2: Select or Input a Verified Credential
PrivaPass includes three pre-seeded Genesis Allowlist credentials. Click any quick-fill button or input the credentials manually:

#### Preset Judge Credentials:
```json
[
  {
    "tier": "Genesis DAO Tier-1",
    "title": "Genesis DAO Founding Member",
    "secretPasskey": "PRIVAPASS_GENESIS_SECRET_ALPHA_7749",
    "identitySalt": "SALT_MIDNIGHT_VALIDATOR_NODE_01"
  },
  {
    "tier": "Accredited Investor",
    "title": "Accredited Institutional Participant",
    "secretPasskey": "PRIVAPASS_ACCREDITED_SERIES_A_9921",
    "identitySalt": "SALT_INSTITUTIONAL_ESCROW_02"
  },
  {
    "tier": "Security Auditor",
    "title": "Midnight Core Security Auditor",
    "secretPasskey": "PRIVAPASS_ZK_AUDIT_KEY_HEX_3301",
    "identitySalt": "SALT_FORMAL_VERIFICATION_NODE_03"
  }
]
```

### Step 3.3: Execute Client-Side ZK Proof Generation
1. Click **"Generate ZK Proof & Verify"**.
2. Observe the 4-phase Zero-Knowledge pipeline executing in real time:
   - **Phase 1:** Private Witness Isolation (`secretPasskey`, `identitySalt`, `merklePath`).
   - **Phase 2:** Local Halo2 ZK-SNARK Constraint Synthesis.
   - **Phase 3:** Midnight DApp Connector Shielded Transaction Balancing.
   - **Phase 4:** On-Chain Contract Confirmation (`SucceedEntirely`).

### Step 3.4: Inspect Public Explorer & Verified Vault
1. Once verified, the application unlocks the **Verified Credential Vault** & confidential portal content.
2. Click the transaction hash to inspect the genuine state update on the **[Midnight Preprod Explorer](https://preprod.midnightexplorer.com/contracts/0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d)**.
3. Confirm that the public explorer records **zero knowledge** of your secret passkey or identity salt!

---

## 4. Local Testing & Verification via CLI

Judges and developers can independently execute the entire test suite locally:

```bash
# 1. Clone repository
git clone https://github.com/suurajku-ux/PrivaPass.git
cd PrivaPass

# 2. Install dependencies
npm install

# 3. Run full test suite (12 passing tests across circuit, credential, and counter suites)
npm test

# 4. Compile canonical Compact smart contract
mkdir -p contract/managed
compact compile contract/priva_pass.compact ./contract/managed

# 5. Verify Next.js production build
npm run build
```

---

## 5. Summary of Evaluator Checklist

- [x] **Contract Address Verified:** `0xf625ba69bc3e3eff8f7bd53a9a239f3585a92aafd338d10da8a7f52d9daac84d` on Preprod Explorer.
- [x] **Test Coverage:** 12/12 passing tests in `tests/priva_pass.test.ts`, `tests/credential.test.ts`, and `tests/counter.test.ts`.
- [x] **Product Proposal:** Complete architecture and market analysis in `PROPOSAL.md`.
- [x] **Privacy Preservation:** Dual-state model isolating secret witnesses while updating public access counter.
- [x] **CI/CD Automation:** GitHub Actions workflow with explicit `compact compile` and test execution.
