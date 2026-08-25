import { NextResponse } from "next/server";

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  url: string;
  datetime: number;
  summary: string;
  category: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "general";
  const apiKey = process.env.FINNHUB_API_KEY;

  try {
    if (apiKey) {
      const newsRes = await fetch(
        `https://finnhub.io/api/v1/news?category=${encodeURIComponent(
          category
        )}&token=${apiKey}`,
        { next: { revalidate: 300 } }
      );

      if (newsRes.ok) {
        const newsData = await newsRes.json();
        if (Array.isArray(newsData) && newsData.length > 0) {
          const formattedNews: NewsItem[] = newsData.slice(0, 6).map((item) => ({
            id: String(item.id || Math.random()),
            headline: item.headline || "Market Update",
            source: item.source || "Financial Times",
            url: item.url || "#",
            datetime: item.datetime ? item.datetime * 1000 : Date.now(),
            summary: item.summary || "",
            category: item.category || category,
          }));
          return NextResponse.json({ news: formattedNews });
        }
      }
    }

    const mockNews: NewsItem[] = [
      {
        id: "1",
        headline: "Federal Reserve Signals Data-Dependent Approach to Upcoming Monetary Policy Decisions",
        source: "Bloomberg",
        url: "https://www.bloomberg.com",
        datetime: Date.now() - 1000 * 60 * 45,
        summary: "Fed officials emphasized remaining cautious as inflation metrics align with long-term 2% projections.",
        category: "general",
      },
      {
        id: "2",
        headline: "Tech Sector Rallies as Q3 Semiconductor Demand Exceeds Market Expectations",
        source: "Reuters",
        url: "https://www.reuters.com",
        datetime: Date.now() - 1000 * 60 * 120,
        summary: "Leading chipmakers reported strong enterprise order backlogs driven by AI infrastructure expansion.",
        category: "technology",
      },
      {
        id: "3",
        headline: "S&P 500 ETFs Experience Record Inflows Amid Seasonal Rebalancing",
        source: "Wall Street Journal",
        url: "https://www.wsj.com",
        datetime: Date.now() - 1000 * 60 * 240,
        summary: "Retail and institutional investors allocated over $12B into broad market ETFs this week.",
        category: "general",
      },
      {
        id: "4",
        headline: "Treasury Yields Stabilize Following Strong Demand in Benchmark Bond Auctions",
        source: "Financial Times",
        url: "https://www.ft.com",
        datetime: Date.now() - 1000 * 60 * 360,
        summary: "10-year Treasury yields settled near key support levels as auction bid-to-cover ratios improved.",
        category: "general",
      },
    ];

    return NextResponse.json({ news: mockNews });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch financial news" },
      { status: 500 }
    );
  }
}
