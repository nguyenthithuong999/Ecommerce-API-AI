import { test, expect } from '@fixtures';
import { TestDataGenerator } from '@utils/test-data.generator';

test.describe('Authentication UI Flow Suite', () => {
  test('Register User and Delete Account Flow', {
    tag: ['@TC_UI_01', '@MOD_AUTH_UI', '@smoke'],
  }, async ({ authPage, homePage, conf }) => {
    const newUser = TestDataGenerator.generateUniqueUser(conf.caseData.userPrefix || 'ui_reg');

    // 1. Navigate to home page
    await homePage.navigate();
    await homePage.verifyHomePageIsVisible();

    // 2. Click Signup/Login
    await homePage.clickSignupLogin();
    await authPage.verifyLoginPageVisible();

    // 3. Signup with Name and Email
    await authPage.signup(newUser.name, newUser.email);

    // 4. Fill account details and submit
    await authPage.fillAccountInformation(newUser);
    await authPage.verifyAccountCreated();

    // 5. Continue and verify logged in
    await authPage.clickContinue();
    await authPage.verifyLoggedInAs(newUser.name);

    // 6. Delete account to cleanup
    await authPage.clickDeleteAccount();
    await authPage.verifyAccountDeleted();
  });

  test('Login with valid credentials', {
    tag: ['@TC_UI_02', '@MOD_AUTH_UI', '@smoke'],
  }, async ({ authPage, conf }) => {
    const user = TestDataGenerator.generateUniqueUser(conf.caseData.userPrefix || 'ui_login');

    await authPage.navigate();
    await authPage.signup(user.name, user.email);
    await authPage.fillAccountInformation(user);
    await authPage.clickContinue();
    await authPage.clickLogout();

    // Now test valid login
    await authPage.verifyLoginPageVisible();
    await authPage.login(user.email, user.password);
    await authPage.verifyLoggedInAs(user.name);

    // Cleanup
    await authPage.clickDeleteAccount();
  });

  test('Login with incorrect email and password', {
    tag: ['@TC_UI_03', '@MOD_AUTH_UI', '@regression'],
  }, async ({ authPage, conf }) => {
    await authPage.navigate();
    await authPage.verifyLoginPageVisible();

    await authPage.login(
      conf.caseData.invalidEmail,
      conf.caseData.wrongPassword
    );
    await authPage.verifyLoginError();
  });

  test('Logout user', {
    tag: ['@TC_UI_04', '@MOD_AUTH_UI', '@smoke'],
  }, async ({ authPage, conf }) => {
    const user = TestDataGenerator.generateUniqueUser(conf.caseData.userPrefix || 'ui_logout');

    await authPage.navigate();
    await authPage.signup(user.name, user.email);
    await authPage.fillAccountInformation(user);
    await authPage.clickContinue();

    // Verify logged in then logout
    await authPage.verifyLoggedInAs(user.name);
    await authPage.clickLogout();

    // Verify redirected back to login page
    await authPage.verifyLoginPageVisible();
  });

  test('Register User with existing email - should show error', {
    tag: ['@TC_UI_05', '@MOD_AUTH_UI', '@regression'],
  }, async ({ authPage, conf }) => {
    const user = TestDataGenerator.generateUniqueUser(conf.caseData.userPrefix || 'ui_exist');

    // Create user first
    await authPage.navigate();
    await authPage.signup(user.name, user.email);
    await authPage.fillAccountInformation(user);
    await authPage.clickContinue();
    await authPage.clickLogout();

    // Try to register again with same email
    await authPage.signup(conf.caseData.duplicateSignupName, user.email);
    await authPage.verifySignupEmailExistsError();
  });
});
