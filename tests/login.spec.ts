import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  test('successful login with correct credentials', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userName = 'testerka';
    const userPassword = '12345678';
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    //Arrange
    const userName = 'tester';
    const url = 'https://demo-bank.vercel.app/';
    const loginMinLengthErrorMessage = 'identyfikator ma min. 8 znaków';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      loginMinLengthErrorMessage,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userName = 'testerka';
    const invalidPassword = '12345';
    const passwordMinLengthErrorMessage = 'hasło ma min. 8 znaków';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').fill(invalidPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      passwordMinLengthErrorMessage,
    );
  });
});
