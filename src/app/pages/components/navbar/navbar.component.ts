import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/signin.service';
import { Collapse } from 'flowbite';
import type { CollapseInterface } from 'flowbite';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  sideBar:boolean = false
  constructor(private router: Router, private service: ApiService){}
  signOut(){
    localStorage.clear()    
    this.router.navigate(['/sign'])
  }
  toggle(){
    this.sideBar = !this.sideBar
    this.service.sideBar.next(this.sideBar)
  }
  navigate(ul: any){
    const menu: CollapseInterface =  new Collapse(ul)
    menu.collapse()
  }
}
