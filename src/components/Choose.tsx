"use client";

import { GOALNUM, goals, states, goal } from "@/app/page";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";

export function Choose({
  setGameState,
  setGoals,
  goals,
}: {
  setGameState: Dispatch<SetStateAction<states>>;
  setGoals: Dispatch<SetStateAction<goals>>;
  goals: goals;
}) {
  const [pairs, setPairs] = useState<goal[][]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  //shuffle array of pairs

  useEffect(() => {
    let _pairs: goal[][] = [];
    let _pairsIndex = [];
    //instead of organizing the bigger array, I create a separate array with the indexes, random it, and  reorganize the original array. Dunno if its efficient.
    for (let i = 0; i < GOALNUM; i++) {
      for (let j = i + 1; j < GOALNUM; j++) {
        if (i !== j) {
          _pairs.push([goals[i], goals[j]]);
          _pairsIndex.push(_pairs.length - 1);
        }
      }
    }
    _pairsIndex = _pairsIndex.sort(() => Math.random() - 0.5);
    _pairs = _pairsIndex.map((i) => _pairs[i]);
    setPairs(_pairs);
    setLoading(false);
  }, [goals]);

  function addPoint(goal: goal) {
    setGoals(
      goals.map((g) => {
        if (g === goal) {
          return { ...g, weight: g.weight + 1 };
        }
        return g;
      })
    );
    if (index === pairs.length - 1) {
      setGameState(states.end);

      return;
    }
    setIndex(index + 1);
  }
  return loading ? (
    ""
  ) : (
    <div className="">
      Choose one
      <Button onClick={() => addPoint(pairs[index][0])}>
        {pairs[index][0].goal}
      </Button>
      <Button onClick={() => addPoint(pairs[index][1])}>
        {pairs[index][1].goal}
      </Button>
    </div>
  );
}
