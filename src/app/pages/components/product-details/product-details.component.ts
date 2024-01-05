import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  product_id!: string
  productDetails!: any
  img: string = "https://tse3.mm.bing.net/th?id=OIP.4-LoTi4UsTIuYSqqIQ_PKwHaJ3&pid=Api&P=0&h=220"

  constructor(private router: Router, private service: ApiService){
    this.product_id = router.routerState.snapshot.url.split('/')[3]
  }
  async getProductDetails(){
    const response = await this.service.getProduct(this.product_id)
    console.log(response)
    this.productDetails = response    
  }
  ngOnInit(): void {
    this.getProductDetails()
  }
}
