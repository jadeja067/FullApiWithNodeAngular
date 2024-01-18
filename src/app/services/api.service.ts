import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'https://quantumgoods-b8vf.onrender.com';
  sideBar: Subject<any> = new Subject();
  addCate: Subject<any> = new Subject();
  categories: Subject<any> = new Subject();
  res!: any;
  constructor(private http: HttpClient, private router: Router) {
  }
  check() {
    if (!this.res) {
      console.log('hii');

      // localStorage.clear()
      // this.router.navigate(['/sign'])
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
    this.check();
    return this.res;
  }
  async getAllProducts() {
    this.res = await lastValueFrom(
      this.http.get(`${this.url}/product/getProducts`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        }),
      })
    );
    this.check();
    return this.res;
  }
  async getProducts() {
    this.res = await lastValueFrom(
      this.http.get(
        `${this.url}/product/getProducts/${localStorage.getItem('user')}`,
        { headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        }) }
      )
    );
    this.check();
    return this.res;
  }
  async getProduct(id: string) {
    this.res = await lastValueFrom(
      this.http.get(`${this.url}/product/getProduct/${id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        }),
      })
    );
    this.check();
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
    this.check();
    return this.res;
  }
  async removeProduct(id: string) {
    this.res = await lastValueFrom(
      this.http.delete(`${this.url}/product/removeProduct/${id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        }),
      })
    );
    this.check();
    return this.res;
  }
  async addCategory(body: any) {
    this.res = await lastValueFrom(
      this.http.post(`${this.url}/category/add-category`, body, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        }),
      })
    );
    this.check();
    this.getCategories();
    return this.res;
  }
  getCategoy(name: string) {
    this.res = this.http.get(`${this.url}/category/categories/name/${name}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('auth')}`,
      }),
    });
    this.check();
    return this.res;
  }
  async getCategories() {
    this.categories.next(
      await lastValueFrom(
        this.http.get(`${this.url}/category/categories`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('auth')}`,
          }),
        })
      )
    );
  }
  async getSubCategories(id: string) {
    this.res = await lastValueFrom(
      this.http.get(`${this.url}/category/sub-categories/${id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        }),
      })
    );
    this.check();
    return this.res;
  }
  async deleteCategory(id: string) {
    this.res = await lastValueFrom(
      this.http.delete(`${this.url}/category/delete/${id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        }),
      })
    );
    this.check();
    return this.res;
  }
  async deleteSubCategory(id: string) {
    this.res = await lastValueFrom(
      this.http.delete(`${this.url}/category/sub/delete/${id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        }),
      })
    );
    this.check();
    return this.res;
  }
}
