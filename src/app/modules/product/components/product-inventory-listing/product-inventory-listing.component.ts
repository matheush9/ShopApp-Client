import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';

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
    private storeService: StoreService,
    private jwtTokenService: JwtTokenService
  ) {}

  ngOnInit(): void {
    this.loadQueryParams();
  }

  loadQueryParams() {
    this.storeService
      .getStoreByUser(this.jwtTokenService.getAuthenticatedUserId())
      .subscribe(() => {
        this.router.navigate([], {
          queryParams: { storeId: this.storeService.currentStore?.id },
        });
      });
  }
}
