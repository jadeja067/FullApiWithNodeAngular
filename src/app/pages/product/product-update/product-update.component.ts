import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements AfterViewInit, OnDestroy{
  product_id: string;
  updateForm: any;
  productDetails!: any;
  imgUrl?: string;
  loading: any = false
  sub_categories: any; 
  categories: any;
  categoriesSubscription: any
  valuesChangesSubscription: any
  constructor(
    private form: FormBuilder,
    private router: Router,
    private service: ApiService
  ) {
    this.product_id = router.routerState.snapshot.url.split('/')[4];    
    this.updateForm = this.form.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: null,
    });
    this.getProductDetails();
    this.service.getCategories()
    this.categoriesSubscription = this.service.categories.subscribe((data: any) => this.categories = data)
  }
  ngAfterViewInit(): void {
    this.valuesChangesSubscription = this.updateForm.controls['category'].valueChanges.subscribe((data: any) => this.sub_categories = this.service.getSubCategories(data))
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
          this.imgUrl = e.target.result;
          this.updateForm.controls['image'].patchValue(file);
        };
      }
    };
  }
  async getProductDetails() {
    const response: any = await this.service.getProduct(this.product_id);
    this.productDetails = response;
    Object.keys(this.updateForm.value).forEach((e: any) => this.updateForm.controls[e].patchValue(response[e] || null));
    this.imgUrl = response['img'];
  }
  async update() {
    let res:any = []
    this.loading = true
    if (this.updateForm.value.image) {
      const data = new FormData();
      Object.keys(this.updateForm.value).forEach((d) =>
        data.append(d, this.updateForm.value[d])
      );
      console.log(this.updateForm.value);
      res = await this.service.updateProduct(this.product_id, data);
    } else {
      this.productDetails = this.updateForm.value
      delete this.productDetails.img;
      res = await this.service.updateProduct(this.product_id, this.productDetails);
    }
    if(res){
      this.loading = false
      alert("Product Updated Successfully.")
    } 
  }
  open(){
    this.service.addCate.next(true)
  }
  ngOnDestroy(): void {
    this.valuesChangesSubscription.unsubscribe()
    this.categoriesSubscription.unsubscribe()
  }
}
