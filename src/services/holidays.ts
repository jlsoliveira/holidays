import type { Holiday } from "@/types/holiday";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API;
const BASE_API_VERSION = process.env.NEXT_PUBLIC_BASE_API_VERSION;

const holidaysCache = new Map<number, Holiday[]>();

export function seedHolidaysCache(year: number, holidays: Holiday[]) {
  holidaysCache.set(year, holidays);
}

export function clearHolidaysCache() {
  holidaysCache.clear();
}

export async function getHolidays(year?: number): Promise<Holiday[]> {
  const targetYear = year ?? new Date().getFullYear();

  const cached = holidaysCache.get(targetYear);
  if (cached) {
    return cached;
  }

  if (!BASE_API_URL) {
    throw new Error("Missing NEXT_PUBLIC_BASE_API environment variable");
  }
  if (!BASE_API_VERSION) {
    throw new Error("Missing NEXT_PUBLIC_BASE_API_VERSION environment variable");
  }

  const res = await fetch(`${BASE_API_URL}/feriados/${BASE_API_VERSION}/${targetYear}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Error searching for holidays (${res.status} ${res.statusText})`);
  }

  const data = (await res.json()) as unknown;

  if (!Array.isArray(data)) {
    throw new Error("Unexpected response from Holiday API.");
  }

  holidaysCache.set(targetYear, data);

  return data;
}
