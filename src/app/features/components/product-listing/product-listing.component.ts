import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent {
  constructor(private renderer: Renderer2) {}

  onOpenMenuClick() {
    this.checked = true;
    this.renderer.addClass(document.body, 'block-scroll');
  }

  onCloseMenuClick() {
    this.renderer.removeClass(document.body, 'block-scroll');
  }
}
