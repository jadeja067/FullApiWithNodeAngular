import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, OnDestroy{
  addProductForm: FormGroup;
  categories: any
  sub_categories: any
  imageSrc: string =
    'https://tse3.mm.bing.net/th?id=OIP.4-LoTi4UsTIuYSqqIQ_PKwHaJ3&pid=Api&P=0&h=220';
  loading: any = false
  categoriesSubscription: any
  valuesChangesSubscription: any
  constructor(private form: FormBuilder, private router: Router, private service: ApiService) {
    this.addProductForm = this.form.group({
      img: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      price: ['', [Validators.required]],
      user: localStorage.getItem('user'),
      image: null
    });
    this.service.getCategories()
    this.service.getCategories()
    this.categoriesSubscription = this.service.categories.subscribe((data: any) => this.categories = data);
  }
  ngOnInit(): void {
    this.valuesChangesSubscription = this.addProductForm.controls['category'].valueChanges.subscribe((data: any) => this.sub_categories = this.service.getSubCategories(data))
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
          this.addProductForm.controls['image'].patchValue(file)
        };
      }
    };
  }
  async addNew() {
    this.loading = true
    const payload = new FormData()
    const data = Object.keys(this.addProductForm.value)
    data.forEach((d) => payload.append(d, this.addProductForm.value[d]))
    const res = await this.service.addProduct(payload) 
       
    if(res){
      this.loading = false
      alert("New Product Is Added.")
      this.addProductForm.reset()
      this.imageSrc = 'https://tse3.mm.bing.net/th?id=OIP.4-LoTi4UsTIuYSqqIQ_PKwHaJ3&pid=Api&P=0&h=220'
    } 
  }
  open(){
    this.service.addCate.next(true)
  }
  ngOnDestroy(): void {
      this.valuesChangesSubscription?.unsubscribe()
      this.categoriesSubscription?.unsubscribe()
  }
}
