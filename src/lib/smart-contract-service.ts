import {
  ContractCall,
  openContractCall,
  uintCV,
  stringCV,
  standardPrincipalCV,
} from '@stacks/connect';
import { StacksNetwork, StacksMocknet } from '@stacks/network';

export class SmartContractService {
  private readonly STACKS_ADDRESS = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
  private readonly CONTRACT_NAME = "review";
  private readonly network: StacksNetwork;

  constructor() {
    this.network = new StacksMocknet();
  }

  // ... resto del código del servicio
}

export const smartContractService = new SmartContractService(); 