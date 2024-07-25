"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { goals, states } from "@/lib/types";

const GOALNUM = 8;

let schema = z.object({});
let defaultValues: Record<string, number> = {};
for (let i = 1; i <= GOALNUM; i++) {
  schema = schema.extend({
    [`goal${i}`]: z.number().min(1).max(7),
  });
  defaultValues[`goal${i}`] = 1;
}

const FormSchema = schema;

export function QFormProgress({
  setGameState,
  setGoals,
  goals,
}: {
  setGameState: Dispatch<SetStateAction<states>>;
  setGoals: Dispatch<SetStateAction<goals>>;
  goals: goals;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setGameState(states.choose);
    setGoals(
      Array.from({ length: GOALNUM }, (_, i) => i + 1).map((i) => ({
        goal: goals[i - 1].goal,
        weight: 0,
        progress: data[`goal${i}` as keyof typeof data],
      }))
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {Array.from({ length: GOALNUM }, (_, i) => i + 1).map((i) => (
          <FormField
            control={form.control}
            key={i}
            name={`goal${i}` as never}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`Q${i} : ${goals[i - 1].goal}`}</FormLabel>
                <FormControl>
                  <Input
                    min={1}
                    max={7}
                    {...field}
                    type="number"
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
