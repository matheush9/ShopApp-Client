import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, map } from 'rxjs';

import { StoreService } from '../../store/services/store.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { JwtTokenService } from '../../shared/services/jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class StoreGuard implements CanActivate {
  constructor(
    private storeService: StoreService,
    private snackBarService: SnackbarService,
    private jwtTokenService: JwtTokenService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this.storeService.currentStore)
      return true;

    const userId = this.jwtTokenService.getAuthenticatedUserId();

    return this.storeService.getStoreByUser(userId).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        this.snackBarService.openSnackbar(
          'Sorry, you need to have a store to acess this route...'
        );
        return this.router.navigate(['']);  
      })
    );
  }
}
