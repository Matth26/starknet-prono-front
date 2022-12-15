import './matchcard.css';
import { useEffect, useState } from 'react';
import MatchCard from './MatchCard';
import { useStarknetCall } from '@starknet-react/core';

interface MatchListProps {
    type: 'prono' | 'result';
}

const MatchList = ({ type }: MatchListProps) => {
    const [data, setData] = useState([]);
    useEffect(() => {
    }, []);

    return (
        <div>
            {type === 'prono' &&
                <div>
                    {[...Array(16).keys()].map(
                        (i: number) => (
                            <MatchCard type='prono' index={i} />
                        )
                    )}
                </div>
            }
            {type === 'result' &&
                <div>
                    {[...Array(16).keys()].map(
                        (i: number) => (
                            <MatchCard type='result' index={i} />
                        )
                    )}
                </div>
            }
        </div>

    )
}

export default MatchList;