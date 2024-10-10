import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    // Act
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    // go to payments page
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click();
    
    //await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Jan Jankowski';
    const transferAccount = '12 3456 7890 1234 5678 9012 34569';
    const transferAmount = '222';
    const successfulMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    const paymentPage = new PaymentPage(page);
    await paymentPage.transferReceiverInput.fill(transferReceiver);
    await paymentPage.transferToInput.fill(transferAccount);
    await paymentPage.transferAmountInput.fill(transferAmount);

    await paymentPage.transferButton.click();
    await paymentPage.actionCloseButton.click();

    // Assert
    await expect(paymentPage.messageText).toHaveText(successfulMessage);
  });
});
