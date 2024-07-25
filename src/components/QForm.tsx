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
export function QForm({
  setGameState,
  setGoals,
}: {
  setGameState: Dispatch<SetStateAction<states>>;
  setGoals: Dispatch<SetStateAction<goals>>;
}) {
  let schema = z.object({});
  let defaultValues: Record<string, string> = {};
  type defaultValuesType = typeof defaultValues;
  for (let i = 1; i <= GOALNUM; i++) {
    schema = schema.extend({
      [`goal${i}`]: z.string().min(1).max(100),
    });
    defaultValues[`goal${i}`] = ``;
  }

  const FormSchema = schema;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setGameState(states.playing);
    setGoals(
      Array.from({ length: GOALNUM }, (_, i) => i + 1).map((i) => ({
        goal: data[`goal${i}` as keyof typeof data],
        weight: 0,
        progress: 0,
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
            name={`goal${i}` as never} // Update the type of the name prop to match the expected type
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`Goal ${i}`}</FormLabel>
                <FormControl>
                  <Input placeholder={`goal${i}`} {...field} />
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
