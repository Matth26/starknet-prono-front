import { useAccount } from '@starknet-react/core';
import { useEffect } from 'react';
import MatchList from '../components/matchlist/MatchList';
import { getMatches } from '../features/match/matchSlice';
import { getUserProno } from '../features/prono/pronoSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

const ResultPage = () => {
  const dispatch = useAppDispatch();
  const { account, address } = useAccount();

  const { matches, matchStatus } = useAppSelector((state) => state.match);

  useEffect(() => {
    if (matchStatus === 'idle') dispatch(getMatches());
  }, [dispatch, matchStatus]);

  const { pronoStatus } = useAppSelector((state) => state.prono);

  useEffect(() => {
    if (pronoStatus === 'idle' && address)
      dispatch(
        getUserProno(
          '0x30254f3ad7fd02550e0ab23c3515be3d3c8f95e6973022e1e8f036f9179fb08'
        )
      );
  }, [dispatch, pronoStatus, address]);

  return <MatchList type="result" />;
};

export default ResultPage;
