import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

import { StoreService } from 'src/app/modules/store/services/store.service';

@Component({
  selector: 'app-product-inventory-listing',
  templateUrl: './product-inventory-listing.component.html',
  styleUrls: ['./product-inventory-listing.component.scss'],
})
export class ProductInventoryListingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.loadQueryParams();
  }

  loadQueryParams() {
    this.route.paramMap
      .pipe(
        tap((params) => {
          if (params.keys.length == 0) {
            this.router.navigate([], {
              queryParams: { storeId: this.storeService.currentStore?.id},
            });
          }
        })
      )
      .subscribe();
  }
}
