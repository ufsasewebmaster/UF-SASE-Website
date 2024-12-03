import type { successResponseSchema } from "@schema/responseSchema";
import { errorResponseSchema } from "@schema/responseSchema";
import { clsx, type ClassValue } from "clsx";
import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { twMerge } from "tailwind-merge";
import type { z, ZodTypeAny } from "zod";

// This is for shad-ci ui https://ui.shadcn.com/docs/installation/manual#add-a-cn-helper
export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export async function zodFetch<T extends z.AnyZodObject>(schema: T, input: RequestInfo, init?: RequestInit): Promise<z.infer<T>> {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return schema.parse(await res.json());
}

export const formatAndValidateResponse = <Schema extends typeof successResponseSchema>(
  result: z.infer<Schema>["data"],
  message: string,
  schema: Schema,
  meta: Record<string, never> = {},
) => {
  const responsePayload = {
    data: result,
    message,
    meta,
  };
  return schema.parse(responsePayload);
};

export const createErrorResponse = (c: Context, errCode: string, errMsg: string, statusCode: StatusCode = 500) =>
  c.json({ error: { errCode, errMsg } }, statusCode);

export const apiFetch = async <T>(url: string, options: RequestInit = {}, successSchema: ZodTypeAny): Promise<T> => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    const parsedError = errorResponseSchema.safeParse(data);
    if (parsedError.success) {
      throw new Error(parsedError.data.error.errMsg);
    }
    throw new Error("An unknown error occurred");
  }

  return successSchema.parse(data).data;
};
