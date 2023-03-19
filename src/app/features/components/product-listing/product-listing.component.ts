import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent {
  checked: boolean = false;

  constructor(private renderer: Renderer2) {}

  onMenuClick() {
    this.checked = !this.checked;

    if (this.checked)
      this.renderer.addClass(document.body, 'block-scroll');
    else 
      this.renderer.removeClass(document.body, 'block-scroll');     
  }
}
