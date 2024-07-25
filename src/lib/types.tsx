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
export const GOALNUM = 8;
