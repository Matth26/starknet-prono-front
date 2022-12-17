import BN from 'bn.js';
import { createSC } from '../../tools/starknet';

export type MatchApi = Match[];

interface Match {
  match_id: number;
  home_team: string;
  away_team: string;
  date: number;
  is_score_set: false;
  score_ht: number;
  score_at: number;
}

const fetchMatches = async (): Promise<MatchApi> => {
  const sc = createSC();
  try {
    const ret = await sc.call('get_matches_data');
    return ret.matches.map((match: any) => ({
      home_team: (match.home_team as BN).toString(),
      away_team: (match.away_team as BN).toString(),
      date: (match.date as BN).toNumber(),
      is_score_set: (match.is_score_set as BN).toNumber() === 1 ? true : false,
      score_ht: (match.score_ht as BN).toNumber(),
      score_at: (match.score_at as BN).toNumber(),
    }));
  } catch (error) {
    console.log(error);
  }

  return [];
};

const matchApi = {
  fetchMatches,
};

export default matchApi;
