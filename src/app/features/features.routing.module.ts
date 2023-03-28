import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderListingComponent } from './components/order-listing/order-listing.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { StorePageComponent } from './components/store-page/store-page.component';

const featuresRoutes = [
  {
    path: 'order',
    component: OrderListingComponent,
    children: [
      { path: 'listing', component: OrderListingComponent },
      { path: 'detail', component: OrderDetailComponent } /* colocar o :id*/,
    ],
  },

  {
    path: 'product',
    component: ProductListingComponent,
    children: [
      { path: 'listing', component: ProductListingComponent },
      { path: 'add', component: ProductAddComponent },
      { path: 'detail', component: ProductDetailComponent } /* colocar o :id*/,
    ],
  },
  { path: 'store', component: StorePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(featuresRoutes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
