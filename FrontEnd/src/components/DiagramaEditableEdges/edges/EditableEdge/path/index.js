import { Position } from '@xyflow/react';

import { getLinearPath, getLinearControlPoints } from './linear';
import { getCatmullRomPath, getCatmullRomControlPoints } from './catmull-rom';
import { Algorithm } from '../constants';

export function getControlPoints(
  points,
  algorithm = Algorithm.BezierCatmullRom,
  sides = { fromSide: Position.Left, toSide: Position.Right }
) {
  switch (algorithm) {
    case Algorithm.Linear:
      return getLinearControlPoints(points);

    case Algorithm.CatmullRom:
      return getCatmullRomControlPoints(points);

    case Algorithm.BezierCatmullRom:
      return getCatmullRomControlPoints(points, true, sides);
  }
}

export function getPath(
  points,
  algorithm = Algorithm.BezierCatmullRom,
  sides = { fromSide: Position.Left, toSide: Position.Right }
) {
  switch (algorithm) {
    case Algorithm.Linear:
      return getLinearPath(points);

    case Algorithm.CatmullRom:
      return getCatmullRomPath(points);

    case Algorithm.BezierCatmullRom:
      return getCatmullRomPath(points, true, sides);
  }
}
