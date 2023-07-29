import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

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
  submitErrorMessage = '';
  formSubmitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  register(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
    this.authService
      .register(this.user, this.storeDescription)
      .pipe(
        catchError((error) => {
          if (error.error == 'Email already in use') {
            this.submitErrorMessage = error.error;
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
