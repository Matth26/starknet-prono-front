import BN from 'bn.js';
import { createSC } from '../../tools/starknet';

export type PointApi = Point[];

interface Point {
  match_id: number;
  points: number;
}

const fetchPoints = async (address: string): Promise<PointApi> => {
  const sc = createSC();
  try {
    const ret = await sc.call('get_user_points_for_each_bet', [address]);
    return ret.points.map((p: any) => ({
      match_id: (p.match_id as BN).toNumber(),
      points: (p.points as BN).toNumber(),
    }));
  } catch (error) {
    console.log(error);
  }

  return [];
};

const pointApi = {
  fetchPoints,
};

export default pointApi;
