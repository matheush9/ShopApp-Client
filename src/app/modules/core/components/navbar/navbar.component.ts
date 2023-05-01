import { Component, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  checked: boolean = false;
  cartItemsCount: number = 0;
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartItemsCount = this.cartService.getCart().length;
    this.cartService.cartUpdates().subscribe((cart) => {
      this.cartItemsCount = cart.length;
    });
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
}
