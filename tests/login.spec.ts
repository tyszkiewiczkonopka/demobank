import { test, expect } from '@playwright/test';

test('login with correct credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testerka');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('12345678');
  await page.getByTestId('login-button').click();
  await page.getByTestId('user-name').click();

  await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
});
test('login with incorrect credentials with incorrect username', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('tester');
  await page.getByTestId('password-input').click();

  await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
});