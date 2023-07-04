import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { StoreService } from '../../store/services/store.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class StoreGuard implements CanActivate {
  constructor(
    private storeService: StoreService,
    private snackBarService: SnackbarService
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
      
    this.snackBarService.openSnackbar('Sorry, you need to have a store to acess this route...');
    return false;
  }
}
