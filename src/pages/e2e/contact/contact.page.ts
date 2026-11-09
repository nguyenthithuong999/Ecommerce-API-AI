import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/e2e/base.page';

export class ContactPage extends BasePage {
  readonly getInTouchHeader: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly fileUploadInput: Locator;
  readonly submitButton: Locator;
  readonly successAlert: Locator;
  readonly homeBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.getInTouchHeader = page.locator('.contact-form h2.title', { hasText: 'Get In Touch' });
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageInput = page.locator('textarea[data-qa="message"]');
    this.fileUploadInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.successAlert = page.locator('.status.alert-success');
    this.homeBtn = page.locator('a.btn.btn-success', { hasText: 'Home' });
  }

  async navigate(): Promise<void> {
    await this.goto('/contact_us');
  }

  async verifyContactPageVisible(): Promise<void> {
    await expect(this.getInTouchHeader).toBeVisible();
  }

  async fillContactForm(data: { name: string; email: string; subject: string; message: string; filePath?: string }): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);

    if (data.filePath) {
      await this.fileUploadInput.setInputFiles(data.filePath);
    }
  }

  async submitForm(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.submitButton.click();
  }

  async verifySuccessMessage(expectedText?: string): Promise<void> {
    await expect(this.successAlert).toBeVisible();
    if (expectedText) {
      await expect(this.successAlert).toContainText(expectedText);
    } else {
      await expect(this.successAlert).toContainText('Success! Your details have been submitted successfully.');
    }
  }
}
