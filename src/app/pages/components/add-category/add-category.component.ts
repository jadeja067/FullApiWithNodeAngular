import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  imports: [CommonModule],
  // providers: [ApiService],
  standalone: true
})
export class AddCategoryComponent {
  constructor(private service: ApiService){}
  close(){
    this.service.addCate.next(false)
  }
}
