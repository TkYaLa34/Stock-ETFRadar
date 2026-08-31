# Stock & ETF Radar SaaS

![Build Status](https://img.shields.io/badge/Build-Passing-emerald?style=flat-square&logo=github)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/Framework-Next.js%2014-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/Language-TypeScript%205-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-emerald?style=flat-square&logo=supabase)

A production-ready, zero-install, web-browser-first **Stock & ETF Radar SaaS** built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase**. Designed to provide instant financial market intelligence, interactive sector heatmaps, SEC 10-K XBRL financial health badges, real-time streaming price quotes, AI model portfolios, multi-session backtesting, Monte Carlo risk simulations, and smart Web Push alerts.

---

## 1. Overview

Stock & ETF Radar SaaS empowers equity investors and financial analysts with real-time stock/ETF screening and quantitative portfolio analysis directly inside any web browser on desktop or mobile devices.

### Key Value Propositions
- **Zero-Install Web App:** 100% browser-based experience with zero app store downloads or native installations required.
- **SEC 10-K Financial Verification:** Automated XBRL data extraction with color-coded YoY revenue health badges.
- **Institutional AI Analytics:** Multi-session backtesting engine, 10,000-path Monte Carlo Value-at-Risk (VaR) simulations, and live Web Push alerts.
- **Mobile-First Market Dashboard:** Treemap sector heatmaps, concept baskets, mini market index tickers, and fixed mobile bottom navigation.

---

## 2. Core Features

- **Public Market Dashboard (`/dashboard`):** Real-time watchlist management, mini market trend previews, Market Sector Treemap heatmap, and concept sector baskets.
- **Interactive Stock & ETF Screener (`/screener`):** Dynamic multi-criteria filtering by asset type, market cap, P/E ratio, and SEC financial health.
- **Analyst & Quant Radar (`/stock/[symbol]`):** Wall Street analyst target forecasts, consensus gauges, 5-dimension Quant radar charts, order book market depth, and AI SEC MD&A text extraction.
- **AI Portfolio Analyst & Backtesting (`/ai-analyst`):** Multi-session strategy backtesting (Regular, Overnight, Cross-Session) with dynamic spread, slippage, and price impact execution cost modeling.
- **Smart Multi-Condition Web Push Alerts (`/alerts`):** Combine Price, RSI, and Order Book Imbalance rules with Boolean `AND`/`OR` operators delivered via PWA Service Workers (`/sw.js`).
- **Monte Carlo Risk Simulator (`/simulation`):** 10,000-iteration Geometric Brownian Motion simulations calculating VaR 95%, CVaR 95%, and valuation percentile fan charts.

---

## 3. Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Recharts.
- **Backend & Database:** Next.js Server Actions, Route Handlers, Supabase (PostgreSQL with RLS).
- **Performance & Optimization:** Server-side data caching with `unstable_cache`, code-split dynamic chart chunking (`next/dynamic`), PWA Web Push Service Workers.
- **Testing & Tooling:** Playwright E2E testing suite (`/tests/e2e.spec.ts`), ESLint, PostCSS, Autoprefixer.

---

## 4. Architecture & Database Schema

```
                  ┌───────────────────────────────────────────┐
                  │          Next.js 14 App Router            │
                  │    (Public Dashboard, Screener, AI)       │
                  └─────────────────────┬─────────────────────┘
                                        │
                 ┌──────────────────────┼──────────────────────┐
                 ▼                      ▼                      ▼
        ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
        │  Finnhub API     │  │  SEC EDGAR API   │  │  Supabase PG DB  │
        │  (Quotes/News)   │  │  (XBRL 10-K)     │  │  (Watchlists/RLS)│
        └──────────────────┘  └──────────────────┘  └──────────────────┘
```

### Database Schema Tables
- `profiles`: User account details, subscription tier (`free` | `pro`), and preferences.
- `watchlists`: Saved tickers (`ticker`, `asset_type`, `user_id`, `created_at`).
- `price_alerts`: Active alert triggers (`symbol`, `target_price`, `rsi_threshold`, `imbalance_threshold`, `status`).

---

## 5. Getting Started & Local Setup

### Prerequisites
- Node.js 18.x or higher
- npm or pnpm

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/stock-etfradar.git
   cd stock-etfradar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase project credentials and API keys:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   FINNHUB_API_KEY=your-finnhub-api-key
   SEC_EDGAR_USER_AGENT=StockETFRadar contact@stocketfradar.app
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run Production Build Verification:**
   ```bash
   npm run build
   ```

---

## 6. Deployment Guide

### Deploying to Vercel
1. Import the repository into your Vercel Dashboard.
2. Configure the environment variables specified in `.env.example`.
3. Vercel automatically detects Next.js 14 and compiles static/dynamic routes cleanly.

---

## 7. License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
