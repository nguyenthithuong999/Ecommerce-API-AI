import { test as base } from '@playwright/test';
import { HomePage } from '@pages/e2e/home/home.page';
import { AuthPage } from '@pages/e2e/auth/auth.page';
import { ProductsPage } from '@pages/e2e/products/products.page';
import { CartPage } from '@pages/e2e/cart/cart.page';
import { ContactPage } from '@pages/e2e/contact/contact.page';

export interface E2eFixtures {
  homePage: HomePage;
  authPage: AuthPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  contactPage: ContactPage;
}

export const test = base.extend<E2eFixtures>({
  page: async ({ page }, use) => {
    // Block common advertisement domains that cause popup overlays on automationexercise.com
    await page.route('**/*{google-analytics,googlesyndication,doubleclick,adservice,adnxs}*', (route) => {
      route.abort();
    });
    await use(page);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  authPage: async ({ page }, use) => {
    const authPage = new AuthPage(page);
    await use(authPage);
  },
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await use(contactPage);
  },
});

export { expect } from '@playwright/test';
