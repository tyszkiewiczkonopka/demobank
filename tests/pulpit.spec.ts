import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    // wait for page to fully load
    await page.waitForLoadState('domcontentloaded');

    pulpitPage = new PulpitPage(page);
  });

  test(
    'quick payment with correct data ',
    { tag: ['@pulpit', '@integration'] },
    async ({ page }) => {
      // Arrange
      const receiverId = '2';
      const transferAmount = '150';
      const transferTitle = 'zwrot';
      const expectedTransferReceiver = 'Chuck Demobankowy';

      // Act

      await pulpitPage.executeQuickPayment(
        receiverId,
        transferAmount,
        transferTitle,
      );

      // Assert
      await expect(pulpitPage.messageText).toHaveText(
        `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
      );
    },
  );

  test('successful mobile top-up',{ tag: ['@pulpit', '@integration'] }, async ({ page }) => {
    // Arrange
    const topupReceiver500 = '500 xxx xxx';
    const topupAmount = '40';
    const successfulTopUpMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver500}`;

    // Act
    await pulpitPage.executeMobileTopUp(topupReceiver500, topupAmount);

    // Assert
    await expect(pulpitPage.messageText).toHaveText(successfulTopUpMessage);
  });

  test('correct balance after successful mobile top-up',{ tag: ['@pulpit', '@integration'] }, async ({
    page,
  }) => {
    // Arrange
    const topupReceiver500 = '500 xxx xxx';
    const topupAmount = '40';
    const initialBalance = await pulpitPage.moneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    // Act
    await pulpitPage.executeMobileTopUp(topupReceiver500, topupAmount);

    // Assert
    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
