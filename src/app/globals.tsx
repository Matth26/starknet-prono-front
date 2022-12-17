//export const CONTRACT_ADDRESS =
//  '0x759ef4958f90677e653857ff9ae816c374c3922579975732104fe210a809056'; //'0x3c51c2921b416c744c5e040adfe1904c56dca7e606b5e3ad126305361b37d96'; //'0x0034acd6083fe8217109af413390be7662c5ab9023f995ec00b6b4067a052da0';
// localhost: 0x3c51c2921b416c744c5e040adfe1904c56dca7e606b5e3ad126305361b37d96
// goerli: 0x05f1a605611c3c537f47e52919269423d57d97bc8e95f05150a3bfde5148f1b3
// goerli2: 0x07127eb28010fea8ad50f948a43199802ee6028b5ba28f3d90c5abcc6cf48d74

import { DappEnvType } from './types';

export const SC_ADDRESS: string =
  import.meta.env.VITE_SC_ADDRESS ||
  '0x000000000000000000000000000000000000000000000000000';

export const DAPP_ENV: DappEnvType = import.meta.env.VITE_DAPP_ENV
  ? import.meta.env.VITE_DAPP_ENV
  : 'goerli-alpha-2';
