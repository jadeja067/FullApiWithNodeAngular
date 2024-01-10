import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  // providers: [ApiService],
  standalone: true
})
export class AddCategoryComponent {
  cateForm: FormGroup
  constructor(private service: ApiService, private form: FormBuilder){
    this.cateForm = this.form.group({
      Category: ['', [Validators.required]],
      SubCategory: ['', [Validators.required]]
    })
  }
  close(){
    this.service.addCate.next(false)
  }
  async addCategory(){
    await this.service.addCategory(this.cateForm.value)
  }
}
