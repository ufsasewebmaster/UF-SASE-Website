import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// This is for shad-ci ui https://ui.shadcn.com/docs/installation/manual#add-a-cn-helper
export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}
