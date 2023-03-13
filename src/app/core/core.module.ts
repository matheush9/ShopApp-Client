import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginBaseComponent } from './auth/components/login-base/login-base.component';
import { LoginComponent } from './auth/components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { SharedModule } from '../shared/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoginBaseComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    SharedModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoginComponent
  ],
})
export class CoreModule {}
