import { useAccount } from '@starknet-react/core';

const HomePage = () => {
  const { account } = useAccount();

  if (!account) return <div>Please connect</div>;

  return <div>Home</div>;
};

export default HomePage;
