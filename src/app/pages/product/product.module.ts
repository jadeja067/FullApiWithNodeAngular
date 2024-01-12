import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./add-product/add-product.module').then(mod => mod.AddProductModule)},
  {path: ':id', loadChildren: () => import('./product-details/product-details.module').then(mod => mod.ProductDetailsModule)},
  {path: 'update/:id', loadChildren: () => import('./product-update/product-update.module').then(mod => mod.ProductUpdateModule)}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
