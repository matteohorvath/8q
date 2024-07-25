import React from "react";

export type point = {
  x: number;
  y: number;
};

const Cartesian = ({
  width = 400,
  height = 400,
  points,
}: {
  width: number;
  height: number;
  points: point[];
}) => {
  const padding = 40;
  const xAxis = height - padding;
  const yAxis = padding;

  // Calculate scale factors
  const xScale = (width - 2 * padding) / 10;
  const yScale = (height - 2 * padding) / 10;

  const transformPoint = (point: point) => ({
    x: yAxis + point.x * xScale,
    y: xAxis - point.y * yScale,
  });

  return (
    <svg width={width} height={height}>
      {/* X-axis */}
      <line
        x1={yAxis}
        y1={xAxis}
        x2={width - padding}
        y2={xAxis}
        stroke="black"
      />
      <text x={width - padding} y={xAxis + 20} textAnchor="middle">
        X
      </text>

      {/* Y-axis */}
      <line x1={yAxis} y1={padding} x2={yAxis} y2={xAxis} stroke="black" />
      <text x={yAxis - 20} y={padding} textAnchor="middle">
        Y
      </text>

      {/* Origin */}
      <text x={yAxis - 10} y={xAxis + 20} textAnchor="middle">
        O
      </text>

      {/* Plot points */}
      {points.map((point, index) => {
        const { x, y } = transformPoint(point);
        return (
          <g key={index}>
            <circle cx={x} cy={y} r="4" fill="red" />
            <text
              x={x + 5}
              y={y - 5}
              fontSize="12"
            >{`(${point.x}, ${point.y})`}</text>
          </g>
        );
      })}
    </svg>
  );
};

export default Cartesian;
