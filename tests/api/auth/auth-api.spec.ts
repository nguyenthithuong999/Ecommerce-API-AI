import { test, expect } from '@fixtures';
import { TestDataGenerator } from '@utils/test-data.generator';

test.describe('Authentication & User Account API Suite', () => {
  const testUser = TestDataGenerator.generateUniqueUser('api_user');

  test.beforeAll(async ({ request, conf }) => {
    // Ensure account exists for positive login & detail tests using baseUrl from conf.global
    const createRes = await request.post(`${conf.global.apiBaseUrl}/createAccount`, {
      form: {
        name: testUser.name,
        email: testUser.email,
        password: testUser.password,
        title: testUser.title || conf.global.defaultUser.title,
        birth_date: testUser.birth_date || '10',
        birth_month: testUser.birth_month || '5',
        birth_year: testUser.birth_year || '1995',
        firstname: testUser.firstname,
        lastname: testUser.lastname,
        company: testUser.company || '',
        address1: testUser.address1,
        address2: testUser.address2 || '',
        country: testUser.country,
        zipcode: testUser.zipcode,
        state: testUser.state,
        city: testUser.city,
        mobile_number: testUser.mobile_number,
      },
    });
    const createBody = await createRes.json();
    expect(createBody.responseCode).toBe(201);
  });

  test.afterAll(async ({ request, conf }) => {
    // Cleanup created test user
    await request.delete(`${conf.global.apiBaseUrl}/deleteAccount`, {
      form: {
        email: testUser.email,
        password: testUser.password,
      },
    });
  });

  test('POST /verifyLogin with valid details - should return 200 User exists!', {
    tag: ['@TC_API_06', '@MOD_AUTH_API', '@smoke'],
  }, async ({ authApi, conf }) => {
    const response = await authApi.verifyLogin({
      email: testUser.email,
      password: testUser.password,
    });
    const body = await response.json();
    expect(body.responseCode).toBe(conf.caseData.expectedCode);
    expect(body.message).toBe(conf.caseData.expectedMessage);
  });

  test('POST /verifyLogin without email - should return 400 Bad request', {
    tag: ['@TC_API_07', '@MOD_AUTH_API', '@regression'],
  }, async ({ authApi, conf }) => {
    const response = await authApi.verifyLogin({
      password: conf.caseData.passwordOnly,
    });
    const body = await response.json();
    expect(body.responseCode).toBe(conf.caseData.expectedCode);
    expect(body.message).toContain(conf.caseData.expectedMessage);
  });

  test('POST /verifyLogin with invalid details - should return 404 User not found!', {
    tag: ['@TC_API_08', '@MOD_AUTH_API', '@regression'],
  }, async ({ authApi, conf }) => {
    const response = await authApi.verifyLogin({
      email: conf.caseData.invalidEmail,
      password: conf.caseData.wrongPassword,
    });
    const body = await response.json();
    expect(body.responseCode).toBe(conf.caseData.expectedCode);
    expect(body.message).toBe(conf.caseData.expectedMessage);
  });

  test('POST /createAccount and DELETE /deleteAccount - lifecycle verification', {
    tag: ['@TC_API_09', '@MOD_AUTH_API', '@regression'],
  }, async ({ authApi, conf }) => {
    const ephemeralUser = TestDataGenerator.generateUniqueUser('lifecycle');
    
    // Create
    const createRes = await authApi.createAccount(ephemeralUser);
    const createBody = await createRes.json();
    expect(createBody.responseCode).toBe(conf.caseData.expectedCreateCode);
    expect(createBody.message).toBe(conf.caseData.expectedCreateMessage);

    // Delete
    const deleteRes = await authApi.deleteAccount({
      email: ephemeralUser.email,
      password: ephemeralUser.password,
    });
    const deleteBody = await deleteRes.json();
    expect(deleteBody.responseCode).toBe(conf.caseData.expectedDeleteCode);
    expect(deleteBody.message).toBe(conf.caseData.expectedDeleteMessage);
  });

  test('GET /getUserDetailByEmail - should return user details', {
    tag: ['@TC_API_10', '@MOD_AUTH_API', '@smoke'],
  }, async ({ authApi, conf }) => {
    const response = await authApi.getUserDetailByEmail(testUser.email);
    const body = await response.json();
    expect(body.responseCode).toBe(conf.caseData.expectedCode);
    expect(body.user).toBeDefined();
    expect(body.user.email).toBe(testUser.email);
  });
});
