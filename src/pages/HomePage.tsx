import { useAccount } from '@starknet-react/core';
import { useEffect } from 'react';
import MatchList from '../components/matchlist/MatchList';
import { getMatches } from '../features/match/matchSlice';
import { getUserProno } from '../features/prono/pronoSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { account, address } = useAccount();

  const { matches, matchStatus } = useAppSelector((state) => state.match);

  useEffect(() => {
    if (matchStatus === 'idle') dispatch(getMatches());
  }, [dispatch, matchStatus]);

  const { pronos, pronoStatus } = useAppSelector((state) => state.prono);

  useEffect(() => {
    if (pronoStatus === 'idle' && address) dispatch(getUserProno(address));
  }, [dispatch, pronoStatus, address]);

  if (!account) return <div>Please connect</div>;
  return <MatchList type="prono"></MatchList>;
};

export default HomePage;
