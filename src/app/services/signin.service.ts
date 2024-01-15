import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:7000';
  sideBar: Subject<any> = new Subject();
  addCate: Subject<any> = new Subject();
  categories: Subject<any> = new Subject();
  constructor(private http: HttpClient) {}
  async signUp(body: any) {
    return await lastValueFrom(this.http
      .post(`${this.url}/user/signup`, body));
  }
  async signIn(body: any) {
    return await lastValueFrom(this.http
      .post(`${this.url}/user/signin`, body))
  }
  async sendMail(body: any) {
    return await lastValueFrom(this.http
      .post(`${this.url}/user/sendmail`, body))
  }
  async updatePassword(body: any) {
    return await lastValueFrom(this.http
      .patch(`${this.url}/user/changePassword`, body))
  }
  async addProduct(body: any) {
    return await lastValueFrom(this.http.post(`${this.url}/product/addProduct`, body))
  }
  async getAllProducts() {
    return await lastValueFrom(this.http.get(`${this.url}/product/getProducts`))
  }
  async getProducts() {
    return await lastValueFrom(this.http.get(`${this.url}/product/getProducts/${localStorage.getItem('user')}`))
  }
  async getProduct(id: string) {
    return await lastValueFrom(this.http.get(`${this.url}/product/getProduct/${id}`))
  }
  async updateProduct(id: string, body: any) {
    return await lastValueFrom(this.http.patch(`${this.url}/product/updateProduct/${id}`, body))
  }
  async removeProduct(id: string) {
    return await lastValueFrom(this.http.delete(`${this.url}/product/removeProduct/${id}`))
  }
  async addCategory(body: any) {
    const response = await lastValueFrom(this.http.post(`${this.url}/category/add-category`, body))
    this.getCategories()
    return response
  }
  getCategoy(name: string) {
    return this.http.get(`${this.url}/category/categories/name/${name}`)
  }
  async getCategories() {
    this.categories.next(await lastValueFrom(this.http.get(`${this.url}/category/categories`)))
  }
  getSubCategories(id: string) {
    return this.http.get(`${this.url}/category/sub-categories/${id}`)
  }
}
