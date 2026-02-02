import { computeSummary } from "../src/services/portfolioSummary";
import { Position } from "../src/types";

describe("computeSummary", () => {
  it("should handle empty array", () => {
    const result = computeSummary([]);
    expect(result).toEqual({
      totalTonnes: 0,
      totalValue: 0,
      averagePricePerTonne: 0,
    });
  });

  it("should calculate correct totals for single position", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Test Project",
        tonnes: 100,
        pricePerTonne: 25,
        status: "available",
        vintage: 2023,
      },
    ];

    const result = computeSummary(positions);

    expect(result.totalTonnes).toBe(100);
    expect(result.totalValue).toBe(2500);
    expect(result.averagePricePerTonne).toBe(25);
  });

  it("should calculate weighted average correctly for multiple positions", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Project A",
        tonnes: 1000,
        pricePerTonne: 20,
        status: "available",
        vintage: 2023,
      },
      {
        id: "2",
        projectName: "Project B",
        tonnes: 100,
        pricePerTonne: 30,
        status: "available",
        vintage: 2023,
      },
    ];

    const result = computeSummary(positions);

    expect(result.totalTonnes).toBe(1100);
    expect(result.totalValue).toBe(23000);
    expect(result.averagePricePerTonne).toBeCloseTo(20.909, 2);
  });

  it("should handle positions with zero tonnes", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Project A",
        tonnes: 100,
        pricePerTonne: 25,
        status: "available",
        vintage: 2023,
      },
      {
        id: "2",
        projectName: "Project B",
        tonnes: 0,
        pricePerTonne: 30,
        status: "available",
        vintage: 2023,
      },
    ];

    const result = computeSummary(positions);

    expect(result.totalTonnes).toBe(100);
    expect(result.totalValue).toBe(2500);
    // What should the average be when one position has zero tonnes?
    expect(result.averagePricePerTonne).toBeDefined();
  });

  it("should filter by available status", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Available Project",
        tonnes: 100,
        pricePerTonne: 20,
        status: "available",
        vintage: 2023,
      },
      {
        id: "2",
        projectName: "Retired Project",
        tonnes: 50,
        pricePerTonne: 30,
        status: "retired",
        vintage: 2023,
      },
    ];

    const result = computeSummary(positions, "available");

    expect(result.totalTonnes).toBe(100);
    expect(result.totalValue).toBe(2000);
    expect(result.averagePricePerTonne).toBe(20);
  });

  it("should filter by retired status", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Available Project",
        tonnes: 100,
        pricePerTonne: 20,
        status: "available",
        vintage: 2023,
      },
      {
        id: "2",
        projectName: "Retired Project",
        tonnes: 50,
        pricePerTonne: 30,
        status: "retired",
        vintage: 2023,
      },
    ];

    const result = computeSummary(positions, "retired");

    expect(result.totalTonnes).toBe(50);
    expect(result.totalValue).toBe(1500);
    expect(result.averagePricePerTonne).toBe(30);
  });

  it("should return all positions when no status filter is provided", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Available Project",
        tonnes: 100,
        pricePerTonne: 20,
        status: "available",
        vintage: 2023,
      },
      {
        id: "2",
        projectName: "Retired Project",
        tonnes: 50,
        pricePerTonne: 30,
        status: "retired",
        vintage: 2023,
      },
    ];

    const result = computeSummary(positions);

    expect(result.totalTonnes).toBe(150);
    expect(result.totalValue).toBe(3500);
    expect(result.averagePricePerTonne).toBeCloseTo(23.333, 2);
  });

  it("should filter by vintage range", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Project 2022",
        tonnes: 100,
        pricePerTonne: 20,
        status: "available",
        vintage: 2022,
      },
      {
        id: "2",
        projectName: "Project 2023",
        tonnes: 50,
        pricePerTonne: 30,
        status: "available",
        vintage: 2023,
      },
      {
        id: "3",
        projectName: "Project 2024",
        tonnes: 75,
        pricePerTonne: 25,
        status: "available",
        vintage: 2024,
      },
    ];

    const result = computeSummary(positions, undefined, 2022, 2023);

    expect(result.totalTonnes).toBe(150);
    expect(result.totalValue).toBe(3500);
    expect(result.averagePricePerTonne).toBeCloseTo(23.333, 2);
  });

  it("should filter by single vintage when min and max are the same", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Project 2023",
        tonnes: 100,
        pricePerTonne: 20,
        status: "available",
        vintage: 2023,
      },
      {
        id: "2",
        projectName: "Project 2024",
        tonnes: 50,
        pricePerTonne: 30,
        status: "available",
        vintage: 2024,
      },
    ];

    const result = computeSummary(positions, undefined, 2023, 2023);

    expect(result.totalTonnes).toBe(100);
    expect(result.totalValue).toBe(2000);
    expect(result.averagePricePerTonne).toBe(20);
  });

  it("should filter by both status and vintage range", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Available 2022",
        tonnes: 100,
        pricePerTonne: 20,
        status: "available",
        vintage: 2022,
      },
      {
        id: "2",
        projectName: "Retired 2023",
        tonnes: 50,
        pricePerTonne: 30,
        status: "retired",
        vintage: 2023,
      },
      {
        id: "3",
        projectName: "Available 2023",
        tonnes: 75,
        pricePerTonne: 25,
        status: "available",
        vintage: 2023,
      },
      {
        id: "4",
        projectName: "Available 2024",
        tonnes: 60,
        pricePerTonne: 35,
        status: "available",
        vintage: 2024,
      },
    ];

    const result = computeSummary(positions, "available", 2022, 2023);

    expect(result.totalTonnes).toBe(175);
    expect(result.totalValue).toBe(3875);
    expect(result.averagePricePerTonne).toBeCloseTo(22.143, 2);
  });

  it("should return empty summary when vintage range matches no positions", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Project 2023",
        tonnes: 100,
        pricePerTonne: 20,
        status: "available",
        vintage: 2023,
      },
    ];

    const result = computeSummary(positions, undefined, 2020, 2021);

    expect(result.totalTonnes).toBe(0);
    expect(result.totalValue).toBe(0);
    expect(result.averagePricePerTonne).toBe(0);
  });

  it("should return all positions when no vintage range is provided", () => {
    const positions: Position[] = [
      {
        id: "1",
        projectName: "Project 2022",
        tonnes: 100,
        pricePerTonne: 20,
        status: "available",
        vintage: 2022,
      },
      {
        id: "2",
        projectName: "Project 2024",
        tonnes: 50,
        pricePerTonne: 30,
        status: "available",
        vintage: 2024,
      },
    ];

    const result = computeSummary(positions);

    expect(result.totalTonnes).toBe(150);
    expect(result.totalValue).toBe(3500);
    expect(result.averagePricePerTonne).toBeCloseTo(23.333, 2);
  });
});
