import { STORE } from "@/data/products";

/** Monday = 0 … Sunday = 6, computed in Belgrade time. */
export function belgradeNow() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Belgrade",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const wd = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const map: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  return { day: map[wd] ?? 0, time: hour + minute / 60 };
}

export function isOpenNow() {
  const { day, time } = belgradeNow();
  const h = STORE.hours[day];
  return !!h && time >= h[0] && time < h[1];
}
