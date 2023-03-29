import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountInfoComponent } from './components/account-info/account-info/account-info.component';

const routes: Routes = [
  { path: 'account-info', component: AccountInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
