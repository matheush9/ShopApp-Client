import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product-inventory-listing',
  templateUrl: './product-inventory-listing.component.html',
  styleUrls: ['./product-inventory-listing.component.scss'],
})
export class ProductInventoryListingComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap((params) => {
          if (params.keys.length == 0) {
            this.router.navigate([], {
              queryParams: { store: 'id' }, // store id here
            });
          }
        })
      )
      .subscribe();
  }
}
