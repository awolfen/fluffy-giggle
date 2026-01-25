import { Badge } from "@/components/ui/badge";
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
import { Position } from "@/types/portfolio";
import { formatCurrency, formatNumber } from "@/utils/formatting";
import { useEffect, useState } from "react";

export function PositionsTable() {
  const { toast } = useToast();
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoadingPositions, setIsLoadingPositions] = useState(true);

  //Could switch this to useQuery form '@tanstack/react-query' for better caching and state management
  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      setIsLoadingPositions(true);
      const response = await fetch(`${API_BASE_URL}/portfolio`);
      if (!response.ok) throw new Error("Failed to fetch positions");
      const data = await response.json();
      setPositions(data);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to load portfolio positions. Make sure the backend is running.",
        variant: "destructive",
      });
      console.error("Error fetching positions:", error);
    } finally {
      setIsLoadingPositions(false);
    }
  };

  if (!positions && !isLoadingPositions) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No positions found
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead className="text-right">Tonnes</TableHead>
            <TableHead className="text-right">Price/Tonne</TableHead>
            <TableHead className="text-right">Total Value</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Vintage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position.id}>
              <TableCell className="font-medium">
                {position.projectName}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(position.tonnes)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(position.pricePerTonne)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(position.tonnes * position.pricePerTonne)}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={
                    position.status === "available" ? "default" : "secondary"
                  }
                >
                  {position.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center">{position.vintage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
