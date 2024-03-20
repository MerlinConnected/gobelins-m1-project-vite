import { useMemo } from 'react';

function getCurveCoordinates(data) {
  if (!data) return;

  const lines = useMemo(() => {
    const arr = [];

    for (let i = 0; i < data.length - 1; i++) {
      const startPoint = [data[i].px, data[i].py, data[i].pz];
      const midA = [data[i].hlx, data[i].hly, data[i].hlz];
      const midB = [data[i].hrx, data[i].hry, data[i].hrz];
      const endPoint = [data[i + 1].px, data[i + 1].py, data[i + 1].pz];

      arr.push([startPoint, midA, midB, endPoint]);
    }

    return arr;
  }, [data]);

  return lines;
}

export default getCurveCoordinates;
