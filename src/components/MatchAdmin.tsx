import {
  useContract,
  useStarknetCall,
  useStarknetExecute,
} from '@starknet-react/core';
import ContractAbi from '../assets/abis/prono.json';
import { Abi, shortString } from 'starknet';
import BN from 'bn.js';
import { useState } from 'react';
import { Button, Group, NumberInput, TextInput } from '@mantine/core';
import { SC_ADDRESS } from '../app/globals';

export function feltToString(felt: BN) {
  if (felt.isZero()) return '';
  const newStrB = Buffer.from(felt.toString(16), 'hex');
  return newStrB.toString();
}

const MatchAdmin: React.FC<{ index: number }> = ({ index }) => {
  const { contract } = useContract({
    abi: ContractAbi as Abi,
    address: SC_ADDRESS,
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
        contractAddress: SC_ADDRESS,
        entrypoint: 'set_match_teams_by_id',
        calldata: [
          index,
          shortString.encodeShortString(homeMatchName),
          shortString.encodeShortString(awayMatchName),
        ],
      },
    ],
  });

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
