import { Component } from '@angular/core';

import { User } from '../../interfaces/user-interface';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    images: [],
  };

  accountType: string = 'customer';
  storeDescription: string = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.user, this.storeDescription);
  }
}