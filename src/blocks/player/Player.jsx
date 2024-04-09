import React, { useMemo, useRef } from 'react';

import { PerspectiveCamera } from '@react-three/drei';
import { Vector3 } from 'three';

import { myPlayer, usePlayerState } from 'playroomkit';

import { Model } from '../../models/car';

import Billboard from '../../components/billboard/Billboard';

import paths from '../../utils/paths.json';
import { useEffect } from 'react';

function Player({ player, index, ...props }) {
  const ref = React.useRef();
  const { position, rotationY } = props;

  // console.log(position);

  const { id, state } = player;
  const me = myPlayer();
  const camRef = React.useRef();
  // console.log(paths.players);

  const [points] = usePlayerState(player, 'points');

  const cameraPos = useMemo(() => {
    const pos = new Vector3(position[0], position[1], position[2]);
    return pos;
  }, [me]);

  useEffect(() => {
    if (me?.id === id) {
      camRef.current.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
      // camRef.current.lookAt(0, 0, 0);

      let tempVec = new Vector3();

      ref.current.getWorldDirection(tempVec);

      camRef.current.position.addScaledVector(tempVec, -5);
      tempVec.cross(new Vector3(0, 1, 0)).normalize();
      camRef.current.position.addScaledVector(tempVec, 2);
      camRef.current.position.y += 2;

      // camera.position.sub
      console.log(camRef.current.position);
    }
  }, [player]);

  // useEffect(() => {
  //   console.log(points);
  // }),
  //   [points];

  return (
    <>
      <group ref={ref} rotation-y={rotationY} {...props}>
        <Billboard player={player} position={[0, 2, 0]} />
        <Model color={state?.profile?.color} />
      </group>
      {me?.id === id && <PerspectiveCamera ref={camRef} makeDefault />}
    </>
  );
}

export default React.memo(Player);
