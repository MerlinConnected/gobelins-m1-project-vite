import React, { useEffect, forwardRef, useState } from 'react';
import { motion } from 'framer-motion-3d';
import { Html, Image } from '@react-three/drei';
import { DoubleSide } from 'three';
import Billboard from '../../components/billboard/Billboard';
import { useMemo } from 'react';
import StrokeText from '../../components/stroke-text/StrokeText';
import styles from './Vehicule.module.scss';

const vehicleImages = {
  velo: {
    images: ['/images/vehicules/bicycle/bicycle-var1.png', '/images/vehicules/bicycle/bicycle-var2.png'],
    imagesOutlined: [
      '/images/vehicules/bicycle/bicycle-var1-outlined.png',
      '/images/vehicules/bicycle/bicycle-var2-outlined.png',
    ],
  },
  moto: {
    images: ['/images/vehicules/bike/bike-var1.png', '/images/vehicules/bike/bike-var2.png'],
    imagesOutlined: [
      '/images/vehicules/bike/bike-var1-outlined.png',
      '/images/vehicules/bike/bike-var2-outlined.png',
    ],
  },
  voiture: {
    images: ['/images/vehicules/car/car-var1.png', '/images/vehicules/car/car-var2.png'],
    imagesOutlined: ['/images/vehicules/car/car-var1-outlined.png', '/images/vehicules/car/car-var2-outlined.png'],
  },
  metro: {
    images: ['/images/vehicules/metro/metro-var1.png', '/images/vehicules/metro/metro-var2.png'],
    imagesOutlined: [
      '/images/vehicules/metro/metro-var1-outlined.png',
      '/images/vehicules/metro/metro-var2-outlined.png',
    ],
  },
  tramway: {
    images: ['/images/vehicules/tram/tram-var1.png', '/images/vehicules/tram/tram-var2.png'],
    imagesOutlined: [
      '/images/vehicules/tram/tram-var1-outlined.png',
      '/images/vehicules/tram/tram-var2-outlined.png',
    ],
  },
  pied: {
    images: ['/images/vehicules/shoe/shoe-var1.png', '/images/vehicules/shoe/shoe-var2.png'],
    imagesOutlined: ['/images/vehicules/shoe/shoe-var1-outlined.png', '/images/vehicules/shoe/shoe-var2-outlined.png'],
  },
};

const Vehicule = forwardRef(({ player, targetable, ...props }, ref) => {
  // const [hovered, hover] = useState(null);
  const [currentVariant, setCurrentVariant] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState('');

  // const getVehicleImages = (vehicleType) => {
  //   const vehicle = vehicleImages[vehicleType];
  //   return targetable ? vehicle?.imagesOutlined[currentVariant] : vehicle?.images[currentVariant];
  // };

  // const vehicleType = useMemo(() => {
  //   console.log('vehicleType', status.name);
  //   return status;
  // }, [status]);

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
  }
    , [player.getState('status'), player.getState('blocked'), player.getState('minus')]);

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
        position={[0, 0.5, 0]}
        whileHover={{ scale: 1.4, y: 0.6 }}
      >
        <Billboard>
          <Html center distanceFactor={20} zIndexRange={[0, -1]} position={[0, 1.2, 0]}>
            <StrokeText className={styles.speed}>{currentSpeed}</StrokeText>
          </Html>
          <Html center distanceFactor={20} zIndexRange={[0, -1]}>
            <StrokeText className={styles.billboardName}>{player.state?.name}</StrokeText>
          </Html>
          <Image url={vehicleImage} side={DoubleSide} transparent position={[0, 0.5, 0]} />
        </Billboard>
      </motion.group>
    )
  );
});

export default React.memo(Vehicule);