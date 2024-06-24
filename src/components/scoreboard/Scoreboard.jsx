import React, { useState, useEffect, useMemo } from 'react';

import classNames from 'classnames';
import styles from './Scoreboard.module.scss';

import StrokeText from '../stroke-text/StrokeText';
import CardLayers from '../card-layers/CardLayers';

import { usePlayerContext } from '../../provider/PlayerProvider';

import { motion } from 'framer-motion';

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
    pied: {
      images: ['/images/vehicules/shoe/shoe-var1.png', '/images/vehicules/shoe/shoe-var2.png'],
    },
  };

  const vehicleImage = useMemo(() => {
    const vehicle = vehicleImages[player.state?.status?.name];
    return vehicle?.images[currentVariant];
  }, [player.state?.status?.name, currentVariant]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVariant((prevVariant) => (prevVariant + 1) % 2);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return vehicleImage && <img src={vehicleImage} alt="Vehicule Icon of the current player" className={className} />;
}

function Scoreboard({ players, className, ...props }) {
  const { playerTurn } = usePlayerContext();
  const currentPlayer = players[playerTurn];

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <div className={styles.board}>
        {players.map((player, index) => (
          <motion.div
            key={index}
            className={styles.board__player}
            animate={{
              scale: currentPlayer?.id === player?.id ? 1 : 0.6,
              filter: currentPlayer?.id === player?.id ? 'brightness(1)' : 'brightness(0.8)',
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
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
              <motion.svg
                className={styles['speed-indicator']}
                animate={{ x: currentPlayer?.id === player?.id ? 0 : '130px' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 40 37"
              >
                <path fill="#fff" d="M0 5.5 17.8 0l19.1 17.9-12.3 12.7-24.6.8 14.1-13.5L0 5.5Z" />
                <path fill="#FF0D47" d="m5.5 7 13.8-4 13.5 14.3-9.4 10.1-18 .7L17 17.3 5.5 6.9Z" />
              </motion.svg>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Scoreboard);
