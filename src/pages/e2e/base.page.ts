import { Page, Locator, expect } from '@playwright/test';
import globalData from '@data/global.json';

// Ưu tiên: biến môi trường CI → fallback về global.json
const BASE_URL = process.env.BASE_URL || globalData.baseUrl;

export class BasePage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;
  readonly contactUsLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loggedInAsUser: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: ' Home' }).or(page.locator('a[href="/"]'));
    this.productsLink = page.getByRole('link', { name: ' Products' }).or(page.locator('a[href="/products"]'));
    this.cartLink = page.getByRole('link', { name: ' Cart' }).or(page.locator('a[href="/view_cart"]'));
    this.signupLoginLink = page.getByRole('link', { name: ' Signup / Login' }).or(page.locator('a[href="/login"]'));
    this.contactUsLink = page.getByRole('link', { name: ' Contact us' }).or(page.locator('a[href="/contact_us"]'));
    this.logoutLink = page.getByRole('link', { name: ' Logout' }).or(page.locator('a[href="/logout"]'));
    this.deleteAccountLink = page.getByRole('link', { name: ' Delete Account' }).or(page.locator('a[href="/delete_account"]'));
    this.loggedInAsUser = page.locator('li', { hasText: 'Logged in as' });
  }

  async goto(path = ''): Promise<void> {
    const targetUrl = path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
    await this.page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  }

  async clickSignupLogin(): Promise<void> {
    await this.signupLoginLink.first().click();
  }

  async clickProducts(): Promise<void> {
    await this.productsLink.first().click();
  }

  async clickCart(): Promise<void> {
    await this.cartLink.first().click();
  }

  async clickContactUs(): Promise<void> {
    await this.contactUsLink.first().click();
  }

  async clickLogout(): Promise<void> {
    await this.logoutLink.first().click();
  }

  async clickDeleteAccount(): Promise<void> {
    await this.deleteAccountLink.first().click();
  }

  async verifyLoggedInAs(username: string): Promise<void> {
    await expect(this.loggedInAsUser).toBeVisible();
    await expect(this.loggedInAsUser).toContainText(username);
  }
}
