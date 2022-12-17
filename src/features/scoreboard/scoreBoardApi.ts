import BN from 'bn.js';
import { createSC } from '../../tools/starknet';

export type ScoreBoardApi = Result[];

interface Result {
  address: string;
  points: number;
}

const fetchScoreBoard = async (): Promise<ScoreBoardApi> => {
  const sc = createSC();
  try {
    const ret = await sc.call('get_scoreboard');
    return ret.scores.map((s: any) => ({
      address: (s.address as BN).toString(),
      points: (s.points as BN).toNumber(),
    }));
  } catch (error) {
    console.log(error);
  }

  return [];
};

const scoreBoardApi = {
  fetchScoreBoard,
};

export default scoreBoardApi;
