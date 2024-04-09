import React, { useMemo, useRef } from 'react';

import { PerspectiveCamera } from '@react-three/drei';
import { Vector3 } from 'three';

import { myPlayer, usePlayerState } from 'playroomkit';

import { Model } from '../../models/car';

import Billboard from '../../components/billboard/Billboard';

import paths from '../../utils/paths.json';

function Player({ player, index, ...props }) {
  const group = useRef(null);

  console.log(group.current);

  const { position } = props;

  // console.log(position);

  const { id, state } = player;
  const me = myPlayer();

  // console.log(paths.players);

  const [points] = usePlayerState(player, 'points');

  const cameraPos = useMemo(() => {
    const pos = new Vector3(10, 8, 20);
    return pos;
  }, []);

  // useEffect(() => {
  //   console.log(points);
  // }),
  //   [points];

  return (
    <group {...props} ref={group}>
      <group>
        <Billboard player={player} position={[0, 2, 0]} />
        <Model color={state?.profile?.color} />
      </group>
      {me?.id === id && <PerspectiveCamera makeDefault position={cameraPos} />}
    </group>
  );
}

export default React.memo(Player);
