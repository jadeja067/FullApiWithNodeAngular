import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sub-cat-list',
  templateUrl: './sub-cat-list.component.html',
  styleUrls: ['./sub-cat-list.component.css'],
})
export class SubCatListComponent implements OnInit{
  category: any
  sub_categories: any;
  constructor(private service: ApiService, private router: Router) {
    this.category = this.router.routerState.snapshot.url.split('/')[3].split('%20').join(' ')
    this.sub_categories = this.service.getSubCategories(this.category)
  }
  ngOnInit(): void {    
  }
  add(){
    this.service.addCate.next(true)
  }
}
