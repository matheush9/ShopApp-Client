import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss'],
})
export class QuantitySelectorComponent {
  @Output() quantityChange = new EventEmitter<number>();
  @Input() quantity: number = 1;

  constructor() {}

  ngOnInit() {
    this.quantityChange.subscribe(
      (quantity) => (this.quantity = quantity)
    );
  }

  handleQuantity(value: number) {
    const newQuantity = this.quantity + value;
    if (newQuantity >= 1) this.quantityChange.emit(newQuantity);
  }

  emitQuantityChange() {
    this.quantityChange.emit(this.quantity);
  }
}
