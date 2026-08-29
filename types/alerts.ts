export type AlertOperator = "AND" | "OR";
export type AlertStatus = "ACTIVE" | "TRIGGERED font-mono" | "PAUSED";

export interface MultiConditionAlert {
  id: string;
  symbol: string;
  name: string;
  targetPrice?: number; // Condition 1: Target Price ($)
  priceCondition?: "ABOVE" | "BELOW";
  rsiThreshold?: number; // Condition 2: RSI Level (0-100)
  rsiCondition?: "ABOVE" | "BELOW";
  imbalanceThreshold?: number; // Condition 3: Order Book Buy Imbalance (%)
  operator: AlertOperator; // Combination logic
  webPushEnabled: boolean;
  status: AlertStatus;
  createdAt: string;
  triggeredAt?: string;
  lastTriggerReason?: string;
}

export interface TriggeredAlertLog {
  id: string;
  alertId: string;
  symbol: string;
  headline: string;
  reason: string;
  timestamp: string;
}
