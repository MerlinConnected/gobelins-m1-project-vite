import React, { useEffect, forwardRef, useState } from 'react';

import { motion } from 'framer-motion-3d';

import { Image, useGLTF } from '@react-three/drei';
import { DoubleSide } from 'three';

import Billboard from '../../components/billboard/Billboard';

export const Bike = forwardRef((props, ref) => {
  const [hovered, hover] = useState(null);
  const [currentVariant, setCurrentVariant] = useState(1);

  const bikeImages = ['/images/vehicules/bike/bike-variant-1.png', '/images/vehicules/bike/bike-variant-2.png'];

  const bikeImagesOutlined = [
    '/images/vehicules/bike/bike-variant-1-outlined.png',
    '/images/vehicules/bike/bike-variant-2-outlined.png',
  ];

  const bike = hovered ? bikeImages[currentVariant] : bikeImagesOutlined[currentVariant];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVariant((prevVariant) => (prevVariant + 1) % bikeImages.length);
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
        <Image url={bike} side={DoubleSide} transparent />
      </Billboard>
    </motion.group>
  );
});

useGLTF.preload('/models/car_low_poly.glb');
