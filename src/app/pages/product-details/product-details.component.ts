import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product_id: string
  productDetails!: any
  img: string = "https://tse3.mm.bing.net/th?id=OIP.4-LoTi4UsTIuYSqqIQ_PKwHaJ3&pid=Api&P=0&h=220"

  constructor(private router: Router, private service: ApiService){
    this.product_id = router.routerState.snapshot.url.split('/')[3]
    this.getProductDetails()
  }
  async getProductDetails(){
    const response = await this.service.getProduct(this.product_id)
    this.productDetails = response    
  }
}
