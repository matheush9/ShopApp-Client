import { Component } from '@angular/core';

import { User } from '../../interfaces/user-interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    images: [],
  };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.user).subscribe();
  }
}
