import type { z } from "zod";

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
