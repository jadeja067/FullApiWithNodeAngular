import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  addProductForm: FormGroup;
  imageSrc: string =
    'https://tse3.mm.bing.net/th?id=OIP.4-LoTi4UsTIuYSqqIQ_PKwHaJ3&pid=Api&P=0&h=220';
  constructor(private form: FormBuilder, private router: Router) {
    this.addProductForm = this.form.group({
      img: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
    });
  }
  uploadImage(file_input: any) {
    file_input.click();
    file_input.onchange = (event: any) => {
      const reader = new FileReader();
      const allowedMimeType = ['image/png', 'image/jpg', 'image/jpeg'];
      const file = event.target.files[0];
      if (file && allowedMimeType.includes(event.target.files[0].type)) {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: any) => {
          this.imageSrc = e.target.result;
        };
      }
    };
  }
  addNew() {
    console.log(this.addProductForm.value);
  }
}
