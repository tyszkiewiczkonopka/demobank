import { Page } from '@playwright/test';

export class PulpitPage {

  constructor(private page: Page) {}

  //TRANSFER
  transferReceiver = this.page.locator('#widget_1_transfer_receiver')
  transferAmount = this.page.locator('#widget_1_transfer_amount')
  transferTitle = this.page.locator('#widget_1_transfer_title')

  //BUTTONS
  executeButton = this.page.locator('#execute_btn');
  closeButton = this.page.getByTestId('close-button');
  executePhoneButton = this.page.locator('#execute_phone_btn');

  //TOP UP
  topUpReceiver = this.page.locator('#widget_1_topup_receiver');
  topUpAmount = this.page.locator('#widget_1_topup_amount');
  topUpAgreement = this.page.locator('#uniform-widget_1_topup_agreement span');

  message = this.page.getByTestId('message-text');
  moneyValue = this.page.locator('#money_value');

}