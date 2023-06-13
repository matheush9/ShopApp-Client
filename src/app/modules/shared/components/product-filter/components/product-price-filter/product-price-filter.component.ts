import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-price-filter',
  templateUrl: './product-price-filter.component.html',
  styleUrls: ['./product-price-filter.component.scss'],
})
export class ProductPriceFilterComponent {
  valueRange: string = '';
  startValueRange: number = 0;
  endValueRange: number = 10000;

  @Output() priceRangeChange = new EventEmitter<string>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const valueRange = params.get('priceRange');
      if (valueRange) {
        this.startValueRange = Number(valueRange.split('.')[0]);
        this.endValueRange = Number(valueRange.split('.')[1]);
      }
    });
  }

  formatLabel(value: number): string {
    return '$' + value;
  }

  onStartValueChange(event: any) {
    this.startValueRange = event;
    this.emitRangeValue();
  }

  onEndValueChange(event: any) {
    this.endValueRange = event;
    this.emitRangeValue();
  }

  emitRangeValue() {
    this.valueRange = String(this.startValueRange + '.' + this.endValueRange);
    this.priceRangeChange.emit(this.valueRange);
  }
}
