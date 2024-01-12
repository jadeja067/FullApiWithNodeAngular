import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class AddCategoryComponent implements OnDestroy {
  cateForm: FormGroup;
  categories: any;
  categoriesSubscription: any;
  addCustomCategoryEnabled: boolean = false;
  valuesChangeSubscription: any;
  constructor(private service: ApiService, private form: FormBuilder) {
    this.cateForm = this.form.group({
      Category: ['', [Validators.required]],
      SubCategory: this.form.array([
        new FormControl('', [Validators.required, Validators.minLength(2)]),
      ]),
    });
    this.categoriesSubscription = this.service.categories.subscribe((data: any) => this.categories = data)
  }
  close() {
    this.service.addCate.next(false);
  }
  get sub_cates() {
    return this.cateForm.get('SubCategory') as FormArray;
  }
  addMore() {
    this.sub_cates.push(
      new FormControl('', [Validators.required, Validators.minLength(2)])
    );
  }
  remove(i: number) {
    if (this.sub_cates.length > 1) this.sub_cates.removeAt(i);
  }
  
  async addCategory() {
    await this.service.addCategory(this.cateForm.value);
  }
  toggleCustomEnabled() {
    this.addCustomCategoryEnabled = !this.addCustomCategoryEnabled;
    this.cateForm.controls['Category'].reset();
  }
  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
}
