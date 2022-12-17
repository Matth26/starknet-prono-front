import BN from 'bn.js';
import { createSC } from '../../tools/starknet';

export type ScoreBoardApi = Result[];

interface Result {
  address: string;
  points: number;
}

export function feltToString(felt: BN) {
  if (felt.isZero()) return '';
  const newStrB = Buffer.from(felt.toString(16), 'hex');
  return newStrB.toString();
}

const fetchScoreBoard = async (): Promise<ScoreBoardApi> => {
  const sc = createSC();
  try {
    const ret = await sc.call('get_scoreboard');
    return ret.scores.map((s: any) => ({
      address: '0x' + (s.address as BN).toString(16),
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
