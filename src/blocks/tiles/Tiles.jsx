import React from 'react';
import { Instances, useGLTF } from '@react-three/drei';

import Tile from '../../components/tile/Tile';

export function StraightTiles({ data, range }) {
  const { nodes } = useGLTF('/models/tiles.glb');
  return (
    <Instances range={range} geometry={nodes.straight.geometry}>
      {data.map((props, i) => {
        return (
          <React.Fragment key={props.index}>
            <meshStandardMaterial color="cyan" />
            <Tile {...props} id={i} rendered={i < range} />
          </React.Fragment>
        );
      })}
    </Instances>
  );
}

export function CornerTiles({ data, range }) {
  const { nodes } = useGLTF('/models/tiles.glb');
  return (
    <Instances range={range} geometry={nodes.corner.geometry}>
      {data.map((props, i) => (
        <React.Fragment key={i}>
          <meshStandardMaterial color="hotpink" />
          <Tile {...props} id={i} rendered={i < range} />
        </React.Fragment>
      ))}
    </Instances>
  );
}
