export const formatPrice = (count, currency = false) => {
  const currencyOptions = {
    style: 'currency',
    currency: 'USD',
  };
  return count
    ? new Intl.NumberFormat('en-US', currency && currencyOptions).format(count)
    : '0';
};
