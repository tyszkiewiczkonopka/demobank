import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test(
    'successful login with correct credentials',
    {
      tag: ['@login', '@smoke'],
      annotation: {
        type: 'Happy path',
        description: 'Basic happy path test for login',
      },
    },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const userPassword = loginData.userPassword;
      const expectedUserName = 'Jan Demobankowy';

      // Act
      await loginPage.login(userId, userPassword);

      // Assert
      await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
    },
  );

  test(
    'unsuccessful login with too short username',
    { tag: '@login' },
    async ({ page }) => {
      // Arrange
      const incorrectUserId = 'tester';
      const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

      // Act
      await page.getByTestId('login-input').fill(incorrectUserId);
      await page.getByTestId('password-input').click();

      // Assert
      await expect(page.getByTestId('error-login-id')).toHaveText(
        expectedErrorMessage,
      );
    },
  );

  test(
    'unsuccessful login with too short password',
    { tag: '@login' },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const incorrectPassword = '1234';
      const expectedErrorMessage = 'hasło ma min. 8 znaków';

      // Act
      await page.getByTestId('login-input').fill(userId);
      await page.getByTestId('password-input').fill(incorrectPassword);
      await page.getByTestId('password-input').blur();

      // Assert
      await expect(page.getByTestId('error-login-password')).toHaveText(
        expectedErrorMessage,
      );
    },
  );
});
