import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawCik = searchParams.get("cik");

  if (!rawCik) {
    return NextResponse.json(
      { error: "CIK parameter is required (e.g. ?cik=0000320193)" },
      { status: 400 }
    );
  }

  const numericCik = rawCik.replace(/\D/g, "");
  const paddedCik = numericCik.padStart(10, "0");

  const secUrl = `https://data.sec.gov/api/xbrl/companyfacts/CIK${paddedCik}.json`;
  const userAgent =
    process.env.SEC_EDGAR_USER_AGENT ||
    "StockETFRadar contact@stocketfradar.app";

  try {
    const { getCachedSecCompanyFacts } = await import("@/lib/financial-api");
    const data = await getCachedSecCompanyFacts(paddedCik);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch company facts from SEC EDGAR API",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
