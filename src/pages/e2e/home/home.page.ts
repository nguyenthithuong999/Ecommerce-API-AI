import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/e2e/base.page';

export class HomePage extends BasePage {
  readonly sliderCarousel: Locator;
  readonly featuresItemsHeader: Locator;
  readonly subscriptionInput: Locator;
  readonly subscriptionSubmitBtn: Locator;
  readonly subscriptionSuccessAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.sliderCarousel = page.locator('#slider-carousel');
    this.featuresItemsHeader = page.locator('.features_items h2.title');
    this.subscriptionInput = page.locator('#susbscribe_email');
    this.subscriptionSubmitBtn = page.locator('#subscribe');
    this.subscriptionSuccessAlert = page.locator('#success-subscribe');
  }

  async navigate(): Promise<void> {
    await this.goto('/');
  }

  async verifyHomePageIsVisible(): Promise<void> {
    await expect(this.featuresItemsHeader).toBeVisible();
    await expect(this.sliderCarousel).toBeVisible();
  }

  async subscribeNewsletter(email: string): Promise<void> {
    await this.subscriptionInput.scrollIntoViewIfNeeded();
    await this.subscriptionInput.fill(email);
    await this.subscriptionSubmitBtn.click();
  }

  async verifySubscriptionSuccess(): Promise<void> {
    await expect(this.subscriptionSuccessAlert).toBeVisible();
  }
}
