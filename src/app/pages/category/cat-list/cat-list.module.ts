import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatListComponent } from './cat-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {path: '', component:CatListComponent}
]

@NgModule({
  declarations: [
    CatListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class CatListModule { }
