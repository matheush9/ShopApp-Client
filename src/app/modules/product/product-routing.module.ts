import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listing/search/:query', component: ProductListingComponent },
      { path: 'listing/filter/:filter', component: ProductListingComponent },

      { path: 'add', component: ProductAddComponent },
      { path: 'detail/:id', component: ProductDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
