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
// NOW: Accepts optional query parameter: ?status=available or ?status=retired
//
// IMPORTANT: The 2-second delay below is intentional and MUST NOT be removed.
// This simulates a slow API response. Your task is to handle this gracefully
// in the frontend - do not remove or reduce this delay.
app.get("/api/portfolio/summary", async (req, res) => {
  // Intentional 2-second delay - DO NOT REMOVE OR MODIFY
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const status = req.query.status as PositionStatus | undefined;

  // Validate status if provided
  if (status && status !== "available" && status !== "retired") {
    return res.status(400).json({
      error: "Invalid status. Must be 'available' or 'retired'",
    });
  }

  const summary = computeSummary(positions, status);
  res.json(summary);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
