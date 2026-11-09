import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/e2e/base.page';

export class ProductsPage extends BasePage {
  readonly allProductsHeader: Locator;
  readonly productList: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeader: Locator;

  // Product detail
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;

  // Add to cart modal
  readonly addToCartModal: Locator;
  readonly continueShoppingBtn: Locator;
  readonly viewCartModalLink: Locator;

  constructor(page: Page) {
    super(page);

    this.allProductsHeader = page.locator('.features_items h2.title', { hasText: 'All Products' });
    this.productList = page.locator('.features_items .col-sm-4');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeader = page.locator('.features_items h2.title', { hasText: 'Searched Products' });

    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p', { hasText: 'Category:' });
    this.productPrice = page.locator('.product-information span span');
    this.productAvailability = page.locator('.product-information p', { hasText: 'Availability:' });
    this.productCondition = page.locator('.product-information p', { hasText: 'Condition:' });
    this.productBrand = page.locator('.product-information p', { hasText: 'Brand:' });

    this.addToCartModal = page.locator('#cartModal');
    this.continueShoppingBtn = page.locator('#cartModal button.close-modal');
    this.viewCartModalLink = page.locator('#cartModal a[href="/view_cart"]');
  }

  async navigate(): Promise<void> {
    await this.goto('/products');
  }

  async verifyProductsPageVisible(): Promise<void> {
    await expect(this.allProductsHeader).toBeVisible();
    await expect(this.productList.first()).toBeVisible();
  }

  async searchProduct(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  async verifySearchedProductsVisible(): Promise<void> {
    await expect(this.searchedProductsHeader).toBeVisible();
    const count = await this.productList.count();
    expect(count).toBeGreaterThan(0);
  }

  async clickFirstProductView(): Promise<void> {
    await this.page.locator('a[href^="/product_details/"]').first().click();
  }

  async verifyProductDetailsVisible(): Promise<void> {
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
  }

  async addProductToCartByIndex(index: number): Promise<void> {
    const productCard = this.productList.nth(index);
    await productCard.scrollIntoViewIfNeeded();
    await productCard.locator('.productinfo .add-to-cart').click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingBtn.click();
  }

  async clickViewCartFromModal(): Promise<void> {
    await this.viewCartModalLink.click();
  }
}
