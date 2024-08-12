/**
 * Second to string timespan (d:HH:mm:ss)
 * @param p Time in seconds
 * @returns String denoting timespan
 */
export function secondToTimespan(p: number): string {
  let s = p
  let d = Math.trunc(s / (3600 * 24));

  s %= (3600 * 24);
  let h = Math.trunc(s / 3600).toString().padStart(2, "0");

  s %= 3600
  let m = Math.trunc(s / 60).toString().padStart(2, "0");

  s %= 60;
  let ns = s.toString().padStart(2, "0")
  if (d > 0) return `${d}:${h}:${m}:${ns}`;
  else return `${h}:${m}:${ns}`;
}