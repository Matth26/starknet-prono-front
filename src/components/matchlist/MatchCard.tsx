import './matchcard.css';
import France from '../../assets/flags/fr.svg'
import Qatar from '../../assets/flags/qa.svg'
import Ecuador from '../../assets/flags/ec.svg'
import England from '../../assets/flags/eg.svg'
import Iran from '../../assets/flags/ir.svg'
import Senegal from '../../assets/flags/sn.svg'
import Netherlands from '../../assets/flags/nl.svg'
import USA from '../../assets/flags/us.svg'
import Wales from '../../assets/flags/wa.svg'
import Argentina from '../../assets/flags/ar.svg'
import SaudiArabia from '../../assets/flags/sa.svg'
import Denmark from '../../assets/flags/dk.svg'
import Tunisia from '../../assets/flags/tn.svg'
import Mexico from '../../assets/flags/mx.svg'
import Poland from '../../assets/flags/pl.svg'
import Australia from '../../assets/flags/au.svg'
import Morocco from '../../assets/flags/ma.svg'
import Croatia from '../../assets/flags/hr.svg'
import Germany from '../../assets/flags/ge.svg'
import Japan from '../../assets/flags/jp.svg'
import Spain from '../../assets/flags/es.svg'
import CostaRica from '../../assets/flags/cr.svg'
import Belgium from '../../assets/flags/be.svg'
import Canada from '../../assets/flags/ca.svg'
import Switzerland from '../../assets/flags/ch.svg'
import Cameroon from '../../assets/flags/cm.svg'
import Uruguay from '../../assets/flags/uy.svg'
import SouthKorea from '../../assets/flags/kr.svg'
import Portugal from '../../assets/flags/pt.svg'
import Ghana from '../../assets/flags/gh.svg'
import Brazil from '../../assets/flags/br.svg'
import Serbia from '../../assets/flags/rs.svg'
import React, { useState } from 'react';
import { useContract, useStarknetCall, useStarknetExecute } from '@starknet-react/core';
import { Abi } from 'starknet';
import ContractAbi from '../../assets/abis/prono.json';
import { DateTime } from 'luxon';
import { encodeShortString } from 'starknet/dist/utils/shortString';
import { feltToString } from '../MatchAdmin';
import { TextInput } from '@mantine/core';

const MatchCard: React.FC<{ index: number }> = ({ index }) => {

    const dict: { [id: string]: IFlag } = {
        France: { image: France },
        Qatar: { image: Qatar },
        Ecuador: { image: Ecuador },
        England: { image: England },
        Iran: { image: Iran },
        Senegal: { image: Senegal },
        Netherlands: { image: Netherlands },
        USA: { image: USA },
        Wales: { image: Wales },
        Argentina: { image: Argentina },
        SaudiArabia: { image: SaudiArabia },
        Denmark: { image: Denmark },
        Tunisia: { image: Tunisia },
        Mexico: { image: Mexico },
        Poland: { image: Poland },
        Australia: { image: Australia },
        Morocco: { image: Morocco },
        Croatia: { image: Croatia },
        Germany: { image: Germany },
        Japan: { image: Japan },
        Spain: { image: Spain },
        CostaRica: { image: CostaRica },
        Belgium: { image: Belgium },
        Canada: { image: Canada },
        Switzerland: { image: Switzerland },
        Cameroon: { image: Cameroon },
        Uruguay: { image: Uruguay },
        SouthKorea: { image: SouthKorea },
        Portugal: { image: Portugal },
        Ghana: { image: Ghana },
        Brazil: { image: Brazil },
        Serbia: { image: Serbia },
    }
    const CONTRACT_ADDRESS =
        '0x2643255c69065c8c33388e825c3ffb568fa7684f9874f9a1d24c3964769fed8';
    let homeTeamFlag;
    let AwayTeamFlag;
    //code starknet
    const { contract } = useContract({
        abi: ContractAbi as Abi,
        address: CONTRACT_ADDRESS,
    });
    // const [homeMatchName, setHomeMatchName] = useState('');
    // const [awayMatchName, setAwayMatchName] = useState('');

    const {
        data: matchdata,
        loading: isNameLoading,
        error: nameError,
        refresh: refreshName,
    } = useStarknetCall({
        contract,
        method: 'get_match_data_by_id',
        args: [index],
        options: { watch: false },
    });

    //(date = m.date, home_team = m.home_team, away_team = m.away_team, is_score_set = m.is_score_set, score_ht = m.score_ht, score_at = m.score_at)

    for (let key in dict) {
        let HomeTeam = matchdata && feltToString(matchdata[1])
        let AwayTeam = matchdata && feltToString(matchdata[2])
        if (HomeTeam && HomeTeam.replace(' ', '') === key) {
            homeTeamFlag = dict[key].image
        }
        if (AwayTeam && AwayTeam.replace(' ', '') === key) {
            AwayTeamFlag = dict[key].image
        }
    }



    return (
        <div className="match-card">
            <div className='match-info'>
                <p className='date-in-card'> {matchdata && DateTime.fromSeconds(matchdata[0].toNumber()).toLocaleString(
                    DateTime.DATETIME_SHORT,
                )}</p>
                <p className='date-in-card'> Group Phase</p>
            </div>
            <div className='match-team-and-score'>
                <img src={homeTeamFlag} className='flag'></img>
                <div className='score'>
                    <p className='text-in-card'> {matchdata && feltToString(matchdata[1])}</p>
                    <TextInput id="outlined-basic" className='scorefield' />
                    {/* <p className='text-in-card'> 0 </p> */}
                    <p className='middle-score'> - </p>
                    {/* <p className='text-in-card'> 0 </p> */}
                    <TextInput id="outlined-basic" className='scorefield' />
                    <p className='text-in-card'>  {matchdata && feltToString(matchdata[2])} </p>
                </div>

                <img src={AwayTeamFlag} className='flag'></img>
            </div>

        </div>)
}

export default MatchCard;

interface MatchInfoProp {
    HomeTeam: string;
    AwayTeam: string;
    DateUtc: string;
}

interface IFlag {
    image: string;
}