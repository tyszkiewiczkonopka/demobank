import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

paymentPage = this.page.getByRole('link', { name: 'płatności' });
transferReceiver = this.page.getByTestId('transfer_receiver');
formAccountTo = this.page.getByTestId('form_account_to');
formAmount = this.page.getByTestId('form_amount');
payButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
closeButton = this.page.getByTestId('close-button');
message = this.page.locator('#show_messages');
}