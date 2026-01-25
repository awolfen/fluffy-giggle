import { PositionsTable } from "@/pages/CarbonPortfolio/components/PositionsTable";
import {
  PortfolioSummaryStatusFilterValue,
  StatusFilter,
} from "@/pages/CarbonPortfolio/components/StatusFilter";
import { useState } from "react";
import { PortfolioSummaryTable } from "./components/PortfolioSummaryTable";

const CarbonPortfolioPage = () => {
  const [statusFilter, setStatusFilter] =
    useState<PortfolioSummaryStatusFilterValue>("both");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Carbon Portfolio</h1>
          <p className="text-muted-foreground">
            Manage and track your carbon credit positions
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Portfolio Summary</h2>
              <StatusFilter value={statusFilter} onChange={setStatusFilter} />
            </div>
            <PortfolioSummaryTable
              status={statusFilter === "both" ? undefined : statusFilter}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Positions</h2>
            <PositionsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonPortfolioPage;
