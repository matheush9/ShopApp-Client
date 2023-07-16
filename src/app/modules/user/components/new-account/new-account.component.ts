import { Component } from '@angular/core';

import { User } from '../../interfaces/user-interface';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

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
  registerErrorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService
      .register(this.user, this.storeDescription)
      .pipe(
        catchError((error) => {
          if (error.error == 'Email already in use') {
            this.registerErrorMessage = error.error;
          } else console.error(error);
          throw error;
        })
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
