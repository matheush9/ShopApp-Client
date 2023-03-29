import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StorePageComponent } from './components/store-detail/store-page.component';

const routes: Routes = [{ path: '', component: StorePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
