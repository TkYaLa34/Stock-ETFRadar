import { MultiConditionAlert, TriggeredAlertLog } from "@/types/alerts";

export const MOCK_SMART_ALERTS: MultiConditionAlert[] = [
  {
    id: "alert-101",
    symbol: "AAPL",
    name: "Apple Inc. Oversold Breakout",
    targetPrice: 220.0,
    priceCondition: "BELOW",
    rsiThreshold: 35,
    rsiCondition: "BELOW",
    imbalanceThreshold: 15,
    operator: "AND",
    webPushEnabled: true,
    status: "ACTIVE",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "alert-102",
    symbol: "NVDA",
    name: "NVIDIA Momentum Spike",
    targetPrice: 130.0,
    priceCondition: "ABOVE",
    imbalanceThreshold: 20,
    operator: "OR",
    webPushEnabled: true,
    status: "ACTIVE",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const MOCK_TRIGGERED_LOGS: TriggeredAlertLog[] = [
  {
    id: "log-1",
    alertId: "alert-101",
    symbol: "AAPL",
    headline: "Multi-Condition Alert Triggered for AAPL",
    reason: "Price dropped below $220.00 ($219.85) AND RSI dropped below 35 (32.4)",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
];

export function evaluateMultiConditionAlert(
  alert: MultiConditionAlert,
  currentPrice: number,
  currentRsi: number,
  currentImbalance: number
): { triggered: boolean; reasons: string[] } {
  const metConditions: string[] = [];
  const unmetConditions: string[] = [];

  // Condition 1: Price
  if (alert.targetPrice && alert.priceCondition) {
    const isPriceMet =
      alert.priceCondition === "ABOVE"
        ? currentPrice >= alert.targetPrice
        : currentPrice <= alert.targetPrice;
    if (isPriceMet) {
      metConditions.push(
        `Price ${alert.priceCondition.toLowerCase()} $${alert.targetPrice} (Current: $${currentPrice.toFixed(2)})`
      );
    } else {
      unmetConditions.push(`Price condition ($${alert.targetPrice}) not met`);
    }
  }

  // Condition 2: RSI
  if (alert.rsiThreshold && alert.rsiCondition) {
    const isRsiMet =
      alert.rsiCondition === "ABOVE"
        ? currentRsi >= alert.rsiThreshold
        : currentRsi <= alert.rsiThreshold;
    if (isRsiMet) {
      metConditions.push(
        `RSI ${alert.rsiCondition.toLowerCase()} ${alert.rsiThreshold} (Current: ${currentRsi.toFixed(1)})`
      );
    } else {
      unmetConditions.push(`RSI condition (${alert.rsiThreshold}) not met`);
    }
  }

  // Condition 3: Order Book Imbalance
  if (alert.imbalanceThreshold) {
    if (currentImbalance >= alert.imbalanceThreshold) {
      metConditions.push(
        `Buy Imbalance >= +${alert.imbalanceThreshold}% (Current: +${currentImbalance.toFixed(1)}%)`
      );
    } else {
      unmetConditions.push(`Imbalance threshold (+${alert.imbalanceThreshold}%) not met`);
    }
  }

  let triggered = false;
  if (alert.operator === "AND") {
    triggered = metConditions.length > 0 && unmetConditions.length === 0;
  } else {
    // OR operator
    triggered = metConditions.length > 0;
  }

  return { triggered, reasons: metConditions };
}

export async function requestWebPushPermission(): Promise<NotificationPermission> {
  if (typeof window !== "undefined" && "Notification" in window) {
    const permission = await Notification.requestPermission();
    if (permission === "granted" && "serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("/sw.js");
      } catch (err) {
        console.warn("Service Worker registration failed:", err);
      }
    }
    return permission;
  }
  return "denied";
}

export function sendLocalWebPushNotification(title: string, body: string) {
  if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(title, {
          body,
          icon: "/manifest.json",
          badge: "/manifest.json",
          vibrate: [200, 100, 200],
        } as NotificationOptions);
      });
    } else {
      new Notification(title, { body });
    }
  }
}
