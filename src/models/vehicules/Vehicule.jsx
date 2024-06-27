import React, { useEffect, forwardRef, useState, useMemo } from 'react';
import { motion as motion3d } from 'framer-motion-3d';
import { Html, Image } from '@react-three/drei';
import { DoubleSide } from 'three';
import Billboard from '../../components/billboard/Billboard';
import StrokeText from '../../components/stroke-text/StrokeText';
import { myPlayer } from 'playroomkit';

import classNames from 'classnames';

import styles from './Vehicule.module.scss';

const vehicleImages = {
  velo: {
    images: ['/images/vehicules/bicycle/velo-1.png', '/images/vehicules/bicycle/velo-2.png'],
    imagesOutlined: ['/images/vehicules/bicycle/velo-1-outlined.png', '/images/vehicules/bicycle/velo-2-outlined.png'],
  },
  moto: {
    images: ['/images/vehicules/bike/moto-1.png', '/images/vehicules/bike/moto-2.png'],
    imagesOutlined: ['/images/vehicules/bike/moto-1-outlined.png', '/images/vehicules/bike/moto-2-outlined.png'],
  },
  voiture: {
    images: ['/images/vehicules/car/voiture-1.png', '/images/vehicules/car/voiture-2.png'],
    imagesOutlined: ['/images/vehicules/car/voiture-1-outlined.png', '/images/vehicules/car/voiture-2-outlined.png'],
  },
  metro: {
    images: ['/images/vehicules/metro/metro-1.png', '/images/vehicules/metro/metro-2.png'],
    imagesOutlined: ['/images/vehicules/metro/metro-1-outlined.png', '/images/vehicules/metro/metro-2-outlined.png'],
  },
  tramway: {
    images: ['/images/vehicules/tram/tramway-1.png', '/images/vehicules/tram/tramway-2.png'],
    imagesOutlined: ['/images/vehicules/tram/tramway-1-outlined.png', '/images/vehicules/tram/tramway-2-outlined.png'],
  },
  pied: {
    images: ['/images/vehicules/shoe/pied-1.png', '/images/vehicules/shoe/pied-2.png'],
    imagesOutlined: ['/images/vehicules/shoe/pied-1-outlined.png', '/images/vehicules/shoe/pied-2-outlined.png'],
  },
};

const Vehicule = forwardRef(({ player, targetable, opacityDown, ...props }, ref) => {
  // const [hovered, hover] = useState(null);
  const [currentVariant, setCurrentVariant] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState('');
  const me = myPlayer();

  const vehicleImage = useMemo(() => {
    const vehicle = vehicleImages[player.state?.status?.name];
    return targetable ? vehicle?.imagesOutlined[currentVariant] : vehicle?.images[currentVariant];
  }, [player.state?.status?.name, targetable, currentVariant]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVariant((prevVariant) => (prevVariant + 1) % 2);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (player.getState('blocked')) {
      setCurrentSpeed('0');
    }
    if (player.getState('minus') !== 0) {
      setCurrentSpeed(player.getState('minus'));
    } else if (player.getState('minus') === 0 && !player.getState('blocked')) {
      setCurrentSpeed(`+${player.getState('status')?.impact}`);
    }
  }, [player.getState('status'), player.getState('blocked'), player.getState('minus')]);

  const playerColor = player.getState('color');

  const isQualified = player.getState('qualified');

  return (
    vehicleImage && (
      <motion3d.group
        // onPointerOver={() => {
        //   hover(true);
        // }}
        // onPointerOut={() => {
        //   hover(false);
        // }}
        ref={ref}
        dispose={null}
        whileHover={{ scale: 1.4 }}
        {...props}
      >
        <Billboard>
          <Html
            center
            distanceFactor={20}
            zIndexRange={[0, -1]}
            position={[0, 1.4, 0]}
            className={classNames({
              [styles.notSelectable]: opacityDown,
            })}
          >
            {isQualified ? (
              <img className={styles.winner} src="/images/icons/ui/crown.svg" alt="qualified" />
            ) : (
              <StrokeText className={styles.speed} style={{ '--player-color': playerColor }}>
                {currentSpeed}
              </StrokeText>
            )}
          </Html>
          <Html
            center
            distanceFactor={20}
            zIndexRange={[0, -1]}
            position-y={0.1}
            className={classNames({
              [styles.notSelectable]: opacityDown,
            })}
          >
            <StrokeText className={styles.billboardName} style={{ '--player-color': playerColor }}>
              {player.state?.name}
            </StrokeText>
          </Html>

          <Image
            url={vehicleImage}
            side={DoubleSide}
            transparent
            position={[0, 0.5, 0]}
            opacity={opacityDown ? 0.6 : 1}
          />
        </Billboard>
      </motion3d.group>
    )
  );
});

export default React.memo(Vehicule);
