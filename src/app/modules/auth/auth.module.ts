import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginBaseComponent } from './components/login-base/login-base.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AccountInfoComponent } from './components/account-info/account-info/account-info.component';
import { NewAccountComponent } from './components/new-account/new-account.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    LoginBaseComponent,
    LoginComponent,
    ForgotPasswordComponent,
    AccountInfoComponent,
    NewAccountComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
  ],
})
export class AuthModule {}
