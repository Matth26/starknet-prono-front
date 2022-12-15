import { useAccount } from '@starknet-react/core';
import MatchList from '../components/matchlist/MatchList';

const HomePage = () => {
  const { account } = useAccount();

  if (!account) return <div>Please connect</div>;
  return (
    <MatchList type="prono"></MatchList>
  );
};


export default HomePage;
