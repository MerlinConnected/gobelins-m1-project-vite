import { useMemo } from 'react';

import curve_01 from '../../models/curves/curve_01.json';
import curve_02 from '../../models/curves/curve_02.json';
import curve_03 from '../../models/curves/curve_03.json';
import curve_04 from '../../models/curves/curve_04.json';

import getCurveCoordinates from '../../utils/getCurveCoordinates';

export default function Curves({ index }) {
  const coord_01 = getCurveCoordinates(curve_01);
  const coord_02 = getCurveCoordinates(curve_02);
  const coord_03 = getCurveCoordinates(curve_03);
  const coord_04 = getCurveCoordinates(curve_04);

  let arr = [coord_01, coord_02, coord_03, coord_04];

  const selectedCurve = useMemo(() => {
    return arr[index];
  }, [index]);

  return selectedCurve.map(([v0, v1, v2, v3], index) => (
    <cubicBezierCurve3 key={index} v0={v0} v1={v1} v2={v2} v3={v3} />
  ));
}
