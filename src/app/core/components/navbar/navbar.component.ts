import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private renderer: Renderer2) {}

  onOpenMenuClick() {
    this.renderer.addClass(document.body, 'block-scroll');
  }
}