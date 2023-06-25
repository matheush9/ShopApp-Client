import { Component, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';
import { StoreService } from 'src/app/modules/store/services/store.service';
import { AuthService } from './../../../user/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  checked: boolean = false;
  cartItemsCount: number = 0;
  userHasStore: boolean = false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private cartService: CartService,
    private jwtService: JwtTokenService,
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartItemsCount = this.cartService.getCart().length;
    this.cartService.cartUpdates().subscribe((cart) => {
      this.cartItemsCount = cart.length;
    });

    this.fUserHasStore();
  }

  onMenuClick() {
    this.checked = !this.checked;

    if (this.checked) this.renderer.addClass(document.body, 'block-scroll');
    else this.renderer.removeClass(document.body, 'block-scroll');
  }

  searchProduct(value: string) {
    this.router.navigate(['/product/listing'], {
      queryParams: { query: value },
    });
  }

  userLogOut() {
    this.authService.logOut();
  }

  userIsLogged(): boolean {
    return this.authService.userIsLogged();
  }

  fUserHasStore() {
    const userId = this.jwtService.getAuthenticatedUserId();
    this.storeService.getStoreByUser(Number(userId)).subscribe((result) => {
      this.userHasStore = !!result;
    });
  }
}
