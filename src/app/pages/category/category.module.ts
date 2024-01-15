import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {path: ':category', loadChildren:() => import('./sub-cat-list/sub-cat-list.module').then((mod)=> mod.SubCatListModule)}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class CategoryModule { }
