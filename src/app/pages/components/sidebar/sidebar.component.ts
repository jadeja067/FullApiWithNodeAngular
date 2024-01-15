import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  categories:any

  constructor(private router: Router, private service: ApiService){
    this.service.getCategories()
    this.service.categories.subscribe((data: any) => this.categories = data);
  }
  
}
