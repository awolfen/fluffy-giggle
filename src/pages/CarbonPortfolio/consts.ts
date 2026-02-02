export const VintageYearRanges: {
  label: string;
  value: number;
}[] = [
  { label: "2022", value: 2022 },
  { label: "2023", value: 2023 },
  { label: "2024", value: 2024 },
];

export const VintageFilterDefaultState = {
  minYear: VintageYearRanges[0].value,
  maxYear: VintageYearRanges[VintageYearRanges.length - 1].value,
};

export const VintageFilterInitialValue = `${VintageFilterDefaultState.minYear}-${VintageFilterDefaultState.maxYear}`;
