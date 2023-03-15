import { Component } from '@angular/core';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent {
  storeAccount: boolean = false;
  customerAccount: boolean = false;

  public setStoreAccount() {
    this.storeAccount = true;    
  }

  public setCustomerAccount() {
    this.customerAccount = true;
  }
}
