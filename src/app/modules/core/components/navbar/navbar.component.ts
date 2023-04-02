import { Component, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  checked: boolean = false;
  query: string = '';

  constructor(private renderer: Renderer2, private router: Router) {}

  onMenuClick() {
    this.checked = !this.checked;

    if (this.checked) this.renderer.addClass(document.body, 'block-scroll');
    else this.renderer.removeClass(document.body, 'block-scroll');
  }

  setQuery(value: string) {
    this.query = value;
    this.searchProduct();
  }

  searchProduct() {
    this.router.navigate(['product/listing/' + this.query]);
  }
}
