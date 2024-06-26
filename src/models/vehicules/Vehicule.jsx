import React, { useEffect, forwardRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion-3d';
import { Html, Image } from '@react-three/drei';
import { DoubleSide } from 'three';
import Billboard from '../../components/billboard/Billboard';
import StrokeText from '../../components/stroke-text/StrokeText';
import styles from './Vehicule.module.scss';
import { myPlayer } from 'playroomkit';

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
    images: ['/images/vehicules/shoe/pied-1.png', '/images/vehicules/shoe/shoe-var2.png'],
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

  return (
    vehicleImage && (
      <motion.group
        // onPointerOver={() => {
        //   hover(true);
        // }}
        // onPointerOut={() => {
        //   hover(false);
        // }}
        {...props}
        ref={ref}
        dispose={null}
        whileHover={{ scale: 1.4 }}
      >
        <Billboard>
          <Html
            center
            distanceFactor={20}
            zIndexRange={[0, -1]}
            position={[0, 1.2, 0]}
            className={opacityDown ? styles.notSelectable : styles.selectable}
          >
            <StrokeText className={styles.speed}>{currentSpeed}</StrokeText>
          </Html>
          <Html
            center
            distanceFactor={20}
            zIndexRange={[0, -1]}
            className={opacityDown ? styles.notSelectable : styles.selectable}
          >
            <StrokeText className={styles.billboardName}>{player.state?.name}</StrokeText>
          </Html>

          <Image
            url={vehicleImage}
            side={DoubleSide}
            transparent
            position={[0, 0.5, 0]}
            opacity={opacityDown ? 0.6 : 1}
          />
        </Billboard>
      </motion.group>
    )
  );
});

export default React.memo(Vehicule);
