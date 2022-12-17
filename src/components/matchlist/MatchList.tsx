import './matchcard.css';
import { useEffect, useState } from 'react';
import MatchCard from './MatchCard';
import { useAccount, useTransactionReceipt } from '@starknet-react/core';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Box, Button, Text } from '@mantine/core';
import { CONTRACT_ADDRESS } from '../../app/globals';
import { LoadingOverlay } from '@mantine/core';

interface MatchListProps {
  type: 'prono' | 'result';
}

const MatchList = ({ type }: MatchListProps) => {
  const { account } = useAccount();
  const { matches, matchStatus } = useAppSelector((state) => state.match);
  const { points, pointStatus } = useAppSelector((state) => state.point);
  const { pronos, pronosToSave, scoreHasChanged } = useAppSelector(
    (state) => state.prono
  );

  const [hash, setHash] = useState<string | undefined>(undefined);
  const { data, loading, error } = useTransactionReceipt({ hash, watch: true });

  const [txFinished, setTxFinished] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (data?.status === 'ACCEPTED_ON_L2') {
      setTxFinished(true);
      setVisible(false);
    }
  }, [data]);

  /*const {
    data,
    loading,
    error,
    reset,
    execute: executeSetMatchBets,
  } = useStarknetExecute({
    calls: [
      {
        contractAddress: CONTRACT_ADDRESS,
        entrypoint: 'set_match_bets',
        calldata: [
          [
            { match_id: toBN(0), score_ht: toBN(1), score_at: toBN(3) },
            { match_id: toBN(4), score_ht: toBN(2), score_at: toBN(4) },
            { match_id: toBN(7), score_ht: toBN(5), score_at: toBN(3) },
          ],
        ],
      },
    ],
  });
  console.log(error);*/
  function get_raw_prono(): number[] {
    let arr = pronosToSave.map((p) => [p.match_id, p.home_score, p.away_score]);
    return [pronosToSave.length].concat(...arr);
  }

  return (
    <Box
      sx={{
        maxWidth: '700px',
        width: '90%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <LoadingOverlay visible={visible} overlayBlur={2} />
      {type === 'result' && pointStatus === 'succeeded' && (
        <Text
          sx={{
            width: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '25px',
          }}
        >
          Total points: {points.reduce((prev, curr) => prev + curr.points, 0)}
        </Text>
      )}
      {type === 'prono' && (
        <Button
          disabled={!scoreHasChanged || !txFinished}
          sx={{
            color: 'black',
            backgroundColor: scoreHasChanged ? '#ffc300' : '#ececec',
            marginBottom: '10px',
            alignSelf: 'flex-end',
            margin: 0,
          }}
          onClick={async () => {
            get_raw_prono();
            let txHash = await account?.execute(
              {
                contractAddress: CONTRACT_ADDRESS,
                entrypoint: 'set_match_bets',
                calldata: get_raw_prono(),
              },
              undefined,
              { maxFee: 500 }
            );
            console.log(txHash);
            setTxFinished(false);
            setVisible(true);
            if (txHash) setHash(txHash.transaction_hash as string);
          }}
        >
          Save
        </Button>
      )}
      {matchStatus === 'succeeded' &&
        matches.map((m: any, i: number) => (
          <MatchCard
            key={i}
            type={type}
            id={i}
            awayTeam={m.away_team}
            homeTeam={m.home_team}
            dateUtc={m.date}
          />
        ))}
    </Box>
  );
};

export default MatchList;
