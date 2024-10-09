import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { only } from 'node:test';

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
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userName);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

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
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserName);
    await loginPage.passwordInput.click();

    // wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    // Assert
    await expect(loginPage.loginError).toHaveText(loginMinLengthErrorMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const userName = loginData.userId;
    const invalidPassword = '12345';
    const passwordMinLengthErrorMessage = 'hasło ma min. 8 znaków';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userName);
    await loginPage.passwordInput.fill(invalidPassword);
    await loginPage.passwordInput.blur();

    // wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    // Assert
    await expect(loginPage.passwordError).toHaveText(
      passwordMinLengthErrorMessage,
    );
  });
});
