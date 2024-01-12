import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-sub-cat-list',
  templateUrl: './sub-cat-list.component.html',
  styleUrls: ['./sub-cat-list.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class SubCatListComponent implements OnDestroy, OnInit{
  Data!: string ;
  DataSubscription: any
  constructor(private service: ApiService) {
    // console.log(this.Data)
  }
  ngOnInit(): void {
    this.DataSubscription = this.service.open_sub_categories_compo.subscribe((data: any) => console.log(data))
  }
  back() {
    this.service.open_sub_categories_compo.next(null);
  }
  ngOnDestroy(): void {
    this.DataSubscription.unsubscribe()
  }
}
