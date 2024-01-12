import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/signin.service';
import { SubCatListComponent } from '../components/sub-cat-list/sub-cat-list.component';
import { AddCategoryComponent } from '../components/add-category/add-category.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  sideBar: boolean = false;
  sideBarSubscription: any;
  subCateCompoSubscription: any;
  SubCatListComponent: any 
  addCategorySubscription: any;
  Addcate: any;
  constructor(private router: Router, private service: ApiService) {}
  ngOnInit(): void {
    const auth = localStorage.getItem('auth'),
      user = localStorage.getItem('user');
    if (!auth || (!user && auth != 'undifined')) {
      this.router.navigate(['/sign']);
    }
    this.sideBarSubscription = this.service.sideBar.subscribe(
      (Data: any) => (this.sideBar = Data)
    );
    this.subCateCompoSubscription =
      this.service.open_sub_categories_compo.subscribe((data: any) => {
          this.SubCatListComponent = data ? SubCatListComponent : null
        });
    this.addCategorySubscription = this.service.addCate.subscribe(
      (data: boolean) => {
        this.Addcate = !data ? null : AddCategoryComponent;
      }
    );
  }
  
  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
    this.subCateCompoSubscription.unsubscribe();
    this.addCategorySubscription.unsubscribe();
  }
}

