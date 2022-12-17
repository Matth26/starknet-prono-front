import { useAccount } from '@starknet-react/core';
import { useEffect } from 'react';
import MatchList from '../components/matchlist/MatchList';
import { getMatches } from '../features/match/matchSlice';
import { getPoints } from '../features/point/pointSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

const ResultPage = () => {
  const dispatch = useAppDispatch();
  const { account, address } = useAccount();

  const { matches, matchStatus } = useAppSelector((state) => state.match);
  useEffect(() => {
    if (matchStatus === 'idle') dispatch(getMatches());
  }, [dispatch, matchStatus]);

  const { pointStatus } = useAppSelector((state) => state.point);
  useEffect(() => {
    if (account && address && pointStatus === 'idle')
      dispatch(getPoints(address));
  }, [address, dispatch, account, pointStatus]);

  return <MatchList type="result" />;
};

export default ResultPage;
