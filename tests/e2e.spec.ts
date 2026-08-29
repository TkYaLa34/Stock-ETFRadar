import { test, expect } from "@playwright/test";

test.describe("Stock & ETF Radar SaaS E2E Suite", () => {
  test("should render landing page correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Stock & ETF Radar/i);
    await expect(page.locator("h1")).toContainText(/Stock & ETF Radar/i);
  });

  test("should load login page", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("form")).toBeVisible();
  });

  test("should navigate to screener route", async ({ page }) => {
    await page.goto("/screener");
    await expect(page.locator("h1")).toContainText(/Stock & ETF Screener/i);
  });

  test("should load AI Analyst backtest dashboard", async ({ page }) => {
    await page.goto("/ai-analyst");
    await expect(page.locator("h1")).toContainText(/AI Portfolio Analyst/i);
  });

  test("should load Smart Alerts engine", async ({ page }) => {
    await page.goto("/alerts");
    await expect(page.locator("h1")).toContainText(/Smart Multi-Condition Alerts/i);
  });

  test("should load Monte Carlo Risk Simulator", async ({ page }) => {
    await page.goto("/simulation");
    await expect(page.locator("h1")).toContainText(/Monte Carlo Risk Simulator/i);
  });
});
