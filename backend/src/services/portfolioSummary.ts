import { PortfolioSummary, Position, PositionStatus } from "../types";

/**
 * Computes a summary of the given positions.
 * @param positions - Array of positions to summarize
 * @param status - Optional status filter: "available", "retired", or undefined for both
 * @param vintage - Optional vintage filter: year number or undefined for all
 */
export function computeSummary(
  positions: Position[],
  status?: PositionStatus,
  minVintage?: number,
  maxVintage?: number,
): PortfolioSummary {
  // Filter positions by status and vintage if provided
  let filteredPositions = positions;
  if (status) {
    filteredPositions = filteredPositions.filter(
      (pos) => pos.status === status,
    );
  }
  if (minVintage !== undefined && maxVintage !== undefined) {
    filteredPositions = filteredPositions.filter(
      (pos) => pos.vintage >= minVintage && pos.vintage <= maxVintage,
    );
  }

  if (filteredPositions.length === 0) {
    return {
      totalTonnes: 0,
      totalValue: 0,
      averagePricePerTonne: 0,
    };
  }

  const totalTonnes = filteredPositions.reduce(
    (sum, pos) => sum + pos.tonnes,
    0,
  );
  const totalValue = filteredPositions.reduce(
    (sum, pos) => sum + pos.tonnes * pos.pricePerTonne,
    0,
  );

  // positions.length -> totalTonnes to get weighted average
  // could handle 0 edge case here depending on data
  const averagePricePerTonne = totalTonnes > 0 ? totalValue / totalTonnes : 0;

  return {
    totalTonnes,
    totalValue,
    averagePricePerTonne,
  };
}
