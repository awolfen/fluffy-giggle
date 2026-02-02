import cors from "cors";
import express from "express";
import { positions } from "./data/portfolio";
import { computeSummary } from "./services/portfolioSummary";
import { PositionStatus } from "./types";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// GET /api/portfolio - Returns full list of positions
app.get("/api/portfolio", (req, res) => {
  res.json(positions);
});

// GET /api/portfolio/summary - Returns portfolio summary
// NOW: Accepts optional query parameters: ?status=available or ?status=retired and ?vintage=2023
//
// IMPORTANT: The 2-second delay below is intentional and MUST NOT be removed.
// This simulates a slow API response. Your task is to handle this gracefully
// in the frontend - do not remove or reduce this delay.
app.get("/api/portfolio/summary", async (req, res) => {
  // Intentional 2-second delay - DO NOT REMOVE OR MODIFY
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const status = req.query.status as PositionStatus | undefined;
  const vintageParam = req.query.vintage as string | undefined;
  const vintage = vintageParam ? parseInt(vintageParam, 10) : undefined;

  // Validate status if provided
  if (status && status !== "available" && status !== "retired") {
    return res.status(400).json({
      error: "Invalid status. Must be 'available' or 'retired'",
    });
  }

  //Deconstruct vintage string into min and max year
  let minVintage: number | undefined;
  let maxVintage: number | undefined;
  if (vintageParam) {
    const [min, max] = vintageParam.split("-").map((v) => parseInt(v, 10));
    minVintage = min;
    maxVintage = max;
  }

  // Validate vintage if provided
  if (vintageParam && (isNaN(minVintage!) || isNaN(maxVintage!))) {
    return res.status(400).json({
      error: "Invalid vintage. Must be a year or range like '2022-2024'",
    });
  }

  const summary = computeSummary(positions, status, minVintage, maxVintage);
  res.json(summary);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
