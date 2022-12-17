import './matchcard.css';
import France from '../../assets/flags/fr.svg';
import Qatar from '../../assets/flags/qa.svg';
import Ecuador from '../../assets/flags/ec.svg';
import England from '../../assets/flags/eg.svg';
import Iran from '../../assets/flags/ir.svg';
import Senegal from '../../assets/flags/sn.svg';
import Netherlands from '../../assets/flags/nl.svg';
import USA from '../../assets/flags/us.svg';
import Wales from '../../assets/flags/wa.svg';
import Argentina from '../../assets/flags/ar.svg';
import SaudiArabia from '../../assets/flags/sa.svg';
import Denmark from '../../assets/flags/dk.svg';
import Tunisia from '../../assets/flags/tn.svg';
import Mexico from '../../assets/flags/mx.svg';
import Poland from '../../assets/flags/pl.svg';
import Australia from '../../assets/flags/au.svg';
import Morocco from '../../assets/flags/ma.svg';
import Croatia from '../../assets/flags/hr.svg';
import Germany from '../../assets/flags/ge.svg';
import Japan from '../../assets/flags/jp.svg';
import Spain from '../../assets/flags/es.svg';
import CostaRica from '../../assets/flags/cr.svg';
import Belgium from '../../assets/flags/be.svg';
import Canada from '../../assets/flags/ca.svg';
import Switzerland from '../../assets/flags/ch.svg';
import Cameroon from '../../assets/flags/cm.svg';
import Uruguay from '../../assets/flags/uy.svg';
import SouthKorea from '../../assets/flags/kr.svg';
import Portugal from '../../assets/flags/pt.svg';
import Ghana from '../../assets/flags/gh.svg';
import Brazil from '../../assets/flags/br.svg';
import Serbia from '../../assets/flags/rs.svg';
import React, { useEffect, useState } from 'react';
import {
  useAccount,
  useContract,
  useStarknetCall,
  useStarknetExecute,
} from '@starknet-react/core';
import { Abi, validateAndParseAddress } from 'starknet';
import ContractAbi from '../../assets/abis/prono.json';
import { DateTime } from 'luxon';
import { encodeShortString } from 'starknet/dist/utils/shortString';
import { feltToString } from '../MatchAdmin';
import { Box, Button, NumberInput, Text, TextInput } from '@mantine/core';
import { BETA } from 'starknet/constants';
import BN from 'bn.js';
import { CONTRACT_ADDRESS } from '../../app/globals';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  addPronoToSave,
  setScoreHasChanged,
} from '../../features/prono/pronoSlice';

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
};

interface Bet {
  match_id: number;
  ht_score: number;
  at_score: number;
}

interface MatchInfoProp {
  id: number;
  type: 'prono' | 'result';
  homeTeam: string;
  awayTeam: string;
  dateUtc: number;
}

interface IFlag {
  image: string;
}

