export const convertToGwei = (gas: number): string => {
  const convert = gas / 1000000000;
  return `${convert.toFixed(2)} Gwei`;
};

export const convertToEther = (value: number): string => {
  const convert = value / 10 ** 18;
  return `${convert.toFixed(4)} ETH`;
};

export const convertToMatic = (value: number): string => {
  const convert = value / 10 ** 18;
  return `${convert.toFixed(4)} MATIC`;
};
