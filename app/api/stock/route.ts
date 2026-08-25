import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol")?.toUpperCase() || "AAPL";
  const apiKey = process.env.FINNHUB_API_KEY;

  try {
    if (apiKey) {
      const quoteRes = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(
          symbol
        )}&token=${apiKey}`,
        { next: { revalidate: 60 } }
      );

      if (quoteRes.ok) {
        const quoteData = await quoteRes.json();
        const currentPrice = quoteData.c || 150;
        const change = quoteData.d || 0;
        const percentChange = quoteData.dp || 0;

        const history = Array.from({ length: 7 }, (_, i) => {
          const dayOffset = 6 - i;
          const date = new Date();
          date.setDate(date.getDate() - dayOffset);
          const timeStr = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          const variance = (Math.sin(i) * 0.02 + (i - 3) * 0.005) * currentPrice;
          return {
            time: timeStr,
            price: Number((currentPrice - variance).toFixed(2)),
          };
        });

        return NextResponse.json({
          symbol,
          price: currentPrice,
          change,
          percentChange,
          history,
        });
      }
    }

    const mockPrices: Record<string, number> = {
      AAPL: 224.23,
      NVDA: 128.5,
      VOO: 512.8,
      QQQ: 480.15,
      MSFT: 421.4,
    };
    const basePrice = mockPrices[symbol] || 150;

    const mockHistory = Array.from({ length: 7 }, (_, i) => {
      const dayOffset = 6 - i;
      const date = new Date();
      date.setDate(date.getDate() - dayOffset);
      const timeStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const price = Number(
        (basePrice * (1 + Math.sin(i * 0.8) * 0.03)).toFixed(2)
      );
      return { time: timeStr, price };
    });

    return NextResponse.json({
      symbol,
      price: basePrice,
      change: 2.5,
      percentChange: 1.2,
      history: mockHistory,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 }
    );
  }
}
