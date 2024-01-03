import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private service:ApiService){}
  toggle(){
    this.service.sideBar.next(false)
  }
}
