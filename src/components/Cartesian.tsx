"use client";
import { goals, goal } from "@/app/page";
import React from "react";

export type point = {
  x: number;
  y: number;
};

export const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";

const Cartesian = ({
  width = 400,
  height = 400,
  goals,
}: {
  width: number;
  height: number;
  goals: goals;
}) => {
  const padding = 40;
  const xAxis = height - padding;
  const yAxis = padding;

  // Calculate scale factors
  const xScale = (width - 2 * padding) / 8;
  const yScale = (height - 2 * padding) / 8;

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
        Progress
      </text>
      {/*seven equal points */}
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <g key={i}>
          <line
            x1={yAxis - 5}
            y1={xAxis - i * yScale}
            x2={yAxis + 5}
            y2={xAxis - i * yScale}
            stroke="black"
          />
          <text x={yAxis - 20} y={xAxis - i * yScale + 5} textAnchor="middle">
            {i}
          </text>
        </g>
      ))}
      {/* Y-axis */}
      <line x1={yAxis} y1={padding + 20} x2={yAxis} y2={xAxis} stroke="black" />
      <text x={yAxis} y={padding} textAnchor="middle">
        Weight
      </text>
      {/*seven equal points */}
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <g key={i}>
          <line
            x1={yAxis + i * xScale}
            y1={xAxis - 5}
            x2={yAxis + i * xScale}
            y2={xAxis + 5}
            stroke="black"
          />
          <text x={yAxis + i * xScale} y={xAxis + 20} textAnchor="middle">
            {i}
          </text>
        </g>
      ))}
      {/*horizontal line at 3.5 */}

      <line
        x1={yAxis}
        y1={xAxis - 3.5 * yScale}
        x2={width - padding}
        y2={xAxis - 3.5 * yScale}
        stroke="black"
        strokeDasharray="1"
      />
      {/*vertical line at 3.5 */}
      <line
        x1={yAxis + 3.5 * xScale}
        y1={padding + 20}
        x2={yAxis + 3.5 * xScale}
        y2={xAxis}
        stroke="black"
        strokeDasharray="1"
      />
      {/* write text to top left quadrant */}
      <text
        x={yAxis + (3.5 / 2) * xScale}
        y={xAxis - 7 * yScale}
        textAnchor="middle"
        opacity={0.7}
      >
        Real
      </text>
      <text
        x={yAxis + (3.5 / 2) * xScale}
        y={xAxis - 0.5 * yScale}
        textAnchor="middle"
        opacity={0.7}
      >
        Not Actual
      </text>
      <text
        x={yAxis + 3.7 * 1.5 * xScale}
        y={xAxis - 7 * yScale}
        textAnchor="middle"
        opacity={0.7}
      >
        Energizing
      </text>

      <text
        x={yAxis + 3.9 * 1.5 * xScale}
        y={xAxis - 0.5 * yScale}
        textAnchor="middle"
        opacity={0.7}
      >
        Energy Vampire
      </text>
      {/* Origin */}
      <text x={yAxis - 10} y={xAxis + 20} textAnchor="middle">
        0
      </text>

      {/* Plot points */}
      <GoalPoints
        goals={goals}
        yAxis={yAxis}
        xAxis={xAxis}
        xScale={xScale}
        yScale={yScale}
      />
    </svg>
  );
};

function GoalPoints({
  goals,
  yAxis,
  xAxis,
  xScale,
  yScale,
}: {
  goals: goals;
  yAxis: number;
  xAxis: number;
  xScale: number;
  yScale: number;
}) {
  const transformPoint = (goal: goal) => ({
    x: yAxis + goal.progress * xScale,
    y: xAxis - goal.weight * yScale,
  });

  //todo apply logic if points are the same.
  const sameGoalPosition = ({ goal, _goal }: { goal: goal; _goal: goal }) => {
    if (goal.weight === _goal.weight && goal.progress === _goal.progress) {
      return true;
    }
    return false;
  };
  const duplicatedGoals = (goals: goals) => {
    for (let i = 0; i < goals.length; i++) {
      for (let j = i + 1; j < goals.length; j++) {
        if (sameGoalPosition({ goal: goals[i], _goal: goals[j] })) {
          return true;
        }
      }
    }
  };

  return goals.map((goal, index) => {
    const { x, y } = transformPoint(goal);
    return (
      <g key={index}>
        <circle cx={x} cy={y} r="4" fill="red" />
        <text
          x={x + 5}
          y={y - 5}
          fontSize="12"
        >{`(${lowerAlphabet[index]})`}</text>
      </g>
    );
  });
}
export default Cartesian;