const MatchCard: React.FC<MatchInfoProp> = ({
  id,
  type,
  homeTeam,
  awayTeam,
  dateUtc,
}) => {
  const dispatch = useAppDispatch();

  const [homeTeamScore, setHomeTeamScore] = useState<number | ''>('');
  const [awayTeamScore, setAwayTeamScore] = useState<number | ''>('');

  const { pronos, pronoStatus } = useAppSelector((state) => state.prono);
  useEffect(() => {
    if (type === 'prono' && pronoStatus === 'succeeded') {
      const i = pronos.findIndex((p) => p.match_id === id);
      if (i !== -1) {
        setHomeTeamScore(pronos[i].home_score);
        setAwayTeamScore(pronos[i].away_score);
      }
    }
  }, [id, pronos, pronoStatus, type]);

  const [pointForMatch, setPointForMatch] = useState(-1);
  const { points, pointStatus } = useAppSelector((state) => state.point);
  useEffect(() => {
    if (type === 'result' && pointStatus === 'succeeded') {
      const i = points.findIndex((p) => p.match_id === id);
      if (i !== -1) {
        setPointForMatch(points[i].points);
      }
    }
  }, [id, points, pointStatus, type, pointForMatch]);

  const displayPoint = () => {
    /*let bgColor;
		if (pointForMatch === 3) bgColor = '#2cba00';
		else if (pointForMatch === 2) bgColor = '#a3ff00';
		else if (pointForMatch === 1) bgColor = '#fff400';
		else bgColor = '#ffa700';*/
    if (pointForMatch === -1) return null;

    return (
      <Box
        sx={{
          position: 'absolute',
          top: '4px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          backgroundColor: '#99E9F2',
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
      </Box>
    );
  };

  const { matches, matchStatus } = useAppSelector((state) => state.match);
  useEffect(() => {
    if (type === 'result' && matchStatus === 'succeeded') {
      setHomeTeamScore(matches[id].score_ht);
      setAwayTeamScore(matches[id].score_at);
    }
  }, [id, matchStatus, matches, type]);

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
  };

  let HomeTeamFlag;
  let AwayTeamFlag;

  for (const key in dict) {
    if (homeTeam && homeTeam.replace(' ', '') === key) {
      HomeTeamFlag = dict[key].image;
    }
    if (awayTeam && awayTeam.replace(' ', '') === key) {
      AwayTeamFlag = dict[key].image;
    }
  }

  const displayRound = (matchId: number) => {
    if (matchId === 0) return 'Final';
    else if (matchId === 1) return 'Third place';
    else if (matchId <= 3) return 'Semi-finals';
    else if (matchId <= 7) return 'Quarter-finals';
    return 'Round of 16';
  };

  const displayDate = () => {
    return DateTime.fromSeconds(dateUtc).toLocaleString(
      DateTime.DATETIME_SHORT
    ); // DATETIME_LONG
  };

  const canBet = () => {
    if (Date.now() >= dateUtc * 1000) return false;
    return true;
  };

  if (type === 'result' && !matches[id].is_score_set) return null;

  return (
    <Box
      sx={{
        margin: '1rem 0 0 0',
        padding: '0.5rem 0.5rem 0.5rem 0.5rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="match-card"
    >
      {!canBet() && type === 'prono' && <Box className="locked-bet"></Box>}
      <div className="match-info">
        <Text
          sx={{
            fontSize: '16px',
          }}
          className="date-in-card"
        >
          {displayDate()}
        </Text>
        {type === 'result' && <div>{displayPoint()}</div>}
        <Text
          sx={{
            fontSize: '16px',
          }}
          className="date-in-card"
        >
          {displayRound(id)}
        </Text>
      </div>
      <div className="match-team-and-score">
        <div className="country">
          <img src={HomeTeamFlag} className={'flag'}></img>
          <div style={{ width: '10px' }}></div>
          <p className="country-name"> {homeTeam}</p>
        </div>

        <div className="score">
          {type === 'prono' ? (
            <TextInput
              id="outlined-basic"
              className="scorefield"
              value={homeTeamScore}
              onChange={(e) => {
                let newHTScore = homeTeamScore;
                let newATScore = awayTeamScore;
                if (isNaN(parseInt(e.target.value))) newHTScore = 0;
                else newHTScore = parseInt(e.target.value, 10);
                if (newATScore === '') newATScore = 0;

                setHomeTeamScore(newHTScore);
                setAwayTeamScore(newATScore);

                dispatch(
                  addPronoToSave({
                    match_id: id,
                    home_score: newHTScore,
                    away_score: newATScore,
                  })
                );
                dispatch(setScoreHasChanged());
              }}
            />
          ) : (
            <div style={{ margin: 'auto', color: 'black' }}>
              {homeTeamScore}
            </div>
          )}

          {/* <p className='text-in-card'> 0 </p> */}
          <p className="middle-score"> - </p>
          {/* <p className='text-in-card'> 0 </p> */}
          {type === 'prono' ? (
            <TextInput
              id="outlined-basic"
              className="scorefield"
              value={awayTeamScore}
              onChange={(e) => {
                let newHTScore = homeTeamScore;
                let newATScore = awayTeamScore;
                if (isNaN(parseInt(e.target.value))) newATScore = 0;
                else newATScore = parseInt(e.target.value, 10);
                if (newHTScore === '') newHTScore = 0;

                setHomeTeamScore(newHTScore);
                setAwayTeamScore(newATScore);

                dispatch(
                  addPronoToSave({
                    match_id: id,
                    home_score: newHTScore,
                    away_score: newATScore,
                  })
                );
                dispatch(setScoreHasChanged());
              }}
            />
          ) : (
            <div style={{ margin: 'auto', color: 'black' }}>
              {awayTeamScore}
            </div>
          )}
        </div>

        <div className="country">
          <p className="country-name"> {awayTeam} </p>
          <div style={{ width: '10px' }}></div>
          <img src={AwayTeamFlag} className={'flag'}></img>
        </div>
      </div>
    </Box>
  );
};

export default MatchCard;
