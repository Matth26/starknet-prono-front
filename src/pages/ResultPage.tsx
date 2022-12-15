import { useAccount } from '@starknet-react/core';
import MatchList from '../components/matchlist/MatchList';

const ResultPage = () => {
    const { account } = useAccount();

    if (!account) return <div>Please connect</div>;
    return (
        <MatchList type="result"></MatchList>
    );
};

export default ResultPage;