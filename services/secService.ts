export type FinancialHealthStatus =
  | "strong_growth"
  | "stable"
  | "decline"
  | "unknown";

export interface FactItem {
  end?: string;
  val?: number;
  fy?: number;
  fp?: string;
  form?: string;
  filed?: string;
  frame?: string;
}

export interface ConceptUnit {
  label?: string;
  description?: string;
  units?: Record<string, FactItem[]>;
}

export interface SecCompanyFacts {
  cik?: number | string;
  entityName?: string;
  facts?: {
    "us-gaap"?: Record<string, ConceptUnit>;
    dei?: Record<string, ConceptUnit>;
  };
}

export interface RevenueMetric {
  period: string;
  year: number;
  form: string;
  val: number;
  filed: string;
}

export interface ParsedFinancials {
  entityName: string;
  cik: string;
  revenues: RevenueMetric[];
  latestRevenue: number | null;
  yoyGrowthPercent: number | null;
  healthStatus: FinancialHealthStatus;
  healthExplanation: string;
}

/**
 * Parses SEC XBRL company facts data and extracts annual/quarterly revenue items.
 * Checks multiple common US-GAAP revenue concept keys:
 * - Revenues
 * - SalesRevenueNet
 * - RevenueFromContractWithCustomerExcludingAssessedTax
 */
export function extractCompanyRevenues(data: SecCompanyFacts): ParsedFinancials {
  const entityName = data?.entityName || "Unknown Entity";
  const cik = String(data?.cik || "");

  const usGaap = data?.facts?.["us-gaap"];
  if (!usGaap) {
    return {
      entityName,
      cik,
      revenues: [],
      latestRevenue: null,
      yoyGrowthPercent: null,
      healthStatus: "unknown",
      healthExplanation: "Insufficient SEC 10-K data to evaluate financial health.",
    };
  }

  const revenueConceptKeys = [
    "Revenues",
    "SalesRevenueNet",
    "RevenueFromContractWithCustomerExcludingAssessedTax",
  ];

  let foundConcept: ConceptUnit | undefined;

  for (const key of revenueConceptKeys) {
    if (usGaap[key]?.units?.["USD"]) {
      foundConcept = usGaap[key];
      break;
    }
  }

  if (!foundConcept || !foundConcept.units?.["USD"]) {
    return {
      entityName,
      cik,
      revenues: [],
      latestRevenue: null,
      yoyGrowthPercent: null,
      healthStatus: "unknown",
      healthExplanation: "No US-GAAP USD revenue concepts reported in filings.",
    };
  }

  const usdItems = foundConcept.units["USD"];

  const parsedRevenues: RevenueMetric[] = usdItems
    .filter((item) => typeof item.val === "number" && item.form === "10-K" && item.end)
    .map((item) => ({
      period: item.end!,
      year: item.fy || new Date(item.end!).getFullYear(),
      form: item.form || "10-K",
      val: item.val!,
      filed: item.filed || "",
    }))
    .sort((a, b) => new Date(b.period).getTime() - new Date(a.period).getTime());

  const uniqueRevenues: RevenueMetric[] = [];
  const seenYears = new Set<number>();

  for (const item of parsedRevenues) {
    if (!seenYears.has(item.year)) {
      seenYears.add(item.year);
      uniqueRevenues.push(item);
    }
  }

  const latestRevenue = uniqueRevenues[0]?.val ?? null;
  const previousRevenue = uniqueRevenues[1]?.val ?? null;

  let yoyGrowthPercent: number | null = null;
  let healthStatus: FinancialHealthStatus = "unknown";
  let healthExplanation = "Data unavailable";

  if (latestRevenue !== null && previousRevenue !== null && previousRevenue > 0) {
    yoyGrowthPercent = ((latestRevenue - previousRevenue) / previousRevenue) * 100;

    if (yoyGrowthPercent >= 5) {
      healthStatus = "strong_growth";
      healthExplanation = `Strong YoY revenue growth of +${yoyGrowthPercent.toFixed(1)}% derived from 10-K filings.`;
    } else if (yoyGrowthPercent >= -2) {
      healthStatus = "stable";
      healthExplanation = `Stable annual revenue trajectory (${yoyGrowthPercent >= 0 ? "+" : ""}${yoyGrowthPercent.toFixed(1)}% YoY).`;
    } else {
      healthStatus = "decline";
      healthExplanation = `Revenue declined by ${yoyGrowthPercent.toFixed(1)}% compared to prior fiscal year.`;
    }
  }

  return {
    entityName,
    cik,
    revenues: uniqueRevenues,
    latestRevenue,
    yoyGrowthPercent,
    healthStatus,
    healthExplanation,
  };
}

/**
 * Service function to fetch SEC company facts via our `/api/sec` route and parse key metrics.
 */
export async function fetchAndParseSecFinancials(
  cik: string
): Promise<ParsedFinancials> {
  try {
    const res = await fetch(`/api/sec?cik=${encodeURIComponent(cik)}`);
    if (!res.ok) {
      throw new Error(`SEC API returned status ${res.status}`);
    }
    const data: SecCompanyFacts = await res.json();
    return extractCompanyRevenues(data);
  } catch (error) {
    console.error("Error fetching or parsing SEC financials:", error);
    return {
      entityName: "Unknown Entity",
      cik,
      revenues: [],
      latestRevenue: null,
      yoyGrowthPercent: null,
      healthStatus: "unknown",
      healthExplanation: "Failed to connect to SEC EDGAR API.",
    };
  }
}
