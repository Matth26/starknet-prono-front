import {
  useContract,
  useAccount,
  useStarknetCall,
  useStarknetExecute,
} from '@starknet-react/core';
import { hexToAscii } from 'web3-utils';

import ContractAbi from '../assets/abis/prono.json';
import { Abi } from 'starknet';
import { BigNumberish, toFelt } from 'starknet/dist/utils/number';
import { encodeShortString } from 'starknet/dist/utils/shortString';
import BN from 'bn.js';
import { useState } from 'react';
import { Button, Group, NumberInput, TextInput } from '@mantine/core';
import MatchAdmin from '../components/MatchAdmin';

const AdminPage = () => {
  const { account } = useAccount();

  if (!account) return <div>Please connect</div>;

  return (
    <div>
      {[...Array(16).keys()].reverse().map((i: number) => (
        <MatchAdmin index={i} />
      ))}
    </div>
  );
};

export default AdminPage;
