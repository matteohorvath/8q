import { goal } from "@/lib/types";
export default function Goal({ goal, weight, progress }: goal) {
  return (
    <div className="flex justify-between">
      <div>{goal}</div>
      <div>{weight}</div>
      <div>{progress}</div>
    </div>
  );
}
