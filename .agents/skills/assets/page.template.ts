import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/e2e/base.page';

export class [FeatureName]Page extends BasePage {
  // =====================================================================
  // LOCATORS — Thứ tự ưu tiên BẮT BUỘC:
  //   1. Semantic: getByRole / getByLabel / getByPlaceholder / getByText / getByTestId
  //   2. CSS: locator('input[data-qa="..."]') hoặc locator('#id')
  //   3. XPath: locator('xpath=...') — chỉ dùng khi không có cách nào khác, kèm comment
  // =====================================================================

  // Priority 1 — Semantic locators
  readonly headingTitle: Locator;
  readonly submitButton: Locator;

  // Priority 2 — CSS với data-qa hoặc #id (khi không có label/role rõ ràng)
  readonly emailInput: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);

    // ✅ Semantic — dùng getByRole cho elements có role rõ ràng
    this.headingTitle = page.getByRole('heading', { name: /feature title/i });
    this.submitButton = page.getByRole('button', { name: /submit/i });

    // ✅ CSS data-qa — dùng khi form input không có label tường minh
    this.emailInput = page.locator('input[data-qa="email"]');

    // ✅ CSS #id — dùng khi element có id ổn định
    this.searchInput = page.locator('#search_product');

    // ✅ Semantic + CSS fallback — dùng .or() khi text có thể render khác (e.g., icon font)
    // this.homeLink = page.getByRole('link', { name: 'Home' }).or(page.locator('a[href="/"]'));

    // ⚠️ XPath — chỉ dùng khi CSS/semantic không khả thi
    // // XPath: element không có id/data-qa/class ổn định
    // this.specialElement = page.locator('xpath=//div[@class="x"]/following-sibling::span');
  }

  // Actions: Đóng gói các thao tác nghiệp vụ
  async navigate(): Promise<void> {
    await this.goto('/feature-path');
  }

  async submitForm(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }

  async verifyPageVisible(): Promise<void> {
    // Web-first assertion — KHÔNG dùng waitForTimeout()
    await expect(this.headingTitle).toBeVisible();
  }
}
