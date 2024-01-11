import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class AddCategoryComponent {
  cateForm: FormGroup
  constructor(private service: ApiService, private form: FormBuilder){
    this.cateForm = this.form.group({
      Category: ['', [Validators.required]],
      SubCategory: this.form.array([
        new FormControl('', [Validators.required, Validators.minLength(2)])
      ])
    })
  }
  close(){
    this.service.addCate.next(false)
  }
  get sub_cates(){
    return this.cateForm.get('SubCategory') as FormArray
  }
  addMore(){    
    this.sub_cates.push(new FormControl('', [Validators.required, Validators.minLength(2)]))
  } 
  remove(i: number){
    if(this.sub_cates.length > 1) this.sub_cates.removeAt(i)    
  }
  async addCategory(){
    console.log(this.cateForm.value);
    // await this.service.addCategory(this.cateForm.value)
  }
}
