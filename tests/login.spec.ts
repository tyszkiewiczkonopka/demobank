import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const userName = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    //Arrange
    const incorrectUserName = 'tester';
    const loginMinLengthErrorMessage = 'identyfikator ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(incorrectUserName);
    await page.getByTestId('password-input').click();

    // wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      loginMinLengthErrorMessage,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const userName = loginData.userId;
    const invalidPassword = '12345';
    const passwordMinLengthErrorMessage = 'hasło ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').fill(invalidPassword);
    await page.getByTestId('password-input').blur();

    // wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      passwordMinLengthErrorMessage,
    );
  });
});
