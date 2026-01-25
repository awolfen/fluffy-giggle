import { Button } from "@/components/ui/button";
import { PositionStatus } from "@/types/portfolio";

export type PortfolioSummaryStatusFilterValue = PositionStatus | "both";

interface StatusFilterProps {
  value: PortfolioSummaryStatusFilterValue;
  onChange: (value: PortfolioSummaryStatusFilterValue) => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  const options: { label: string; value: PortfolioSummaryStatusFilterValue }[] =
    [
      { label: "Both", value: "both" },
      { label: "Available", value: "available" },
      { label: "Retired", value: "retired" },
    ];

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          variant={value === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
