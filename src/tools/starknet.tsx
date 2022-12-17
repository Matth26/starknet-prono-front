import { Contract, Abi, Provider } from 'starknet';
import { CONTRACT_ADDRESS } from '../app/globals';
import ContractAbi from '../assets/abis/prono.json';

export function createSC(): Contract {
  const provider = new Provider({
    sequencer: {
      baseUrl: 'https://goerli-2.voyager.online',
      feederGatewayUrl: 'https://alpha4-2.starknet.io/feeder_gateway/',
      gatewayUrl: 'https://alpha4-2.starknet.io/gateway/',
    },
  });
  return new Contract(ContractAbi as Abi, CONTRACT_ADDRESS, provider);
}
