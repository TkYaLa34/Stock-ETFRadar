export interface TradeProfitParams {
  sellPrice: number;
  buyPrice: number;
  quantity: number;
  fee: number;
}

export function calculateNetProfit({
  sellPrice,
  buyPrice,
  quantity,
  fee,
}: TradeProfitParams): number {
  const grossProfit = (sellPrice - buyPrice) * quantity;
  return grossProfit - fee;
}
