import {
  MonteCarloParams,
  MonteCarloResult,
  SimulationPathPoint,
  SecMdaAnalysisData,
} from "@/types/simulation";

// Standard Normal Box-Muller transform generator
function randomNormal(): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export function runMonteCarloSimulation(
  params: MonteCarloParams = {
    initialPortfolioValue: 100000,
    expectedAnnualReturnPct: 10,
    annualVolatilityPct: 18,
    timeHorizonMonths: 12,
    numSimulations: 10000,
  }
): MonteCarloResult {
  const dt = 1 / 12; // Monthly step
  const mu = params.expectedAnnualReturnPct / 100;
  const sigma = params.annualVolatilityPct / 100;

  // Matrix storing simulation results: [simulationIndex][monthStep]
  const simMatrix: number[][] = Array.from({ length: params.numSimulations }, () => [
    params.initialPortfolioValue,
  ]);

  for (let s = 0; s < params.numSimulations; s++) {
    let currentVal = params.initialPortfolioValue;
    for (let m = 1; m <= params.timeHorizonMonths; m++) {
      const z = randomNormal();
      // Geometric Brownian Motion formula
      const returnFactor = Math.exp(
        (mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z
      );
      currentVal *= returnFactor;
      simMatrix[s].push(currentVal);
    }
  }

  // Calculate monthly percentile distribution
  const pathsHistory: SimulationPathPoint[] = [];

  for (let m = 0; m <= params.timeHorizonMonths; m++) {
    const monthValues = simMatrix.map((path) => path[m]).sort((a, b) => a - b);
    const getPercentile = (pct: number) => {
      const idx = Math.floor((pct / 100) * (params.numSimulations - 1));
      return Number(monthValues[idx].toFixed(2));
    };

    pathsHistory.push({
      month: m,
      p5: getPercentile(5),
      p25: getPercentile(25),
      p50: getPercentile(50),
      p75: getPercentile(75),
      p95: getPercentile(95),
    });
  }

  const endingValues = simMatrix.map((path) => path[params.timeHorizonMonths]).sort((a, b) => a - b);
  const endingMedianValue = endingValues[Math.floor(0.5 * params.numSimulations)];

  // Value at Risk (VaR 95%) = Initial - 5th percentile ending value
  const p5EndingValue = endingValues[Math.floor(0.05 * params.numSimulations)];
  const valueAtRisk95Pct = Number(
    (((params.initialPortfolioValue - p5EndingValue) / params.initialPortfolioValue) * 100).toFixed(2)
  );

  // Conditional VaR (CVaR 95%) = Average of losses worse than 5th percentile
  const tailValues = endingValues.slice(0, Math.floor(0.05 * params.numSimulations));
  const avgTailEndingValue = tailValues.reduce((sum, v) => sum + v, 0) / tailValues.length;
  const conditionalVaR95Pct = Number(
    (((params.initialPortfolioValue - avgTailEndingValue) / params.initialPortfolioValue) * 100).toFixed(2)
  );

  const lossCount = endingValues.filter((v) => v < params.initialPortfolioValue).length;
  const probabilityOfLossPct = Number(((lossCount / params.numSimulations) * 100).toFixed(1));

  return {
    params,
    endingMedianValue: Number(endingMedianValue.toFixed(2)),
    valueAtRisk95Pct: Math.max(0, valueAtRisk95Pct),
    conditionalVaR95Pct: Math.max(0, conditionalVaR95Pct),
    maxDrawdownPct: Number((params.annualVolatilityPct * 0.85).toFixed(1)),
    probabilityOfLossPct,
    pathsHistory,
  };
}

export function getMockSecMdaAnalysis(symbol: string): SecMdaAnalysisData {
  return {
    symbol,
    entityName: symbol === "AAPL" ? "Apple Inc." : symbol === "NVDA" ? "NVIDIA Corp." : "ASML Holding NV",
    filingPeriod: "FY 2024 10-K",
    aiExecutiveSummary:
      "Management Discussion & Analysis (MD&A) highlights robust operational cash flow growth driven by premium product mix expansion. Key risk factors center on foreign exchange volatility, semiconductor supply chain concentration, and evolving export regulations.",
    liquidityCommentary:
      "The company maintains a strong liquidity position with $28.5B in cash and short-term investments. Operating cash flows remain sufficient to cover projected capital expenditures and debt service obligations over the next 12 months.",
    debtMaturityWall: {
      within1Year: 3200, // $ Millions
      years1To3: 8500,
      years3To5: 12400,
      after5Years: 18600,
    },
    riskFactors: [
      {
        category: "Supply Chain",
        severity: "HIGH",
        summary: "Concentration in advanced semiconductor wafer fabrication capacity.",
        quoteSnippet: "We rely on single-source and limited-source suppliers for key components, creating potential operational bottlenecks.",
      },
      {
        category: "Regulatory",
        severity: "MEDIUM",
        summary: "Evolving global trade tariffs and technology export restrictions.",
        quoteSnippet: "Changes in trade policies or export controls could materially impact international revenue realization.",
      },
      {
        category: "Debt & Liquidity",
        severity: "LOW",
        summary: "Manageable debt maturity profile with high investment-grade credit rating.",
        quoteSnippet: "We believe existing cash reserves and credit facilities are adequate to fund operating needs.",
      },
    ],
  };
}
