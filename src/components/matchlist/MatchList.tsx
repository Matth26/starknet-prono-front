import './matchcard.css';
import { useEffect, useState } from 'react';
import MatchCard from './MatchCard';
import { useStarknetCall } from '@starknet-react/core';

const MatchList = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
    }, []);

    return (
        <div>
            {[...Array(16).keys()].map(
                (i: number) => (
                    <MatchCard index={i} />
                )
            )}
        </div>
    )
}

export default MatchList;