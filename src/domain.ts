export type Plan = "Everyday" | "Plus";
export type Finish = "fern" | "ink" | "citron";
export const GOALS = [
  {
    id: "somewhere",
    name: "Somewhere new",
    target: 20000,
    note: "The trip you keep talking about.",
  },
  { id: "breathing", name: "Breathing room", target: 45000, note: "A little more peace of mind." },
  {
    id: "next",
    name: "Your next chapter",
    target: 100000,
    note: "Make a start on something bigger.",
  },
] as const;

export function projectSavings(start: number, monthly: number, target: number) {
  if (
    ![start, monthly, target].every(Number.isSafeInteger) ||
    start < 0 ||
    monthly < 0 ||
    target <= 0
  ) {
    throw new RangeError("Use non-negative whole rand amounts and a positive goal.");
  }
  const total = start + monthly * 12;
  if (!Number.isSafeInteger(total)) throw new RangeError("Amount is too large.");
  return {
    total,
    months: start >= target ? 0 : monthly === 0 ? null : Math.ceil((target - start) / monthly),
    progress: Math.min(1, total / target),
    points: Array.from({ length: 13 }, (_, month) => start + monthly * month),
  };
}

export function money(value: number) {
  return `R ${Math.round(value).toLocaleString("en-ZA")}`;
}

export function planCost(plan: Plan) {
  return plan === "Plus" ? 89 : 0;
}
