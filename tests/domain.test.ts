import { describe, expect, test } from "bun:test";
import { planCost, projectSavings } from "../src/domain";

describe("contribution-only savings", () => {
  test("includes initial deposit and exactly twelve monthly contributions", () => {
    const result = projectSavings(5000, 1500, 20000);
    expect(result.total).toBe(23000);
    expect(result.months).toBe(10);
    expect(result.points).toHaveLength(13);
    expect(result.points[0]).toBe(5000);
    expect(result.points[12]).toBe(result.total);
  });
  test("zero contribution cannot reach an unmet goal", () => {
    expect(projectSavings(0, 0, 20000).months).toBeNull();
    expect(projectSavings(5000, 0, 20000).total).toBe(5000);
  });
  test("already-funded goal takes no further months", () => {
    expect(projectSavings(20000, 0, 20000).months).toBe(0);
    expect(projectSavings(25000, 1000, 20000).progress).toBe(1);
  });
  test("rounds a partial final contribution up to the next month", () => {
    expect(projectSavings(0, 1500, 20000).months).toBe(14);
  });
  test("invalid inputs cannot fabricate totals", () => {
    for (const bad of [-1, NaN, Infinity, 1.5])
      expect(() => projectSavings(bad, 1000, 20000)).toThrow();
    expect(() => projectSavings(0, -1, 20000)).toThrow();
    expect(() => projectSavings(0, 0, 0)).toThrow();
    expect(() => projectSavings(Number.MAX_SAFE_INTEGER, 1, 1000)).toThrow();
  });
  test("plan preview has one consistent monthly cost", () => {
    expect(planCost("Everyday")).toBe(0);
    expect(planCost("Plus")).toBe(89);
  });
});
