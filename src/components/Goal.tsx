import { goal } from "@/lib/types";
export default function Goal({
  goal,
  weight,
  progress,
  label,
}: {
  goal: string;
  weight: number;
  progress: number;
  label: string;
}) {
  return (
    <div className="flex justify-between">
      <div>({label})</div>
      <div>{goal}</div>
      <div>{weight}</div>
      <div>{progress}</div>
    </div>
  );
}
