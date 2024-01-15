import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-sub-cat-list',
  templateUrl: './sub-cat-list.component.html',
  styleUrls: ['./sub-cat-list.component.css'],
})
export class SubCatListComponent implements OnInit{
  constructor(private service: ApiService) {
  }
  ngOnInit(): void {
  }
}
