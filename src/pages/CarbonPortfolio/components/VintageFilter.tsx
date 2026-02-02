import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { VintageYearRanges } from "../consts";

export type PortfolioSummaryVintageFilterValue = string;

interface VintageFilterProps {
  onChange: (value: PortfolioSummaryVintageFilterValue) => void;
}

export function VintageFilter({ onChange }: VintageFilterProps) {
  const [state, setState] = useState<{
    minYear: number;
    maxYear: number;
  }>({
    minYear: VintageYearRanges[0].value,
    maxYear: VintageYearRanges[VintageYearRanges.length - 1].value,
  });

  onChange(`${state.minYear}-${state.maxYear}`);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{state.minYear}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Vintage Range</DropdownMenuLabel>
            {VintageYearRanges.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onSelect={() =>
                  setState((prev) => ({ ...prev, minYear: option.value }))
                }
                className={state.minYear === option.value ? "font-bold" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{state.maxYear}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Vintage Range</DropdownMenuLabel>
            {VintageYearRanges.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onSelect={() =>
                  setState((prev) => ({ ...prev, maxYear: option.value }))
                }
                className={state.maxYear === option.value ? "font-bold" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
