import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/e2e/base.page';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly proceedToCheckoutBtn: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.proceedToCheckoutBtn = page.locator('.check_out');
    this.emptyCartMessage = page.locator('#empty_cart');
  }

  async navigate(): Promise<void> {
    await this.goto('/view_cart');
  }

  async verifyCartHasItems(expectedCount?: number): Promise<void> {
    if (expectedCount !== undefined) {
      await expect(this.cartItems).toHaveCount(expectedCount);
    } else {
      const count = await this.cartItems.count();
      expect(count).toBeGreaterThan(0);
    }
  }

  async removeCartItemByIndex(index: number): Promise<void> {
    const item = this.cartItems.nth(index);
    const deleteBtn = item.locator('a.cart_quantity_delete');
    await this.page.waitForLoadState('domcontentloaded');

    // Use toPass to handle any race condition where jQuery event handlers are still binding
    await expect(async () => {
      await deleteBtn.click();
      await expect(item).not.toBeVisible({ timeout: 2000 });
    }).toPass({ timeout: 10000, intervals: [500, 1000] });
  }

  async clickProceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutBtn.click();
  }
}
