import { useEffect } from 'react';
import { useAccount } from '@starknet-react/core';
import { Group } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getScoreBoard } from '../features/scoreboard/scoreBoardSlice';
import StandingElement from '../components/standings/StandingElement';

const StandingPage = () => {
  const { address } = useAccount();

  const dispatch = useAppDispatch();
  const { scores, scoreStatus } = useAppSelector((state) => state.score);

  useEffect(() => {
    if (scoreStatus === 'idle') dispatch(getScoreBoard());
  }, [dispatch, scoreStatus]);

  function rankDuplicate(arr: any[]) {
    const sorted = [...new Set(arr)].sort((a, b) => b - a);
    const rank = new Map(sorted.map((x, i) => [x, i + 1]));
    return arr.map((x) => ({
      address: x.address,
      points: x.points,
      classement: rank.get(x),
    }));
  }

  return (
    <Group sx={{ maxWidth: '700px', width: '90%', margin: 'auto' }}>
      {scores &&
        rankDuplicate(scores).map((score, i) => (
          <StandingElement
            address={score.address}
            points={score.points}
            classement={score.classement}
          ></StandingElement>
        ))}
    </Group>
  );
};

export default StandingPage;
