import BN from 'bn.js';
import { createSC } from '../../tools/starknet';

export type PronoApi = Bet[];

export interface Bet {
  match_id: number;
  score_ht: number;
  score_at: number;
}

const getProno = async (address: string): Promise<PronoApi> => {
  const sc = createSC();
  try {
    const ret = await sc.call('get_user_bets', [address]);
    console.log(ret);
    return ret.bets.map((p: any, i: number) => {
      if (!(p.has_been_bet as BN).isZero())
        return {
          match_id: i,
          home_score: (p.score_ht as BN).toNumber(),
          away_score: (p.score_at as BN).toNumber(),
        };
    });
  } catch (error) {
    console.log(error);
  }

  return [];
};

const pronoApi = {
  getProno,
};

export default pronoApi;
