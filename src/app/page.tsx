"use client";

import { QForm } from "@/components/QForm";
import { QFormProgress } from "@/components/QFormProgress";
import { Choose } from "@/components/Choose";
import { useState } from "react";
import Cartesian, { point } from "@/components/Cartesian";

import { goals, states, goal } from "@/lib/types";
const GOALNUM = 8;

export default function Home() {
  const [gameState, setGameState] = useState<states>(states.end);

  const [goals, setGoals] = useState<goals>([]);

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

          <Cartesian goals={goals} width={400} height={400} />
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
