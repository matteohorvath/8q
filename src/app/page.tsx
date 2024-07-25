"use client";

import { QForm } from "@/components/QForm";
import { QFormProgress } from "@/components/QFormProgress";
import { Choose } from "@/components/Choose";
import { useState } from "react";
import Cartesian, { point } from "@/components/Cartesian";

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

const samplePoints: point[] = [
  { x: 2, y: 3 },
  { x: -1, y: 4 },
  { x: 5, y: 2 },
  { x: 3, y: 3 },
];

export const GOALNUM = 8;

export default function Home() {
  const [gameState, setGameState] = useState<states>(states.end);

  const [goals, setGoals] = useState<goals>(dummyGoals);

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

          <Cartesian points={samplePoints} width={400} height={400} />
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
