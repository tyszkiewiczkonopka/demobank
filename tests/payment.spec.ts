import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    // Act
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    // wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    // go to payments page
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click();

    paymentPage = new PaymentPage(page);
  });

  test(
    'simple payment',
    {
      tag: ['@payment', '@integration'],
      annotation: {
        type: 'documentation',
        description:
          'More to find at: https://playwright.dev/docs/test-annotations#annotate-tests',
      },
    },
    async ({ page }) => {
      // Arrange
      const transferReceiver = 'Jan Jankowski';
      const transferAccount = '12 3456 7890 1234 5678 9012 34569';
      const transferAmount = '222';
      const successfulMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

      // Act
      await paymentPage.makeTransfer(
        transferReceiver,
        transferAccount,
        transferAmount,
      );

      // Assert
      await expect(paymentPage.messageText).toHaveText(successfulMessage);
    },
  );
});
