import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  toggleSideBarBool: boolean = false
  constructor(private router: Router, private service: ApiService){}
  signOut(){
    localStorage.removeItem("auth")
    this.router.navigate(['/sign'])
  }
  toggleSideBar(){
    this.toggleSideBarBool = !this.toggleSideBarBool
    this.service.sideBar.next(this.toggleSideBarBool)
  }
}
