import { Position } from '@xyflow/react';

// This is directly lifted from the library - it is used to calculate
// the control points for the bezier curve, which can be converted to
// catmull-rom control points and used to create an editable bezier curve

function calculateControlOffset(distance, curvature) {
  if (distance >= 0) {
    return 0.5 * distance;
  }

  return curvature * 25 * Math.sqrt(-distance);
}

export function getControlWithCurvature(
  pos,
  x1,
  y1,
  x2,
  y2,
  c
) {
  switch (pos) {
    case Position.Left:
      return [x1 - calculateControlOffset(x1 - x2, c), y1];
    case Position.Right:
      return [x1 + calculateControlOffset(x2 - x1, c), y1];
    case Position.Top:
      return [x1, y1 - calculateControlOffset(y1 - y2, c)];
    case Position.Bottom:
      return [x1, y1 + calculateControlOffset(y2 - y1, c)];
  }
}
