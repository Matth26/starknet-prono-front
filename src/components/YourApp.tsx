import {
  useStarknet,
  useStarknetCall,
  useStarknetInvoke,
} from '@starknet-react/core';
import { useContract } from '@starknet-react/core';
import { hexToAscii } from 'web3-utils';

import Connectors from './Connectors';

import { useStarknetExecute } from '@starknet-react/core';

import ContractAbi from '../assets/abis/ERC721.json';
import { Abi } from 'starknet';
import { BigNumberish, toFelt } from 'starknet/dist/utils/number';
import BN from 'bn.js';
import { useState } from 'react';
import { Group, NumberInput } from '@mantine/core';
import TxTable from './TxTable';
const CONTRACT_ADDRESS =
  '0x058c546adb10ef6b7827b02e45ecac33a54cc0c87e80f245090d0aaae5cbe2d9';

export function feltToString(felt: BN) {
  const newStrB = Buffer.from(felt.toString(16), 'hex');
  return newStrB.toString();
}

const YourApp = () => {
  const { account } = useStarknet();
  const { contract } = useContract({
    abi: ContractAbi as Abi,
    address: CONTRACT_ADDRESS,
  });
  const [name, setName] = useState('');
  const [sex, setSex] = useState(0);
  const [legs, setLegs] = useState(0);
  const [wings, setWings] = useState(0);

  const {
    /*data,
    loading,
    error,
    reset,*/
    invoke: invokeDeclareAnimal,
  } = useStarknetInvoke({
    contract,
    method: 'declare_animal',
  });

  const {
    data: name2,
    loading: isNameLoading,
    error: nameError,
    refresh: refreshName,
  } = useStarknetCall({
    contract,
    method: 'name',
    args: [],
    options: { watch: false },
  });
  console.log(name2);
  console.log(isNameLoading);
  console.log(nameError);

  return (
    <div>
      <Connectors />
      <div>gm {account}</div>

      {account && contract && (
        <>
          <Group position="center" mt={5}>
            <button
              onClick={async () => {
                const res = await contract.name();
                //console.log(feltToString(res.name));
                setName(hexToAscii('0x' + res.name.toString(16)));
              }}
            >
              Get View from starknet.js
            </button>
            <span>Name</span>
            <span>{name !== '' && name}</span>
          </Group>

          <Group position="center" mt={5}>
            <button onClick={() => refreshName()}>
              Get View from Starknet React
            </button>
            <span>Name</span>
            <span>
              {name2 && name2[0] && hexToAscii('0x' + name2[0].toString(16))}
            </span>
          </Group>

          <Group mt={5}>
            <NumberInput
              placeholder="1"
              label="Sex"
              withAsterisk
              value={sex}
              onChange={(val) => val && setSex(val)}
            />
            <NumberInput
              placeholder="1"
              label="Legs"
              withAsterisk
              value={legs}
              onChange={(val) => val && setLegs(val)}
            />
            <NumberInput
              placeholder="1"
              label="Wings"
              withAsterisk
              value={wings}
              onChange={(val) => val && setWings(val)}
            />
            {contract && (
              <button
                onClick={async () => {
                  invokeDeclareAnimal({
                    args: [sex, toFelt(legs), toFelt(wings)],
                    overrides: { maxFee: 100000 },
                  });
                }}
              >
                Declare Animal
              </button>
            )}
          </Group>
          <TxTable />
        </>
      )}
    </div>
  );
};

export default YourApp;
