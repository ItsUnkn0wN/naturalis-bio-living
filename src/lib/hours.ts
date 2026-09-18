import { STORE } from "@/data/products";

export type StoreStatus =
  | { kind: "open"; opensAt: number; closesAt: number }
  | { kind: "before-open"; opensAt: number; closesAt: number }
  | { kind: "closed" };

/** Monday = 0 … Sunday = 6, computed in the store's Europe/Belgrade timezone. */
export function belgradeNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Belgrade",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const days: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  return { day: days[weekday] ?? 0, time: hour + minute / 60 };
}

/** Derives the live status from the single STORE.hours source in Europe/Belgrade time. */
export function getStoreStatus(now = new Date()): StoreStatus {
  const { day, time } = belgradeNow(now);
  const hours = STORE.hours[day];

  if (!hours || time >= hours[1]) return { kind: "closed" };
  if (time < hours[0]) return { kind: "before-open", opensAt: hours[0], closesAt: hours[1] };
  return { kind: "open", opensAt: hours[0], closesAt: hours[1] };
}

export function isOpenNow(now = new Date()) {
  return getStoreStatus(now).kind === "open";
}
