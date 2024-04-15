// getCurveFromPlayer.js
import { CatmullRomCurve3, Vector3, Vector2 } from 'three';

function getCurveFromPlayer(position, points) {
  const data = { position: new Vector3(position.x, position.y, position.z) };
  const p = [];

  // console.log(position);

  p.push(data.position.clone());

  for (let i = 0; i < points.length; i++) {
    const direction = points[i];
    direction.x *= -1;

    const isCenter = data.position.x % 1 !== 0;
    const offset = new Vector2();
    if (!isCenter) {
      offset.x = Math.sign(direction.x) * 0.5;
    }
    if (direction.z < -0.5) {
      offset.y = -1;
    }
    // const start = data.position.clone();
    const center = new Vector3(data.position.x + offset.x, 0, Math.floor(data.position.z) + 0.5 + offset.y);
    const point = data.position.add(direction);
    if (center.z > point.z) {
      center.z = point.z;
    }
    if (center.z % 1 === 0) {
      center.z += 0.5;
    }
    // p.push(center);
    p.push(point.clone());
  }

  // console.log(p);

  const curve = new CatmullRomCurve3(p);

  return curve;
}

export default getCurveFromPlayer;
