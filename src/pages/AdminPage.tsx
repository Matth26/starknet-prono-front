import { useAccount } from '@starknet-react/core';

import MatchAdmin from '../components/MatchAdmin';

const AdminPage = () => {
  const { account } = useAccount();

  if (!account) return <div>Please connect</div>;

  return (
    <div>
      {[...Array(16).keys()].reverse().map((i: number) => (
        <MatchAdmin index={i} />
      ))}
    </div>
  );
};

export default AdminPage;
