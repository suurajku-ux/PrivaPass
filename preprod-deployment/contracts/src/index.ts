import { CompiledContract } from "@midnight-ntwrk/midnight-js-protocol/compact-js";

export * from "./managed/priva_pass/contract/index.js";
export * from "./witnesses";

import * as CompiledPrivaPassContract from "./managed/priva_pass/contract/index.js";
import * as Witnesses from "./witnesses";

class ContractWrapper extends (CompiledPrivaPassContract as any).Contract {
  constructor() {
    super(Witnesses.witnesses);
  }
}

export const CompiledPrivaPassContractContract = CompiledContract.make(
  "priva_pass",
  ContractWrapper as any
).pipe(
  CompiledContract.withCompiledFileAssets("./managed/priva_pass")
) as any;

// Backward compat alias
export const CompiledBBoardContractContract = CompiledPrivaPassContractContract;
