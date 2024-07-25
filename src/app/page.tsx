"use client";

import { QForm } from "@/components/QForm";
import { QFormProgress } from "@/components/QFormProgress";
import { Choose } from "@/components/Choose";
import { useState } from "react";
import { Bubble } from "react-chartjs-2";

export type goal = {
  goal: string;
  weight: number;
  progress: number;
};

export type goals = goal[];

export enum states {
  start = "start",
  playing = "playing",
  choose = "choose",
  end = "end",
}

const dummyGoals: goals = [
  {
    goal: "knlkn",
    weight: 0,
    progress: 0,
  },
  {
    goal: "lknlk",
    weight: 0,
    progress: 0,
  },
  {
    goal: "nlknl",
    weight: 0,
    progress: 0,
  },
  {
    goal: "knlkn",
    weight: 0,
    progress: 0,
  },
  {
    goal: "lknlknlk",
    weight: 0,
    progress: 0,
  },
  {
    goal: "nlknlk",
    weight: 0,
    progress: 0,
  },
  {
    goal: "nlnklkn",
    weight: 0,
    progress: 0,
  },
  {
    goal: "asdasd",
    weight: 0,
    progress: 0,
  },
];

export const GOALNUM = 8;

export default function Home() {
  const [gameState, setGameState] = useState<states>(states.end);

  const [goals, setGoals] = useState<goals>(dummyGoals);
  const data = {
    datasets: [
      {
        label: "Demo Dataset",
        data: [
          { x: 2, y: 3, count: 5 },
          { x: 3, y: 4, count: 5 },
          { x: 3, y: 4, count: 5 },
          { x: 3, y: 4, count: 5 },
          { x: 3, y: 4, count: 5 },
          { x: 3, y: 4, count: 5 },
          { x: 3, y: 4, count: 5 },
          { x: 3, y: 4, count: 5 },
          { x: 3, y: 4, count: 5 },
          { x: 3, y: 4, count: 5 },
        ],
      },
    ],
  };
  const getColor = (context: {
    dataset: { data: { [x: string]: any } };
    dataIndex: string | number;
  }) => {
    const value = context.dataset.data[context.dataIndex];
    if (value.count < 5) {
      return "#eaa7ae";
    } else if (value.count < 10) {
      return "#f18d97";
    } else if (value.count < 20) {
      return "#f15b6c";
    } else if (value.count < 30) {
      return "#f0374d";
    } else if (value.count >= 30) {
      return "red";
    }

    return "white";
  };

  const annotationPadding = 0.05;

  const getRadius = (context: {
    dataset: { data: { [x: string]: any } };
    dataIndex: string | number;
  }) => {
    const value = context.dataset.data[context.dataIndex];
    return value.count + 10;
  };
  const options = {
    elements: {
      bubble: {
        label: "xxx",
      },
      point: {
        backgroundColor: "white",
        radius: getRadius.bind(null),
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const item =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return `(${tooltipItem.xLabel}, ${tooltipItem.yLabel}): ${item.count}`;
        },
      },
    },
    annotation: {
      annotations: [
        {
          type: "box",
          drawTime: "beforeDatasetsDraw",
          xScaleID: "x-axis-0",
          yScaleID: "y-axis-0",
          xMin: 0 + annotationPadding,
          xMax: 7 - annotationPadding,
          yMin: 0 + annotationPadding,
          yMax: 7 - annotationPadding,
          borderWidth: 2,
          backgroundColor: "rgba(255, 99, 132, 0.25)",
        },
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: 4.5,
          xScaleID: "x-axis-0",
          yScaleID: "y-axis-0",
          xMin: 0 + annotationPadding,
          yMin: 0 + annotationPadding,
          borderColor: "transparent",
          backgroundColor: "transparent",
          label: {
            backgroundColor: "transparent",
            fontFamily: "sans-serif",
            fontSize: 12,
            fontStyle: "bold",
            fontColor: "red",
            xPadding: 12,
            yPadding: 6,
            cornerRadius: 4,
            position: "center",
            yAdjust: -100,
            enabled: true,
            content: "Test Label",
          },
        },
      ],
    },
  };
  return (
    <div className=" mt-12  flex justify-center items-center m-auto ">
      {gameState === states.start && (
        <QForm setGameState={setGameState} setGoals={setGoals} />
      )}
      {gameState === states.playing && (
        <div className="">
          {gameState === states.playing && (
            <>
              <QFormProgress
                setGameState={setGameState}
                setGoals={setGoals}
                goals={goals}
              />
            </>
          )}
        </div>
      )}
      {gameState === states.choose && (
        <Choose setGameState={setGameState} setGoals={setGoals} goals={goals} />
      )}
      {gameState === states.end && (
        <div className="flex flex-col items-center">
          <h1>Results</h1>
          <div>
            {goals.map((goal, i) => (
              <Goal
                key={i}
                goal={goal.goal}
                weight={goal.weight}
                progress={goal.progress}
              />
            ))}
          </div>

          <Bubble data={data} options={options} />
        </div>
      )}
    </div>
  );
}

function Goal({ goal, weight, progress }: goal) {
  return (
    <div className="flex justify-between">
      <div>{goal}</div>
      <div>{weight}</div>
      <div>{progress}</div>
    </div>
  );
}
