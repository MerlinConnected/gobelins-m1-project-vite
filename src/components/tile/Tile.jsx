import { useRef, useEffect } from 'react';
import { Instance } from '@react-three/drei';

import { motion } from 'framer-motion-3d';
import { useAnimation } from 'framer-motion';

export default function Tile({ rendered, id, ...props }) {
  const ref = useRef();
  const controls = useAnimation();
  useEffect(() => {
    if (!rendered) return;
    controls.start({
      scale: 1,
      y: 0,
      transition: { duration: 0.5, easings: ['circOut'] },
    });

    return () => {
      controls.start({ scale: 0.8, y: -0.5 });
    };
  }, [controls, rendered]);

  return (
    <motion.group initial={{ scale: 0.8, y: -0.5 }} animate={controls} {...props}>
      <Instance ref={ref} />
    </motion.group>
  );
}
