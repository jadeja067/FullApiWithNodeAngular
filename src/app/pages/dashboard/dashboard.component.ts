import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  sideBar: boolean = false
  sideBarSubscription:any
  constructor(private router: Router, private service: ApiService){}
  ngOnInit(): void {
    const auth = localStorage.getItem("auth"), user = localStorage.getItem("user")
    if(!auth || !user && auth != "undifined"){
      this.router.navigate(['/sign'])
    }
    this.sideBarSubscription = this.service.sideBar.subscribe((Data: any) => this.sideBar = Data);
  }
  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe()
  }
}
