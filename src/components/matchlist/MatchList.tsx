import './matchcard.css';
import { useEffect, useState } from 'react';
import MatchCard from './MatchCard';
import { useStarknetCall } from '@starknet-react/core';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Box, Button } from '@mantine/core';

interface MatchListProps {
  type: 'prono' | 'result';
}

const MatchList = ({ type }: MatchListProps) => {
  const { matches, matchStatus } = useAppSelector((state) => state.match);
  const { points, pointStatus } = useAppSelector((state) => state.point);
  const { pronos, scoreHasChanged } = useAppSelector((state) => state.prono);

  return (
    <Box
      sx={{
        maxWidth: '700px',
        width: '90%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {type === 'result' && pointStatus === 'succeeded' && (
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: '25px',
          }}
        >
          Total points: {points.reduce((prev, curr) => prev + curr.points, 0)}
        </div>
      )}
      {type === 'prono' && (
        <Button
          disabled={!scoreHasChanged}
          sx={{
            color: 'black',
            backgroundColor: scoreHasChanged ? '#ffc300' : '#ececec',
            marginBottom: '10px',
            alignSelf: 'flex-end',
            margin: 0,
          }}
          onClick={() => {
            'click';
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
