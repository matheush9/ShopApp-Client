import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginBaseComponent } from './auth/components/login-base/login-base.component';
import { LoginComponent } from './auth/components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { NewAccountComponent } from './auth/components/new-account/new-account.component';
import { AccountInfoComponent } from './components/account-info/account-info/account-info.component';
import { CartComponent } from './components/cart/cart.component';

import { SharedModule } from '../shared/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoginBaseComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NewAccountComponent,
    AccountInfoComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    SharedModule,
    MatDialogModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    AccountInfoComponent,
    CartComponent
  ],
})
export class CoreModule {}
