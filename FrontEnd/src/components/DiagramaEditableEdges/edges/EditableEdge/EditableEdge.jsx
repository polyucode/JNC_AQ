import { useCallback, useRef } from 'react';
import {
  BaseEdge,
  BuiltInNode,
  useReactFlow,
  useStore,
} from '@xyflow/react';

import { ControlPoint } from './ControlPoint';
import { getPath, getControlPoints } from './path';
import { Algorithm, COLORS } from './constants';

const useIdsForInactiveControlPoints = (points) => {
  const prevIds = useRef([]);
  let newPoints = [];
  if (prevIds.current.length === points.length) {
    // reuse control points from last render, just update their position
    newPoints = points.map((point, i) =>
      point.active ? point : { ...point, id: prevIds.current[i] }
    );
  } else {
    // calculate new control points
    newPoints = points.map((prevPoint, i) => {
      const id = window.crypto.randomUUID();
      prevIds.current[i] = id;
      return prevPoint.active ? points[i] : { ...points[i], id };
    });
  }

  return newPoints;
};

export function EditableEdgeComponent({
  id,
  selected,
  source,
  sourceX,
  sourceY,
  sourcePosition,
  target,
  targetX,
  targetY,
  targetPosition,
  markerEnd,
  markerStart,
  style,
  data = { points: [] },

  ...delegated
}) {
  const sourceOrigin = { x: sourceX, y: sourceY };
  const targetOrigin = { x: targetX, y: targetY };

  const color = COLORS[data.algorithm ?? Algorithm.BezierCatmullRom];

  // const { setEdges } = useReactFlow();
  // const shouldShowPoints = useStore((store) => {
  //   const sourceNode = store.nodeLookup.get(source);
  //   const targetNode = store.nodeLookup.get(target);

  //   return selected || sourceNode.selected || targetNode.selected;
  // });

  // const setControlPoints = useCallback(
  //   (update) => {
  //     setEdges((edges) =>
  //       edges.map((e) => {
  //         if (e.id !== id) return e;
  //         if (!isEditableEdge(e)) return e;

  //         const points = e.data?.points ?? [];
  //         const data = { ...e.data, points: update(points) };

  //         return { ...e, data };
  //       })
  //     );
  //   },
  //   [id, setEdges]
  // );

  const pathPoints = [sourceOrigin, ...data.points, targetOrigin];
  const controlPoints = getControlPoints(pathPoints, data.algorithm, {
    fromSide: sourcePosition,
    toSide: targetPosition,
  });
  const path = getPath(pathPoints, data.algorithm, {
    fromSide: sourcePosition,
    toSide: targetPosition,
  });

  const controlPointsWithIds = useIdsForInactiveControlPoints(controlPoints);

  return (
    <>

      <BaseEdge
        id={id}
        path={path}
        {...delegated}
        markerStart={markerStart}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: color,
        }}
      />

      {/* {shouldShowPoints &&
        controlPointsWithIds.map((point, index) => (
          <ControlPoint
            key={point.id}
            index={index}
            setControlPoints={setControlPoints}
            color={color}
            {...point}
          />
        ))} */}
    </>
  );
}

const isEditableEdge = (edge) => edge.type === 'editable-edge';
