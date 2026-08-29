# Stock & ETF Radar SaaS

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/TkYaLa34/Stock-ETFRadar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Framework](https://img.shields.io/badge/Next.js-14%2B-black?logo=next.js)](https://nextjs.org/)
[![Language](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/Supabase-PostgreSQL-emerald?logo=supabase)](https://supabase.com/)

A modern, real-time market screening and monitoring platform built for retail investors, day traders, and financial analysts to track equities and ETFs with custom criteria, price alerts, and automated signals.

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture & Database Schema](#architecture--database-schema)
- [Getting Started / Installation](#getting-started--installation)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Run Development Server](#4-run-development-server)
- [Deployment](#deployment)
  - [Deploying to Vercel](#deploying-to-vercel)
  - [Linking Supabase](#linking-supabase)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Stock & ETF Radar SaaS** empowers investors to discover market opportunities instantly. By providing real-time data streaming, customizable stock/ETF screeners, threshold price alerts, and dynamic watchlists, the platform eliminates market noise and delivers actionable financial intelligence directly to users. Designed with modern SaaS architecture, it supports user subscriptions, tier-based feature access, and seamless multi-device synchronization.

---

## Core Features

- 🔐 **Authentication & User Management:** Secure sign-up/login powered by Supabase Auth with support for OAuth providers, email/password, and session persistence.
- 📊 **Stock & ETF Screening Radar:** Advanced filtering engine by market cap, sector, P/E ratio, dividend yield, RSI, and technical indicators.
- ⚡ **Real-time Watchlists:** Dynamic watchlists with WebSocket/real-time streaming price updates.
- 🔔 **Custom Price Alerts:** Real-time notifications (email/in-app) when target assets hit user-defined upper or lower price limits.
- 💳 **SaaS Subscription Engine:** Tiered subscription management (Free, Pro, Premium) integrated for premium screener metrics and unlimited watchlists.
- 🎨 **Responsive Dashboard:** Sleek, modern user interface crafted with Next.js App Router and Tailwind CSS, featuring light/dark mode support.

---

## Tech Stack

### Frontend
- **Framework:** Next.js (App Router, React Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **State & Data Fetching:** React Query / Server Actions

### Backend & Database
- **BaaS Platform:** Supabase
- **Database:** PostgreSQL
- **Authentication:** Supabase Auth (JWT)
- **Real-time Updates:** Supabase Realtime (WebSockets)
- **Storage & RLS:** PostgreSQL Row Level Security (RLS) policies

### Infrastructure & Deployment
- **Hosting:** Vercel
- **Version Control:** GitHub

---

## Architecture & Database Schema

The application follows a modular Next.js App Router architecture integrated directly with Supabase for data persistence and authentication. Row Level Security (RLS) ensures tenant isolation and strict privacy across all tables.

```
+-------------------------------------------------------------+
|                       Next.js Frontend                      |
|           (App Router, React Server Components)            |
+------------------------------+------------------------------+
                               |
                   Supabase SDK / REST API
                               |
+------------------------------v------------------------------+
|                      Supabase Backend                       |
|  +--------------------+  +--------------------+  +--------+ |
|  |   Supabase Auth    |  | Supabase Realtime  |  |  RLS   | |
|  +--------------------+  +--------------------+  +--------+ |
|                              |                              |
|                    PostgreSQL Database                      |
|      [profiles] -------> [watchlists] -------> [price_alerts]|
+-------------------------------------------------------------+
```

### Key Database Tables

#### 1. `profiles`
Stores user profile details and subscription metadata synced with `auth.users`.
- `id` (uuid, Primary Key, references `auth.users.id`)
- `email` (text)
- `full_name` (text)
- `subscription_tier` (text, e.g. `'free'`, `'pro'`, `'enterprise'`)
- `updated_at` (timestamptz)

#### 2. `watchlists`
Stores user-created watchlists and individual tracked tickers.
- `id` (uuid, Primary Key)
- `user_id` (uuid, Foreign Key -> `profiles.id`)
- `ticker` (text, e.g. `'AAPL'`, `'VOO'`)
- `asset_type` (text, e.g. `'stock'`, `'etf'`)
- `added_at` (timestamptz)

#### 3. `price_alerts`
Tracks price triggers set by users for specific assets.
- `id` (uuid, Primary Key)
- `user_id` (uuid, Foreign Key -> `profiles.id`)
- `ticker` (text)
- `target_price` (numeric)
- `condition` (text, e.g. `'ABOVE'`, `'BELOW'`)
- `is_triggered` (boolean)
- `created_at` (timestamptz)

---

## Getting Started / Installation

Follow these instructions to set up and run the Stock & ETF Radar SaaS project locally on your machine.

### Prerequisites

Ensure you have the following installed on your local environment:
- **Node.js:** v18.0.0 or higher
- **Package Manager:** `npm` (v9+) or `pnpm` (v8+)
- **Git**

### 1. Clone Repository

```bash
git clone https://github.com/TkYaLa34/Stock-ETFRadar.git
cd Stock-ETFRadar
```

### 2. Install Dependencies

Using `npm`:
```bash
npm install
```

Or using `pnpm`:
```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory of the project:

```bash
cp .env.example .env.local
```

Populate `.env.local` with your Supabase credentials and application configuration:

```env
# Next.js App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Financial Data API (Optional / Standard Provider)
FINANCIAL_DATA_API_KEY=your-financial-data-api-key
```

### 4. Run Development Server

Start the Next.js development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Deployment

### Deploying to Vercel

1. Push your repository to GitHub.
2. Import your project into [Vercel](https://vercel.com/new).
3. Select **Next.js** as the framework preset.
4. Add the required environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.) in the Vercel project settings.
5. Click **Deploy**.

### Linking Supabase

1. Create a project on [Supabase Dashboard](https://supabase.com/dashboard).
2. Execute the database schema migrations or create the tables (`profiles`, `watchlists`, `price_alerts`) with appropriate RLS policies.
3. Configure **Authentication URL Configuration** under Supabase Auth Settings:
   - **Site URL:** `https://your-app.vercel.app`
   - **Redirect URLs:** `https://your-app.vercel.app/auth/callback`
4. Copy the Project URL and Anon API key into Vercel's environment variable configuration.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes: `git commit -m 'Add amazing feature'`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

---

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.
