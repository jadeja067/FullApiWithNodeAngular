import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css']
})
export class CatListComponent {
  categories!:any
  categoriesSubscription!: any
  constructor(private service: ApiService){
    this.service.getCategories()
    this.categories = this.service.categories
  }
  async removeCategory(id: string){
    const res = await this.service.deleteCategory(id)
    this.categories = this.service.categories
  }
  add(){
    this.service.addCate.next(true)
  }
}
