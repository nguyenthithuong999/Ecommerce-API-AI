import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/e2e/base.page';
import { RegisterUserData } from '@utils/test-data.generator';

export class AuthPage extends BasePage {
  // Login Form
  readonly loginHeader: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  // Signup Form
  readonly signupHeader: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMessage: Locator;

  // Account Information Form
  readonly enterAccountInfoHeader: Locator;
  readonly titleMrRadio: Locator;
  readonly titleMrsRadio: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;

  // Address Information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;

  // Success / Continue
  readonly accountCreatedHeader: Locator;
  readonly continueButton: Locator;
  readonly accountDeletedHeader: Locator;

  constructor(page: Page) {
    super(page);

    this.loginHeader = page.locator('.login-form h2', { hasText: 'Login to your account' });
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('.login-form p', { hasText: /your email or password is incorrect/i });

    this.signupHeader = page.locator('.signup-form h2', { hasText: 'New User Signup!' });
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.signupErrorMessage = page.locator('.signup-form p', { hasText: /email address already exist/i });

    this.enterAccountInfoHeader = page.locator('h2.title', { hasText: 'Enter Account Information' });
    this.titleMrRadio = page.locator('#id_gender1');
    this.titleMrsRadio = page.locator('#id_gender2');
    this.passwordInput = page.locator('#password');
    this.daysSelect = page.locator('#days');
    this.monthsSelect = page.locator('#months');
    this.yearsSelect = page.locator('#years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOffersCheckbox = page.locator('#optin');

    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');

    this.accountCreatedHeader = page.locator('h2[data-qa="account-created"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
    this.accountDeletedHeader = page.locator('h2[data-qa="account-deleted"]');
  }

  async navigate(): Promise<void> {
    await this.goto('/login');
  }

  async verifyLoginPageVisible(): Promise<void> {
    await expect(this.loginHeader).toBeVisible();
    await expect(this.signupHeader).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginError(): Promise<void> {
    await expect(this.loginErrorMessage).toBeVisible();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async verifySignupEmailExistsError(): Promise<void> {
    await expect(this.signupErrorMessage).toBeVisible();
  }

  async fillAccountInformation(user: RegisterUserData): Promise<void> {
    await expect(this.enterAccountInfoHeader).toBeVisible();

    if (user.title === 'Mrs') {
      await this.titleMrsRadio.check();
    } else {
      await this.titleMrRadio.check();
    }

    await this.passwordInput.fill(user.password);
    if (user.birth_date) await this.daysSelect.selectOption(user.birth_date);
    if (user.birth_month) await this.monthsSelect.selectOption(user.birth_month);
    if (user.birth_year) await this.yearsSelect.selectOption(user.birth_year);

    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();

    await this.firstNameInput.fill(user.firstname);
    await this.lastNameInput.fill(user.lastname);
    if (user.company) await this.companyInput.fill(user.company);
    await this.address1Input.fill(user.address1);
    if (user.address2) await this.address2Input.fill(user.address2);
    await this.countrySelect.selectOption(user.country);
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileNumberInput.fill(user.mobile_number);

    await this.createAccountButton.click();
  }

  async verifyAccountCreated(): Promise<void> {
    await expect(this.accountCreatedHeader).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async verifyAccountDeleted(): Promise<void> {
    await expect(this.accountDeletedHeader).toBeVisible();
  }
}
