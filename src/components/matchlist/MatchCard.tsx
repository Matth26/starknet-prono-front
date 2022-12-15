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
import React, { useEffect, useState } from 'react';
import { useAccount, useContract, useStarknetCall, useStarknetExecute } from '@starknet-react/core';
import { Abi } from 'starknet';
import ContractAbi from '../../assets/abis/prono.json';
import { DateTime } from 'luxon';
import { encodeShortString } from 'starknet/dist/utils/shortString';
import { feltToString } from '../MatchAdmin';
import { Button, NumberInput, TextInput } from '@mantine/core';
import { BETA } from 'starknet/constants';

interface Bet {
    match_id: number;
    ht_score: number;
    at_score: number;
}

const MatchCard: React.FC<{ index: number, type: string }> = ({ index, type }) => {

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

    const [HomeTeamScore, setHomeTeamScore] = useState<number | undefined>();
    const [AwayTeamScore, setAwayTeamScore] = useState<number | undefined>('');
    const [HomeTeam, setHomeTeam] = useState<string | ''>('');
    const [AwayTeam, setAwayTeam] = useState<string | ''>('');
    const [dateUtc, setdateUtc] = useState<number>(0);
    const [pointForMatch, setPointForMatch] = useState(-1);

    const { address, } = useAccount();

    const [prono, setProno] = useState<Bet | null>(null);
    const [pronosToSave, setpronosToSave] = useState<Bet | null>(null);
    const [scoreHasChanged, setscoreHasChanged] = useState<Boolean>(false);

    const CONTRACT_ADDRESS =
        '0x2643255c69065c8c33388e825c3ffb568fa7684f9874f9a1d24c3964769fed8';
    let homeTeamFlag;
    let AwayTeamFlag;
    const { contract } = useContract({
        abi: ContractAbi as Abi,
        address: CONTRACT_ADDRESS,
    });

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

    const {
        data: pronodata,
    } = useStarknetCall({
        contract,
        method: 'get_user_bet_by_id',
        args: [address, index],
        options: { watch: false },
    });

    useEffect(() => {
        if (matchdata) {
            setHomeTeam(feltToString(matchdata[1]));
            setAwayTeam(feltToString(matchdata[2]));
            setdateUtc(matchdata[0].toNumber());
        }

    }, [matchdata]);

    useEffect(() => {
        console.log("pronoidata    " + pronodata)
        console.log("prono    " + prono)
        if (pronodata === null && prono) {
            setscoreHasChanged(true)
        }
        if (pronodata && prono) {
            if (pronodata[0] != prono?.ht_score) {
                setscoreHasChanged(true);
            }
            else if (pronodata[1] != prono?.at_score) {
                setscoreHasChanged(true);
            }
        }

        //setProno()
    }, [pronodata, prono])

    for (let key in dict) {
        if (HomeTeam && HomeTeam.replace(' ', '') === key) {
            homeTeamFlag = dict[key].image
        }
        if (AwayTeam && AwayTeam.replace(' ', '') === key) {
            AwayTeamFlag = dict[key].image
        }
    }

    const canBet = () => {
        if (Date.now() >= dateUtc * 1000) return false;
        return true;
    };

    const displayDate = () => {

        return DateTime.fromSeconds(dateUtc).toLocaleString(
            DateTime.DATETIME_SHORT,
        );
    };

    const displayRound = (matchId: number) => {
        if (matchId <= 7) return 'Round of 16';
        else if (matchId <= 11) return 'Quarter-finals';
        else if (matchId <= 13) return 'Semi-finals';
        else if (matchId <= 14) return 'Third place';
        return 'Final';
    };

    const displayPoint = () => {
        if (pointForMatch === -1) return null;

        return (
            <div
                style={{
                    position: 'absolute',
                    top: '4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    backgroundColor: '#a3ff00',
                    borderRadius: '30px',
                    paddingTop: '3px',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    paddingBottom: '1px',
                    fontWeight: 'bold',
                    zIndex: 10,
                    fontSize: '16px',
                }}
            >
                <span
                    style={{ marginTop: '0px', marginLeft: '1px', marginRight: '6px' }}
                >
                    {pointForMatch}
                </span>
                <span>points</span>
            </div>
        );
    };
    return (
        // <div className="match-card">
        //     <div className='match-info'>
        //         <p className='date-in-card'> {matchdata && DateTime.fromSeconds(matchdata[0].toNumber()).toLocaleString(
        //             DateTime.DATETIME_SHORT,
        //         )}</p>
        //         <p className='date-in-card'> Group Phase</p>
        //     </div>
        //     <div className='match-team-and-score'>
        //         <img src={homeTeamFlag} className='flag'></img>
        //         <div className='score'>
        //             <p className='text-in-card'> {matchdata && feltToString(matchdata[1])}</p>
        //             <TextInput id="outlined-basic" className='scorefield' />
        //             {/* <p className='text-in-card'> 0 </p> */}
        //             <p className='middle-score'> - </p>
        //             {/* <p className='text-in-card'> 0 </p> */}
        //             <TextInput id="outlined-basic" className='scorefield' />
        //             <p className='text-in-card'>  {matchdata && feltToString(matchdata[2])} </p>
        //         </div>

        //         <img src={AwayTeamFlag} className='flag'></img>
        //     </div>

        //</div>
        <div
            style={{
                margin: '1rem 0 0 0',
                padding: '0.5rem 0.5rem 0.5rem 0.5rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
            }}
            className="match-card"
        >
            {!canBet() && <div className="locked-bet"></div>}
            <div className="match-info">
                <span
                    style={{
                        fontSize: '14px',
                    }}
                    className="date-in-card"
                >
                    {displayDate()}
                </span>
                {type === 'result' && <div>{displayPoint()}</div>}
                <span
                    style={{
                        fontSize: '14px',
                    }}
                    className="date-in-card"
                >
                    {displayRound(index)}
                </span>
            </div>
            <div className="match-team-and-score">
                <div className="country">
                    <img
                        src={homeTeamFlag}
                        className={homeTeamFlag !== undefined ? 'flag' : 'unknown-flag'}
                    ></img>
                    <div style={{ width: '10px' }}></div>
                    <p className="country-name"> {HomeTeam}</p>
                </div>

                <div className="score">
                    {type === 'prono' ? (
                        <NumberInput
                            id="outlined-basic"
                            hideControls={true}
                            className="scorefield"
                            value={HomeTeamScore}
                            onChange={(val) => {
                                let newHTScore = HomeTeamScore;
                                let newATScore = AwayTeamScore;
                                if (!val) newHTScore = 0;
                                else newHTScore = val;
                                if (!newATScore) newATScore = 0;
                                let bet = { match_id: index, ht_score: newHTScore, at_score: newATScore }
                                setHomeTeamScore(newHTScore);
                                setAwayTeamScore(newATScore);
                                setProno(bet)
                            }}
                        />
                    ) : (
                        <div style={{ margin: 'auto', color: 'black' }}>
                            {HomeTeamScore}
                        </div>
                    )}


                    <p className="middle-score"> - </p>

                    {type === 'prono' ? (
                        <NumberInput
                            id="outlined-basic"
                            style={{ padding: "auto" }}
                            defaultValue={0}
                            hideControls={true}
                            className="scorefield"
                            //inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            value={AwayTeamScore}
                            onChange={(val) => {
                                let newHTScore = HomeTeamScore;
                                let newATScore = AwayTeamScore;
                                if (!val) newHTScore = 0;
                                else newHTScore = val;
                                if (!val) newATScore = 0;
                                else newATScore = val;
                                if (!newHTScore) newHTScore = 0;

                                setHomeTeamScore(newHTScore);
                                setAwayTeamScore(newATScore);

                            }}
                        />
                    ) : (
                        <div style={{ margin: 'auto', color: 'black' }}>
                            {AwayTeamScore}
                        </div>
                    )}
                </div>

                <div className="country">
                    <p className="country-name"> {AwayTeam} </p>
                    <div style={{ width: '10px' }}></div>
                    <img
                        src={AwayTeamFlag}
                        className={AwayTeamFlag !== undefined ? 'flag' : 'unknown-flag'}
                    ></img>
                </div>
                <div>
                    <Button
                        disabled={!scoreHasChanged}
                        sx={{
                            color: 'black',
                            backgroundColor: scoreHasChanged ? '#ffc300' : '#ececec',
                            marginBottom: '10px',
                            alignSelf: 'flex-end',
                            margin: 0,
                        }}
                    // onClick={() => {
                    //     sendTx({ gasLimit: 10000000 });
                    // }}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
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