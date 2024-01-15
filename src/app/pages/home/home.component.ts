import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products!: any
  loading: Number[] = [0, 1, 2, 3, 4, 5]
  img: string = "https://tse3.mm.bing.net/th?id=OIP.4-LoTi4UsTIuYSqqIQ_PKwHaJ3&pid=Api&P=0&h=220"
  constructor(private service: ApiService){}

  ngOnInit(): void {
    this.getProducts()
  }
  async getProducts(){
    this.products = await this.service.getProducts()
  }
}
