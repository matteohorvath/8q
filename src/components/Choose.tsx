"use client";

import { GOALNUM, goals, states, goal } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Goal from "@/components/Goal";

export function Choose({
  setGameState,
  addWeight,
  goals,
}: {
  setGameState: Dispatch<SetStateAction<states>>;
  addWeight: (goal: goal) => void;

  goals: goals;
}) {
  const [pairs, setPairs] = useState<goal[][]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reverse, setReverse] = useState(false);
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
    const _newPairs = _pairsIndex.map((i) => _pairs[i]);

    setPairs(_newPairs);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //50 50 chance to reverse the order of the pairs
    if (Math.random() > 0.5) {
      setReverse(true);
    } else {
      setReverse(false);
    }
  }, [index]);

  function addPoint(goal: goal) {
    addWeight(goal);
    if (index === pairs.length - 1) {
      setGameState(states.end);

      return;
    }
    setIndex(index + 1);
  }
  return loading ? (
    ""
  ) : (
    <div className="flex flex-col">
      Choose one
      {reverse ? (
        <Button onClick={() => addPoint(pairs[index][0])}>
          {pairs[index][0].goal}
        </Button>
      ) : (
        ""
      )}
      <Button onClick={() => addPoint(pairs[index][1])}>
        {pairs[index][1].goal}
      </Button>
      {reverse ? (
        ""
      ) : (
        <Button onClick={() => addPoint(pairs[index][0])}>
          {pairs[index][0].goal}
        </Button>
      )}
    </div>
  );
}
