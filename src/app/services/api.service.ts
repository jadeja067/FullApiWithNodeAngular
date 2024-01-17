import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:7000';
  sideBar: Subject<any> = new Subject();
  addCate: Subject<any> = new Subject();
  categories: Subject<any> = new Subject();
  headers!: any;
  res!: any;
  constructor(private http: HttpClient, private router:Router) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('auth')}`,
    });
  }
  check(){    
    if(this.res.status == 401) {
      localStorage.clear()
      this.router.navigate(['/sign'])
    }
  }
  async signUp(body: any) {
    this.res = await lastValueFrom(
      this.http.post(`${this.url}/user/signup`, body)
    );

    return this.res;
  }
  async signIn(body: any) {
    this.res = await lastValueFrom(
      this.http.post(`${this.url}/user/signin`, body)
    );
    return this.res;
  }
  async sendMail(body: any) {
    this.res = await lastValueFrom(
      this.http.post(`${this.url}/user/sendmail`, body)
    );
    return this.res;
  }
  async updatePassword(body: any) {
    this.res = await lastValueFrom(
      this.http.patch(`${this.url}/user/changePassword`, body)
    );
    return this.res;
  }
  async addProduct(body: any) {
    this.res = await lastValueFrom(
      this.http.post(`${this.url}/product/addProduct`, body, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        }),
      })
    );
    this.check()
    return this.res;
  }
  async getAllProducts() {
    this.res = await lastValueFrom(
      this.http.get(`${this.url}/product/getProducts`, {
        headers: this.headers,
      })
    );
    this.check()
    return this.res;
  }
  async getProducts() {
    try {
      this.res = await lastValueFrom(
        this.http.get(
          `${this.url}/product/getProducts/${localStorage.getItem('user')}`,
          { headers: this.headers }
        )
      );
    } catch (error) {
      this.res=error
    }
    this.check()
    return this.res;
  }
  async getProduct(id: string) {
    this.res = await lastValueFrom(
      this.http.get(`${this.url}/product/getProduct/${id}`, {
        headers: this.headers,
      })
    );
    this.check()
    return this.res;
  }
  async updateProduct(id: string, body: any) {
    this.res = await lastValueFrom(
      this.http.patch(`${this.url}/product/updateProduct/${id}`, body, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        }),
      })
    );
    this.check()
    return this.res;
  }
  async removeProduct(id: string) {
    this.res = await lastValueFrom(
      this.http.delete(`${this.url}/product/removeProduct/${id}`, {
        headers: this.headers,
      })
    );
    this.check()
    return this.res;
  }
  async addCategory(body: any) {
    this.res = await lastValueFrom(
      this.http.post(`${this.url}/category/add-category`, body, {
        headers: this.headers,
      })
    );
    this.check()
    this.getCategories();
    return this.res;
  }
  getCategoy(name: string) {
    this.res = this.http.get(`${this.url}/category/categories/name/${name}`, {
      headers: this.headers,
    });
    this.check()
    return this.res;
  }
  async getCategories() {
    this.categories.next(
      await lastValueFrom(
        this.http.get(`${this.url}/category/categories`, {
          headers: this.headers,
        })
      )
    );
  }
  async getSubCategories(id: string) {
    this.res = await lastValueFrom(
      this.http.get(`${this.url}/category/sub-categories/${id}`, {
        headers: this.headers,
      })
    );
    this.check()
    return this.res;
  }
  async deleteCategory(id: string) {
    this.res = await lastValueFrom(
      this.http.delete(`${this.url}/category/delete/${id}`, {
        headers: this.headers,
      })
    );
    this.check()
    return this.res;
  }
  async deleteSubCategory(id: string) {
    this.res = await lastValueFrom(
      this.http.delete(`${this.url}/category/sub/delete/${id}`, {
        headers: this.headers,
      })
    );
    this.check()
    return this.res;
  }
}
