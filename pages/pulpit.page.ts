import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  //TRANSFER
  transferReceiverInput = this.page.locator('#widget_1_transfer_receiver');
  transferAmountInput = this.page.locator('#widget_1_transfer_amount');
  transferTitleInput = this.page.locator('#widget_1_transfer_title');

  //BUTTONS
  transferButton = this.page.locator('#execute_btn');
  actionCloseButton = this.page.getByTestId('close-button');

  //TOP UP
  topupReceiverInput = this.page.locator('#widget_1_topup_receiver');
  topupAmountInput = this.page.locator('#widget_1_topup_amount');
  topupAgreementCheckbox = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );
  topupExecuteButton = this.page.locator('#execute_phone_btn');

  messageText = this.page.getByTestId('message-text');
  moneyValueText = this.page.locator('#money_value');

  async executeQuickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiverInput.selectOption(receiverId);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferTitleInput.fill(transferTitle);

    await this.transferButton.click();
    await this.actionCloseButton.click();
  }

  async executeMobileTopUp(
    topupReceiver500: string,
    topupAmount: string,
  ): Promise<void> {
    await this.topupReceiverInput.selectOption(topupReceiver500);
    await this.topupAmountInput.fill(topupAmount);
    await this.topupAgreementCheckbox.click();

    await this.topupExecuteButton.click();
    await this.actionCloseButton.click();
  }
}
