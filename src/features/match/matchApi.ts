import BN from 'bn.js';
import { decodeShortString } from 'starknet/dist/utils/shortString';
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

export function feltToString(felt: BN) {
  if (felt.isZero()) return '';
  const newStrB = Buffer.from(felt.toString(16), 'hex');
  return newStrB.toString();
}

const fetchMatches = async (): Promise<MatchApi> => {
  const sc = createSC();
  try {
    const ret = await sc.call('get_matches_data');
    return ret.matches
      .map((match: any) => ({
        home_team: feltToString(match.home_team as BN),
        away_team: feltToString(match.away_team as BN),
        date: (match.date as BN).toNumber(),
        is_score_set:
          (match.is_score_set as BN).toNumber() === 1 ? true : false,
        score_ht: (match.score_ht as BN).toNumber(),
        score_at: (match.score_at as BN).toNumber(),
      }))
      .reverse();
  } catch (error) {
    console.log(error);
  }

  return [];
};

const matchApi = {
  fetchMatches,
};

export default matchApi;
