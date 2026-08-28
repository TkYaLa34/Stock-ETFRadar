export interface MonteCarloParams {
  initialPortfolioValue: number;
  expectedAnnualReturnPct: number;
  annualVolatilityPct: number;
  timeHorizonMonths: number;
  numSimulations: number; // e.g. 10,000
}

export interface SimulationPathPoint {
  month: number;
  p5: number; // 5th percentile (pessimistic)
  p25: number;
  p50: number; // Median
  p75: number;
  p95: number; // 95th percentile (optimistic)
}

export interface MonteCarloResult {
  params: MonteCarloParams;
  endingMedianValue: number;
  valueAtRisk95Pct: number; // VaR 95%
  conditionalVaR95Pct: number; // CVaR 95% (Expected Shortfall)
  maxDrawdownPct: number;
  probabilityOfLossPct: number;
  pathsHistory: SimulationPathPoint[];
}

export interface SecMdaRiskFactor {
  category: "Macroeconomic" | "Regulatory" | "Supply Chain" | "Debt & Liquidity";
  severity: "HIGH" | "MEDIUM" | "LOW";
  summary: string;
  quoteSnippet: string;
}

export interface SecMdaAnalysisData {
  symbol: string;
  entityName: string;
  filingPeriod: string;
  aiExecutiveSummary: string;
  liquidityCommentary: string;
  debtMaturityWall: {
    within1Year: number; // $ Millions
    years1To3: number;
    years3To5: number;
    after5Years: number;
  };
  riskFactors: SecMdaRiskFactor[];
}
