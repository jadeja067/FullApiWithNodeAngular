import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubCatListComponent } from './sub-cat-list.component';

const routes: Routes = [
  {path: '', component:SubCatListComponent}
]

@NgModule({
  declarations: [SubCatListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]

})
export class SubCatListModule { }
