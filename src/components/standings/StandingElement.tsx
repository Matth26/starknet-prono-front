import { Group } from '@mantine/core';

import goldmedal from '../../assets/svg/gold-medal.svg';
import silvermedal from '../../assets/svg/silver-medal.svg';
import bronzemedal from '../../assets/svg/bronze-medal.svg';
import './StandingElement.css';

interface StandingElementProp {
  address: string;
  points: number;
  classement: number | undefined;
}

const StandingElement = ({
  address,
  points,
  classement,
}: StandingElementProp) => {
  return (
    <Group
      sx={{
        margin: '0',
        padding: '0.1rem 0.5rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: '5px',
        fontSize: '15px',
      }}
    >
      {classement == 1 && <img className="medal" src={goldmedal}></img>}
      {classement == 2 && <img className="medal" src={silvermedal}></img>}
      {classement == 3 && <img className="medal" src={bronzemedal}></img>}
      {classement != undefined && classement > 3 && (
        <p className="classement">
          {' '}
          <b> {classement} </b>
        </p>
      )}
      <p className="identifier"> {address}</p>
      <p> {points} points</p>
    </Group>
  );
};

export default StandingElement;
