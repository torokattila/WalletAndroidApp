export const formatAmount = (amount: number | string): string => {
  const amountStr = typeof amount === 'number' ? amount.toString() : amount;

  return amountStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
