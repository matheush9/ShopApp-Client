import { StoreGuard } from './../core/guards/store.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductInventoryListingComponent } from './components/product-inventory-listing/product-inventory-listing.component';

import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listing', redirectTo: 'listing/filter' },
      { path: 'listing/filter', component: ProductListingComponent },

      { path: 'inventory', redirectTo: 'inventory/filter'},
      { path: 'inventory/filter', component: ProductInventoryListingComponent, canActivate: [AuthGuard, StoreGuard]  },

      { path: 'add', component: ProductAddComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: ProductAddComponent, canActivate: [AuthGuard] },
      { path: 'detail/:id', component: ProductDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
