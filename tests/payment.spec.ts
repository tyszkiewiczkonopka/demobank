import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    
    // login
    await page.goto('/');
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    // go to payments page
    const paymentPage = new PaymentPage(page);
    await paymentPage.paymentPage.click();
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Jan Jankowski';
    const transferAccount = '12 3456 7890 1234 5678 9012 34569';
    const transferAmount = '222';
    const successfulMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    const paymentPage = new PaymentPage(page);
    await paymentPage.transferReceiver.fill(transferReceiver);
    await paymentPage.formAccountTo.fill(transferAccount);
    await paymentPage.formAmount.fill(transferAmount);
    await paymentPage.payButton.click();
    await paymentPage.closeButton.click();

    // Assert
    await expect(paymentPage.message).toHaveText(successfulMessage);
  });
});
