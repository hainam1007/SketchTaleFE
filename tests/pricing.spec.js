import { test, expect } from "@playwright/test";
test("provided plan prices and entitlements display without a fake checkout", async ({
  page,
}) => {
  await page.goto("/pricing");
  await expect(page.locator(".plan-card")).toHaveCount(3);
  await expect(page.locator(".plan-explorer .plan-price")).toContainText(
    "35.000",
  );
  await expect(page.locator(".plan-family .plan-price")).toContainText(
    "89.000",
  );
  await expect(page.locator(".plan-starter")).toContainText("1 hồ sơ trẻ em");
  await expect(page.locator(".plan-explorer")).toContainText(
    "Tối đa 3 hồ sơ trẻ em",
  );
  await expect(page.locator(".plan-family")).toContainText(
    "Tối đa 5 hồ sơ trẻ em",
  );
  await expect(page.locator(".plan-family")).toContainText("100 lượt/tháng");
  await expect(page.locator(".pricing-notice")).toContainText(
    "chưa hỗ trợ đăng ký gói",
  );
  await page.screenshot({
    path: "artifacts/pricing-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "artifacts/pricing-mobile.png",
    fullPage: true,
  });
  await page
    .locator(".plan-starter")
    .getByRole("link", { name: "Khám phá truyện mẫu" })
    .click();
  await expect(page).toHaveURL("/stories");
});
