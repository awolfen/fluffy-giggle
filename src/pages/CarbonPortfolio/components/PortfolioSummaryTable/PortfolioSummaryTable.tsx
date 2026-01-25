import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_BASE_URL } from "@/consts/api";
import { useToast } from "@/hooks/use-toast";
import { PortfolioSummary, PositionStatus } from "@/types/portfolio";
import { formatCurrency, formatNumber } from "@/utils/formatting";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface PortfolioSummaryTableProps {
  status?: PositionStatus;
}

const PortfolioSummaryTable = ({ status }: PortfolioSummaryTableProps) => {
  const { toast } = useToast();

  const {
    data: summary,
    isLoading: isLoadingSummary,
    error,
  } = useQuery<PortfolioSummary, Error>({
    queryKey: ["portfolioSummary", status],
    queryFn: async () => {
      let url = `${API_BASE_URL}/portfolio/summary`;
      if (status) {
        url += `?status=${status}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch portfolio summary");
      }
      return response.json();
    },
    staleTime: 30000,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const metrics = [
    {
      label: "Total Tonnes",
      value: summary?.totalTonnes ?? 0,
      formatter: formatNumber,
    },
    {
      label: "Total Value",
      value: summary?.totalValue ?? 0,
      formatter: formatCurrency,
    },
    {
      label: "Average Price per Tonne",
      value: summary?.averagePricePerTonne ?? 0,
      formatter: formatCurrency,
    },
  ];

  if (!summary && !isLoadingSummary) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No summary data available
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.label}>
              <TableCell className="font-medium">{metric.label}</TableCell>
              <TableCell className="text-right">
                {isLoadingSummary ? (
                  <Skeleton className="h-5 w-24 ml-auto" />
                ) : (
                  metric.formatter(metric.value)
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PortfolioSummaryTable;
