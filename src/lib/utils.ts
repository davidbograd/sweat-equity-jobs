import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Company } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sorts companies alphabetically by name (a→z)
 * @param companies Array of companies to sort
 * @returns New array of companies sorted alphabetically by name
 */
export function sortCompaniesByName(companies: Company[]): Company[] {
  return [...companies].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
}
