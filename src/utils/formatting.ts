export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
