import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userName = loginData.userId;
    const userPassword = loginData.userPassword;

    // login
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.loginInput.fill(userName);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // wait for page to fully load
    await page.waitForLoadState('domcontentloaded');
  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'zwrot';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    // Act
    const pulpitPage = new PulpitPage(page);
    const paymentPage = new PaymentPage(page);

    await pulpitPage.transferReceiver.selectOption(receiverId);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);

    await pulpitPage.executeButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(paymentPage.message).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupReceiver500 = '500 xxx xxx';
    const topupAmount = '40';
    const successfulTopUpMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver500}`;

    // Act
    const pulpitPage = new PulpitPage(page);

    await pulpitPage.topUpReceiver.selectOption(topupReceiver500);
    await pulpitPage.topUpAmount.fill(topupAmount);
    await pulpitPage.topUpAgreement.click();
    await pulpitPage.executePhoneButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.message).toHaveText(successfulTopUpMessage,);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupReceiver500 = '500 xxx xxx';
    const topupAmount = '40';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    // Act
    const pulpitPage = new PulpitPage(page);

    await pulpitPage.topUpReceiver.selectOption(topupReceiver500);
    await pulpitPage.topUpAmount.fill(topupAmount);
    await pulpitPage.topUpAgreement.click();
    await pulpitPage.executePhoneButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
