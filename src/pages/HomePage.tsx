import { useAccount } from '@starknet-react/core';
import { useEffect } from 'react';
import MatchList from '../components/matchlist/MatchList';
import { getMatches } from '../features/match/matchSlice';
import { getUserProno } from '../features/prono/pronoSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getScoreBoard } from '../features/scoreboard/scoreBoardSlice';
import { getPoints } from '../features/point/pointSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { account, address } = useAccount();

  // --------------------------------------------------------------------------------
  const { matches, matchStatus } = useAppSelector((state) => state.match);

  useEffect(() => {
    if (matchStatus === 'idle') dispatch(getMatches());
  }, [dispatch, matchStatus]);

  /*useEffect(() => {
    console.log('matches', matches);
  }, [matches]);*/

  // --------------------------------------------------------------------------------
  const { pronos, pronoStatus } = useAppSelector((state) => state.prono);

  useEffect(() => {
    if (pronoStatus === 'idle' && address)
      dispatch(
        getUserProno(
          '0x30254f3ad7fd02550e0ab23c3515be3d3c8f95e6973022e1e8f036f9179fb08'
        )
      );
  }, [dispatch, pronoStatus, address]);

  /*useEffect(() => {
    console.log('pronos', pronos);
  }, [pronos]);*/

  // --------------------------------------------------------------------------------
  /*const { scores, scoreStatus } = useAppSelector((state) => state.score);

  useEffect(() => {
    if (scoreStatus === 'idle') dispatch(getScoreBoard());
  }, [dispatch, scoreStatus]);

  useEffect(() => {
    console.log('scores', scores);
  }, [scores]);*/

  // --------------------------------------------------------------------------------
  /*const { points, pointStatus } = useAppSelector((state) => state.point);

  useEffect(() => {
    if (pointStatus === 'idle')
      dispatch(
        getPoints(
          '0x30254f3ad7fd02550e0ab23c3515be3d3c8f95e6973022e1e8f036f9179fb08'
        )
      );
  }, [dispatch, pointStatus]);

  useEffect(() => {
    console.log('points', points);
  }, [points]);*/

  if (!account) return <div>Please connect</div>;
  return <MatchList type="prono"></MatchList>;
};

export default HomePage;
