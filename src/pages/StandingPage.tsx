import { useEffect, useState } from 'react';

import StandingElement from '../components/standings/StandingElement';
import ContractAbi from '../assets/abis/prono.json';
import { useAccount, useContract, useStarknetCall } from '@starknet-react/core';
import { Abi } from 'starknet';
import { Group } from '@mantine/core';

const StandingPage = () => {
    const { address, } = useAccount();
    function rankDuplicate(arr: any[]) {
        const sorted = [...new Set(arr)].sort((a, b) => b - a);
        const rank = new Map(sorted.map((x, i) => [x, i + 1]));
        return arr.map((x) => ({
            address: x.address,
            points: x.points,
            herotag: x.herotag,
            classement: rank.get(x),
        }));
    }

    const [score, setScore] = useState<any[]>([]);

    const CONTRACT_ADDRESS =
        '0x52054d097681867ef390a916a32d94b5b0b43e04211b6cb82e1f29210de40fc';
    const { contract } = useContract({
        abi: ContractAbi as Abi,
        address: CONTRACT_ADDRESS,
    });

    const {
        data: scoredata,
    } = useStarknetCall({
        contract,
        method: 'get_scoreboard',
        args: [],
        options: { watch: false },
    });

    useEffect(() => {
        console.log("scoredata" + scoredata)
        console.log(rankDuplicate(score));
    }, [scoredata]);

    return (
        <Group sx={{ maxWidth: '700px', width: '90%', margin: 'auto' }}>
            {score &&
                rankDuplicate(score).map((score, i) => (
                    <StandingElement
                        address={score.address}
                        herotag="test"
                        points={score.points}
                        classement={score.classement}
                    ></StandingElement>
                ))}
        </Group>
    );
};

export default StandingPage;
