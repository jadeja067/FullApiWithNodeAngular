import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  sideBar: boolean = false
  constructor(private router: Router, private service: ApiService){}
  ngOnInit(): void {
    if(!localStorage.getItem("auth")){
      this.router.navigate(['/sign'])
    }
    this.service.sideBar.subscribe((Data: any) => this.sideBar = Data);

  }
}
