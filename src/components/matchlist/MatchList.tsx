import './matchcard.css';
import { useEffect, useState } from 'react';
import MatchCard from './MatchCard';
import { useStarknetCall } from '@starknet-react/core';

interface MatchListProps {
  type: 'prono' | 'result';
}

const MatchList = ({ type }: MatchListProps) => {
  const [data, setData] = useState([]);
  useEffect(() => {}, []);

  return (
    <div>
      {[...Array(16).keys()].reverse().map((i: number) => (
        <MatchCard type={type} index={i} />
      ))}
    </div>
  );
};

export default MatchList;
