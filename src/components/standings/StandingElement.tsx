import './StandingElement.css';
import goldmedal from '../../assets/svg/gold-medal.svg';
import silvermedal from '../../assets/svg/silver-medal.svg';
import bronzemedal from '../../assets/svg/bronze-medal.svg';
import { Group } from '@mantine/core';

interface StandingElementProp {
    address: string;
    herotag: string;
    points: number;
    classement: number | undefined;
}

const StandingElement = ({
    address,
    herotag,
    points,
    classement,
}: StandingElementProp) => {
    return (
        <Group
            sx={{
                margin: '1rem 0 1rem 0',
                padding: '0.5rem 1rem 0.5rem 1rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
            }}
            className="match-card"
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
            {herotag != null && (
                <p className="identifier">
                    <b> {herotag} </b>
                </p>
            )}
            {herotag == null && <p className="identifier"> {address}</p>}
            <p> {points} points</p>
        </Group>
    );
};

export default StandingElement;
