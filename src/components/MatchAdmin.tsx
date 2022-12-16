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
const CONTRACT_ADDRESS =
  '0x52054d097681867ef390a916a32d94b5b0b43e04211b6cb82e1f29210de40fc'; //'0x3c51c2921b416c744c5e040adfe1904c56dca7e606b5e3ad126305361b37d96'; //'0x0034acd6083fe8217109af413390be7662c5ab9023f995ec00b6b4067a052da0';
// localhost: 0x3c51c2921b416c744c5e040adfe1904c56dca7e606b5e3ad126305361b37d96
// goerli: 0x05f1a605611c3c537f47e52919269423d57d97bc8e95f05150a3bfde5148f1b3
// goerli2: 0x07127eb28010fea8ad50f948a43199802ee6028b5ba28f3d90c5abcc6cf48d74

export function feltToString(felt: BN) {
  if (felt.isZero()) return '';
  const newStrB = Buffer.from(felt.toString(16), 'hex');
  return newStrB.toString();
}

const MatchAdmin: React.FC<{ index: number }> = ({ index }) => {
  const { contract } = useContract({
    abi: ContractAbi as Abi,
    address: CONTRACT_ADDRESS,
  });
  const [homeMatchName, setHomeMatchName] = useState('');
  const [awayMatchName, setAwayMatchName] = useState('');

  const {
    /*data,
    loading,
    error,
    reset,*/
    execute: executeSetMatchTeamsById,
  } = useStarknetExecute({
    calls: [
      {
        contractAddress: CONTRACT_ADDRESS,
        entrypoint: 'set_match_teams_by_id',
        calldata: [
          index,
          encodeShortString(homeMatchName),
          encodeShortString(awayMatchName),
        ],
      },
    ],
  });

  console.log(contract);
  const {
    data: name,
    loading: isNameLoading,
    error: nameError,
    refresh: refreshName,
  } = useStarknetCall({
    contract,
    method: 'get_match_oponents_by_id',
    args: [index],
    options: { watch: false },
  });

  return (
    <Group position="center" mt={5}>
      <Group style={{ width: '40%' }}>
        <Button
          onClick={() => refreshName()}
        >{`Get Match[${index}] names`}</Button>
        <span>{name && feltToString(name[0])}</span>
        <span>{name && feltToString(name[1])}</span>
      </Group>

      <Group sx={{ width: '50%' }}>
        <TextInput
          label="Home Team"
          withAsterisk
          value={homeMatchName}
          onChange={(val) => val && setHomeMatchName(val.target.value)}
        />
        <TextInput
          label="Away Team"
          withAsterisk
          value={awayMatchName}
          onChange={(val) => val && setAwayMatchName(val.target.value)}
        />

        {contract && (
          <Button
            sx={{ alignSelf: 'flex-end', marginBottom: '1px' }}
            onClick={async () => {
              executeSetMatchTeamsById();
            }}
          >
            {`Set Match[${index}] Names`}
          </Button>
        )}
      </Group>
    </Group>
  );
};

export default MatchAdmin;
