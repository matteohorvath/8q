"use client";

import { QForm } from "@/components/QForm";
import { QFormProgress } from "@/components/QFormProgress";
import { Choose } from "@/components/Choose";
import { useState } from "react";
import Cartesian, { lowerAlphabet, point } from "@/components/Cartesian";

import { goals, states, goal } from "@/lib/types";
import Goal from "@/components/Goal";
import { dummyGoals } from "@/lib/dummyData";
const GOALNUM = 8;

const DEBUG = false;

export default function Home() {
  const [gameState, setGameState] = useState<states>(states.start);

  const [goals, setGoals] = useState<goals>(DEBUG ? dummyGoals : []);

  function addWeight(goal: goal) {
    setGoals(
      goals.map((g) => {
        if (g.goal === goal.goal && g.progress === goal.progress) {
          return { ...g, weight: g.weight + 1 };
        }
        return g;
      })
    );
  }

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
        <Choose
          setGameState={setGameState}
          addWeight={addWeight}
          goals={goals}
        />
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
                label={lowerAlphabet[i]}
              />
            ))}
          </div>

          <Cartesian goals={goals} width={400} height={400} />
        </div>
      )}
    </div>
  );
}
