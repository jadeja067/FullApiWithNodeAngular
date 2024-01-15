import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product.component';
import { AddCategoryComponent } from "../../category/add-category/add-category.component";

const routes: Routes = [{ path: '', component: AddProductComponent }];

@NgModule({
    declarations: [AddProductComponent],
    exports: [RouterModule],
    imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, AddCategoryComponent, AddCategoryComponent]
})
export class AddProductModule {
  
}
