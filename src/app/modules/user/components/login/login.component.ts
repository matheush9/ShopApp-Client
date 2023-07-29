import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { catchError } from 'rxjs';

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

  submitErrorMessage = '';
  formSubmitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      this.authService
        .login(this.user)
        .pipe(
          catchError((error) => {
            if (error.status == 401) {
              this.submitErrorMessage = 'Invalid login/email or password';
            } else console.error(error);
            throw error;
          })
        )
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }
}
