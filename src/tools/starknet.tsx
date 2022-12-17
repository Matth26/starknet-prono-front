import { Contract, Abi, Provider } from 'starknet';
import { SC_ADDRESS } from '../app/globals';
import {
  BaseURLType,
  DappEnvType,
  FeederGatewayURLType,
  GatewayURLType,
} from '../app/types';
import ContractAbi from '../assets/abis/prono.json';

export function createSC(): Contract {
  const provider = new Provider({
    sequencer: {
      network: import.meta.env.VITE_DAPP_ENV,
    },
  });
  return new Contract(ContractAbi as Abi, SC_ADDRESS, provider);
}

export function getBaseURLFromEnv(env: DappEnvType): BaseURLType {
  if (env === 'goerli-alpha') return 'https://goerli.voyager.online';
  else if (env === 'goerli-alpha-2') return 'https://goerli-2.voyager.online';
  else return 'https://goerli-2.voyager.online'; // mainnet
}

export function getFeederGatewayURLFromEnv(
  env: DappEnvType
): FeederGatewayURLType {
  if (env === 'goerli-alpha')
    return 'https://alpha4.starknet.io/feeder_gateway/';
  else if (env === 'goerli-alpha-2')
    return 'https://alpha4-2.starknet.io/feeder_gateway/';
  else return 'https://alpha4-2.starknet.io/feeder_gateway/'; // mainnet
}

export function getGatewayURLFromEnv(env: DappEnvType): GatewayURLType {
  if (env === 'goerli-alpha') return 'https://alpha4.starknet.io/gateway/';
  else if (env === 'goerli-alpha-2')
    return 'https://alpha4-2.starknet.io/gateway/';
  else return 'https://alpha4-2.starknet.io/gateway/'; // mainnet
}

/*export function getChainIDFromEnv(env: DappEnvType): StarknetChainId {
  if (env === 'testnet') return StarknetChainId.TESTNET;
  else if (env === 'testnet2') return StarknetChainId.TESTNET2;
  else return StarknetChainId.MAINNET;
}*/
