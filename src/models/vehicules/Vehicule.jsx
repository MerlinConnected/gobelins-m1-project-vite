import React, { useEffect, forwardRef, useState } from 'react';
import { motion } from 'framer-motion-3d';
import { Image } from '@react-three/drei';
import { DoubleSide } from 'three';
import Billboard from '../../components/billboard/Billboard';

export const Vehicule = forwardRef(({ player, ...props }, ref) => {
  const [hovered, hover] = useState(null);
  const [currentVariant, setCurrentVariant] = useState(0);

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
  };

  const getVehicleImages = (vehicleType) => {
    const vehicle = vehicleImages[vehicleType];
    return hovered ? vehicle?.imagesOutlined[currentVariant] : vehicle?.images[currentVariant];
  };

  const vehicleType = player?.state?.status?.name;
  const vehicleImage = getVehicleImages(vehicleType);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVariant((prevVariant) => (prevVariant + 1) % 2);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.group
      onPointerOver={() => {
        hover(true);
      }}
      onPointerOut={() => {
        hover(false);
      }}
      {...props}
      ref={ref}
      dispose={null}
      position={[0, 0.5, 0]}
      whileHover={{ scale: 1.2, y: 0.6 }}
    >
      <Billboard>
        <Image url={vehicleImage} side={DoubleSide} transparent />
      </Billboard>
    </motion.group>
  );
});
