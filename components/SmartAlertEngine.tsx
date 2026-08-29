"use client";

import { useState, useEffect } from "react";
import {
  MOCK_SMART_ALERTS,
  MOCK_TRIGGERED_LOGS,
  requestWebPushPermission,
  sendLocalWebPushNotification,
  evaluateMultiConditionAlert,
} from "@/services/alertService";
import { MultiConditionAlert, TriggeredAlertLog, AlertOperator } from "@/types/alerts";

export function SmartAlertEngine() {
  const [alerts, setAlerts] = useState<MultiConditionAlert[]>(MOCK_SMART_ALERTS);
  const [logs, setLogs] = useState<TriggeredAlertLog[]>(MOCK_TRIGGERED_LOGS);
  const [pushPermission, setPushPermission] = useState<NotificationPermission>("default");

  // Form State
  const [symbol, setSymbol] = useState("AAPL");
  const [name, setName] = useState("Apple Inc.");
  const [targetPrice, setTargetPrice] = useState<number | "">(220);
  const [priceCondition, setPriceCondition] = useState<"ABOVE" | "BELOW">("BELOW");
  const [rsiThreshold, setRsiThreshold] = useState<number | "">(35);
  const [rsiCondition, setRsiCondition] = useState<"ABOVE" | "BELOW">("BELOW");
  const [imbalanceThreshold, setImbalanceThreshold] = useState<number | "">(15);
  const [operator, setOperator] = useState<AlertOperator>("AND");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPushPermission(Notification.permission);
    }
  }, []);

  const handleEnablePush = async () => {
    const permission = await requestWebPushPermission();
    setPushPermission(permission);
    if (permission === "granted") {
      sendLocalWebPushNotification(
        "Web Push Enabled",
        "You will now receive instant multi-condition price & technical alerts."
      );
    }
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol) return;

    const newAlert: MultiConditionAlert = {
      id: `alert-${Date.now()}`,
      symbol: symbol.toUpperCase(),
      name: name || symbol.toUpperCase(),
      targetPrice: targetPrice !== "" ? Number(targetPrice) : undefined,
      priceCondition,
      rsiThreshold: rsiThreshold !== "" ? Number(rsiThreshold) : undefined,
      rsiCondition,
      imbalanceThreshold: imbalanceThreshold !== "" ? Number(imbalanceThreshold) : undefined,
      operator,
      webPushEnabled: pushPermission === "granted",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };

    setAlerts((prev) => [newAlert, ...prev]);

    // Reset Form
    setSymbol("NVDA");
    setName("NVIDIA Corp.");
    setTargetPrice(135);
  };

  const handleTestTrigger = (alert: MultiConditionAlert) => {
    const currentPrice = alert.priceCondition === "BELOW" ? (alert.targetPrice || 200) - 1.5 : (alert.targetPrice || 200) + 1.5;
    const currentRsi = alert.rsiCondition === "BELOW" ? (alert.rsiThreshold || 50) - 2 : (alert.rsiThreshold || 50) + 2;
    const currentImbalance = (alert.imbalanceThreshold || 10) + 5;

    const evalResult = evaluateMultiConditionAlert(alert, currentPrice, currentRsi, currentImbalance);

    if (evalResult.triggered) {
      const logEntry: TriggeredAlertLog = {
        id: `log-${Date.now()}`,
        alertId: alert.id,
        symbol: alert.symbol,
        headline: `Multi-Condition Alert Triggered for ${alert.symbol}`,
        reason: evalResult.reasons.join(` ${alert.operator} `),
        timestamp: new Date().toISOString(),
      };

      setLogs((prev) => [logEntry, ...prev]);
      sendLocalWebPushNotification(logEntry.headline, logEntry.reason);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner & Web Push Status */}
      <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-white">Smart Multi-Condition Alert Engine</h3>
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded bg-blue-950 text-blue-400 border border-blue-800/60 uppercase">
              WEB PUSH WORKER
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            Combine Price level, RSI technicals, and Order Book Buy Imbalance with Boolean logic (AND / OR).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-gray-400 block">Web Push Status:</span>
            <span className={`font-mono font-bold uppercase ${pushPermission === "granted" ? "text-emerald-400" : "text-amber-400"}`}>
              {pushPermission === "granted" ? "● ACTIVE & SUBSCRIBED" : "○ NOT PERMITTED"}
            </span>
          </div>

          {pushPermission !== "granted" && (
            <button
              onClick={handleEnablePush}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-all shadow-lg shadow-blue-600/30"
            >
              Enable Web Push
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Multi-Condition Alert Builder */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6">
          <div className="border-b border-neutral-800 pb-3">
            <h3 className="text-base font-bold text-white">Create Multi-Condition Alert</h3>
            <p className="text-xs text-gray-400 mt-0.5">Configure target variables and trigger operators</p>
          </div>

          <form onSubmit={handleCreateAlert} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-400 font-semibold mb-1">Asset Symbol & Name</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder="SYMBOL"
                  className="bg-neutral-950 border border-neutral-800 text-white font-bold font-mono px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 uppercase"
                  required
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Company Name"
                  className="bg-neutral-950 border border-neutral-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Condition 1: Target Price */}
            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 space-y-2">
              <span className="font-bold text-blue-400 block">Condition 1: Target Price ($)</span>
              <div className="flex gap-2">
                <select
                  value={priceCondition}
                  onChange={(e: any) => setPriceCondition(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 text-gray-200 rounded px-2 py-1.5 focus:outline-none"
                >
                  <option value="BELOW">Below (≤)</option>
                  <option value="ABOVE">Above (≥)</option>
                </select>
                <input
                  type="number"
                  step="0.01"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value ? Number(e.target.value) : "")}
                  placeholder="Price ($)"
                  className="bg-neutral-900 border border-neutral-700 text-white font-mono px-3 py-1.5 rounded w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Combination Logic Operator */}
            <div className="flex items-center justify-center gap-4 py-1">
              <span className="text-gray-500 text-[11px] uppercase font-bold">Logic Operator:</span>
              <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800 font-mono">
                <button
                  type="button"
                  onClick={() => setOperator("AND")}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    operator === "AND" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  AND (Strict)
                </button>
                <button
                  type="button"
                  onClick={() => setOperator("OR")}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    operator === "OR" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  OR (Any)
                </button>
              </div>
            </div>

            {/* Condition 2: Technical RSI */}
            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 space-y-2">
              <span className="font-bold text-purple-400 block">Condition 2: Technical RSI (0-100)</span>
              <div className="flex gap-2">
                <select
                  value={rsiCondition}
                  onChange={(e: any) => setRsiCondition(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 text-gray-200 rounded px-2 py-1.5 focus:outline-none"
                >
                  <option value="BELOW">Below (Oversold)</option>
                  <option value="ABOVE">Above (Overbought)</option>
                </select>
                <input
                  type="number"
                  value={rsiThreshold}
                  onChange={(e) => setRsiThreshold(e.target.value ? Number(e.target.value) : "")}
                  placeholder="RSI Level"
                  className="bg-neutral-900 border border-neutral-700 text-white font-mono px-3 py-1.5 rounded w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Condition 3: Order Book Imbalance */}
            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 space-y-2">
              <span className="font-bold text-emerald-400 block">Condition 3: Order Book Buy Imbalance (%)</span>
              <input
                type="number"
                value={imbalanceThreshold}
                onChange={(e) => setImbalanceThreshold(e.target.value ? Number(e.target.value) : "")}
                placeholder="Buy Imbalance Threshold (%)"
                className="bg-neutral-900 border border-neutral-700 text-white font-mono px-3 py-1.5 rounded w-full focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 font-bold text-white rounded-lg transition-all shadow-lg shadow-blue-600/30"
            >
              + Add Smart Multi-Condition Alert
            </button>
          </form>
        </div>

        {/* Right Column: Active Alerts List & Triggered Log */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Alerts List */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-4">
            <div className="border-b border-neutral-800 pb-3 flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Active Multi-Condition Rules</h3>
              <span className="text-xs font-mono text-gray-400">{alerts.length} Configured</span>
            </div>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3 hover:border-neutral-700 transition-all text-xs"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm font-mono">{alert.symbol}</span>
                      <span className="text-gray-400 truncate max-w-[180px]">{alert.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/60 font-mono font-bold">
                        {alert.operator} RULE
                      </span>
                      <button
                        onClick={() => handleTestTrigger(alert)}
                        className="px-2.5 py-1 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 font-bold rounded transition-all"
                      >
                        ⚡ Test Trigger
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono text-gray-300">
                    {alert.targetPrice && (
                      <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                        Price: <strong className="text-blue-400">{alert.priceCondition} ${alert.targetPrice}</strong>
                      </div>
                    )}
                    {alert.rsiThreshold && (
                      <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                        RSI: <strong className="text-purple-400">{alert.rsiCondition} {alert.rsiThreshold}</strong>
                      </div>
                    )}
                    {alert.imbalanceThreshold && (
                      <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                        Imbalance: <strong className="text-emerald-400">≥ +{alert.imbalanceThreshold}%</strong>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Triggered Alerts History Log */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-4">
            <div className="border-b border-neutral-800 pb-3 flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Triggered Web Push Notification History</h3>
              <span className="text-xs font-mono text-emerald-400">{logs.length} Events Logged</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {logs.map((log) => (
                <div key={log.id} className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg space-y-1 font-mono">
                  <div className="flex justify-between items-center text-gray-400 text-[11px]">
                    <span className="font-bold text-emerald-400">{log.headline}</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-gray-300 font-sans text-xs">{log.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
