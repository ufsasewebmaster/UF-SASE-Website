import type { SuccessResponse } from "@schema/responseSchema";
import { errorResponseSchema, successResponseSchema } from "@schema/responseSchema";
import { clsx, type ClassValue } from "clsx";
import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import { twMerge } from "tailwind-merge";
import type { ZodTypeAny } from "zod";

// This is for shad-ci ui https://ui.shadcn.com/docs/installation/manual#add-a-cn-helper
export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export const createSuccessResponse = <T>(c: Context, result: T, message: string = "Success", meta: Record<string, unknown> = {}) => {
  return c.json({ data: result, message, meta });
};

export const createErrorResponse = (c: Context, errCode: string, errMsg: string, statusCode: StatusCode = 500) =>
  c.json({ error: { errCode, errMsg } }, statusCode);

export const apiFetch = async (url: string, options: RequestInit = {}, dataSuccessSchema: ZodTypeAny): Promise<SuccessResponse> => {
  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    const parsedError = errorResponseSchema.safeParse(json);
    if (parsedError.success) {
      const { errCode, errMsg } = parsedError.data.error;
      throw new Error(`[${errCode}] ${errMsg}`);
    }
    throw new Error("An unknown error occurred");
  }
  const fullSchema = successResponseSchema.extend({ data: dataSuccessSchema });
  return fullSchema.parse(json);
};
