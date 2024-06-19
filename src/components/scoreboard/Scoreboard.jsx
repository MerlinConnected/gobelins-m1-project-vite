import { useState, useEffect } from 'react';

import classNames from 'classnames';
import styles from './Scoreboard.module.scss';

import StrokeText from '../stroke-text/StrokeText';
import CardLayers from '../card-layers/CardLayers';

function VehiculeIcons({ player, className }) {
  const [currentVariant, setCurrentVariant] = useState(0);

  const vehicleImages = {
    velo: {
      images: ['/images/vehicules/bicycle/bicycle-var1.png', '/images/vehicules/bicycle/bicycle-var2.png'],
    },
    moto: {
      images: ['/images/vehicules/bike/bike-var1.png', '/images/vehicules/bike/bike-var2.png'],
    },
    voiture: {
      images: ['/images/vehicules/car/car-var1.png', '/images/vehicules/car/car-var2.png'],
    },
    metro: {
      images: ['/images/vehicules/metro/metro-var1.png', '/images/vehicules/metro/metro-var2.png'],
    },
    tramway: {
      images: ['/images/vehicules/tram/tram-var1.png', '/images/vehicules/tram/tram-var2.png'],
    },
  };

  const getVehicleImages = (vehicleType) => {
    const vehicle = vehicleImages[vehicleType];
    return vehicle?.images[currentVariant];
  };

  const vehicleType = player?.state?.status?.name;
  const vehicleImage = getVehicleImages(vehicleType);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVariant((prevVariant) => (prevVariant + 1) % 2);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return vehicleImage && <img src={vehicleImage} alt="Vehicule Icon of the current player" className={className} />;
}

function Scoreboard({ players, className, ...props }) {
  // Logic goes here
  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <div className={styles.board}>
        {players.map((player, index) => (
          <div key={index} className={styles.board__player}>
            <div className={styles.background}>
              <StrokeText regular color={player.getState('color')} className={styles.name}>
                {player?.state.name}
              </StrokeText>
              <p className={styles.score}>{player.getState('points')} cases</p>
              <VehiculeIcons player={player} className={styles.vehicule} />
              <div className={styles.mask} style={{ backgroundColor: player.getState('colorLight') }}>
                <CardLayers className={styles.layer} id="pattern3" />
              </div>
              <svg
                className={styles.background__pattern}
                xmlns="http://www.w3.org/2000/svg"
                width="146"
                height="40"
                viewBox="0 0 146 40"
                fill="none"
              >
                <path
                  d="M4.94179 32.2326L11.4418 35.8013L66.3281 36.8308L104.051 35.8013L133.045 32.2326L143.439 28.1643L141.94 22.6641L142.939 19.6643L142.44 15.6641L140.939 13.1643L140.939 11.1641L140.939 8.16431L136.939 5.16432L120.941 4.54991L62.5805 4.55543L36.9292 6.84259L5.43904 9.66399L4.4418 15.1644L5.94179 20.6644L5.44179 27.1644L4.94179 32.2326Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scoreboard;
