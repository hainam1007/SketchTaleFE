import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home and responsive layouts have no overflow, visible CTA and usable images", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Mở trang sách.",
  );
  await expect(page.locator(".home-shelf .story-card")).toHaveCount(3);
  for (const width of [360, 390, 768, 1024, 1366, 1440]) {
    await page.setViewportSize({ width, height: 768 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const cta = await page.locator(".hero .button").boundingBox();
    expect(cta.y + cta.height).toBeLessThan(768);
  }
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
  await page.screenshot({ path: "artifacts/hero-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
  await page.screenshot({ path: "artifacts/hero-mobile.png" });
  expect(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images.every((img) => img.complete && img.naturalWidth > 0),
      ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("search and category combine, clear restores stories and query survives reload", async ({
  page,
}) => {
  await page.goto("/stories");
  await expect(page.locator(".story-card")).toHaveCount(3);
  await page.getByLabel("Tìm theo tên truyện").fill("hat mam");
  await expect(page.locator(".story-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Tình bạn", exact: true }).click();
  await expect(
    page.getByText("Chưa tìm thấy câu chuyện phù hợp."),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Tìm theo tên truyện")).toHaveValue("hat mam");
  await page.getByRole("button", { name: "Xóa bộ lọc" }).click();
  await expect(page.locator(".story-card")).toHaveCount(3);
});

test("reader boundaries, wrong answer review, right answer and restart", async ({
  page,
}) => {
  await page.goto("/stories/chiec-o-cua-ban-tho");
  await page
    .getByRole("button", { name: "Đọc truyện mẫu", exact: true })
    .click();
  await expect(page.locator(".reader")).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Trang trước" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Trang sau" }).click();
  await expect(page.locator(".reader-text")).toContainText(
    "Bạn đi cùng mình nhé!",
  );
  await page.getByRole("button", { name: "Trang sau" }).click();
  await expect(page.getByRole("button", { name: "Trang sau" })).toBeDisabled();
  await page.getByLabel("Chạy về nhà một mình.").check();
  await page.getByRole("button", { name: "Cùng xem đáp án" }).click();
  await page.getByRole("button", { name: "Xem lại trang 2" }).click();
  await expect(page.locator(".reader-text")).toContainText("Trang 2 / 3");
  await page.getByRole("button", { name: "Trang sau" }).click();
  await page.getByLabel("Rủ Sóc đi chung ô.").check();
  await page.getByRole("button", { name: "Cùng xem đáp án" }).click();
  await expect(page.getByRole("status")).toContainText("Đúng rồi!");
  await page.getByRole("button", { name: "Đọc lại", exact: true }).click();
  await expect(page.locator(".reader-text")).toContainText("Trang 1 / 3");
  await expect(page.locator(".quiz")).toHaveCount(0);
});

test("parent settings stay independent, tabs support keyboard", async ({
  page,
}) => {
  await page.goto("/for-parents");
  await page.getByRole("tab", { name: "Hồ sơ của bé" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Nội dung phù hợp" }),
  ).toHaveAttribute("aria-selected", "true");
  await page.getByRole("switch", { name: "Tình bạn" }).uncheck();
  await page.getByRole("button", { name: "Nắng Hồ sơ minh họa" }).click();
  await expect(page.getByRole("switch", { name: "Tình bạn" })).toBeChecked();
  await page.getByRole("button", { name: "Mây Hồ sơ minh họa" }).click();
  await expect(
    page.getByRole("switch", { name: "Tình bạn" }),
  ).not.toBeChecked();
  await page.getByRole("tab", { name: "Thời gian sử dụng" }).click();
  await page.getByRole("slider").fill("40");
  await page.getByRole("button", { name: "Nắng Hồ sơ minh họa" }).click();
  await expect(page.getByRole("slider")).toHaveValue("30");
  await page.getByRole("button", { name: "Mây Hồ sơ minh họa" }).click();
  await expect(page.getByRole("slider")).toHaveValue("40");
});

test("contact validation and auth explicitly remain demo with no persistence", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Kiểm tra biểu mẫu" }).click();
  await expect(
    page.getByText("Vui lòng nhập tên người liên hệ."),
  ).toBeVisible();
  await page.getByLabel("Tên người liên hệ").fill("Người thử");
  await page.getByLabel("Email").fill("demo@example.com");
  await page.getByLabel("Nội dung").fill("Tôi muốn tìm hiểu truyện mẫu.");
  await page.getByRole("button", { name: "Kiểm tra biểu mẫu" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Bản demo chưa gửi liên hệ.",
  );
  await page.goto("/auth/register");
  await page.getByLabel("Email", { exact: true }).fill("demo@example.com");
  await page.getByLabel("Mật khẩu", { exact: true }).fill("only-a-demo");
  await page.getByLabel("Nhập lại mật khẩu").fill("only-a-demo");
  await page.getByRole("button", { name: "Kiểm tra đăng ký" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Bản demo chưa đăng nhập hoặc tạo tài khoản.",
  );
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await expect(page.getByLabel("Mật khẩu", { exact: true })).toHaveValue("");
});

test("mobile menu keyboard, anchor and route recovery", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Mở menu" }).click();
  await expect(page.locator("#mobile-menu a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Mở menu" })).toBeFocused();
  await page.getByRole("button", { name: "Mở menu" }).click();
  await page.locator("#mobile-menu").getByText("Cách hoạt động").click();
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await expect(page).toHaveURL(/#how-it-works/);
  await page.goto("/stories/missing");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Không tìm thấy truyện mẫu",
  );
  await page.goto("/not-a-page");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Trang này đi lạc rồi.",
  );
});

test("mock loading, empty and error support retry", async ({ page }) => {
  await page.goto("/stories?mock=slow");
  await expect(page.getByRole("status")).toContainText("Đang mở");
  await expect(page.locator(".story-card")).toHaveCount(3);
  await page.goto("/stories?mock=empty");
  await expect(
    page.getByText("Chưa tìm thấy câu chuyện phù hợp."),
  ).toBeVisible();
  await page.goto("/stories?mock=error");
  await expect(page.getByRole("alert")).toBeVisible();
  await page.evaluate(() => history.replaceState(null, "", "/stories"));
  await page.getByRole("button", { name: "Thử lại" }).click();
  await expect(page.locator(".story-card")).toHaveCount(3);
});

test("all public destinations render one h1 and pass automated accessibility checks", async ({
  page,
}) => {
  test.setTimeout(120000);
  for (const route of [
    "/",
    "/stories",
    "/stories/hat-mam-nho",
    "/stories/meo-tim-ngoi-sao",
    "/pricing",
    "/faq",
    "/contact",
    "/for-parents",
    "/about",
    "/privacy",
    "/terms",
    "/child-safety",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".loading-state")).toHaveCount(0);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
      route,
    ).toEqual([]);
  }
});
