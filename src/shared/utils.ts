import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";

// This is for shad-ci ui https://ui.shadcn.com/docs/installation/manual#add-a-cn-helper
export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export async function zodFetch<T extends z.AnyZodObject>(
  schema: T,
  input: RequestInfo,
  init?: RequestInit,
): Promise<z.infer<T>> {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return schema.parse(await res.json());
}
