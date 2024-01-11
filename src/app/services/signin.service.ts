import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:7000';
  sideBar: any = new Subject();
  addCate: any = new Subject();
  categories: any = new Subject()
  constructor(private http: HttpClient) {}
  async signUp(body: any) {
    const response = await this.http
      .post(`${this.url}/user/signup`, body)
      .toPromise();
    return response;
  }
  async signIn(body: any) {
    const response = await this.http
      .post(`${this.url}/user/signin`, body)
      .toPromise();
    return response;
  }
  async sendMail(body: any) {
    const response = await this.http
      .post(`${this.url}/user/sendmail`, body)
      .toPromise();
    return response;
  }
  async updatePassword(body: any) {
    const response = await this.http
      .patch(`${this.url}/user/changePassword`, body)
      .toPromise();
    return response;
  }
  async addProduct(body: any) {
    const response = await lastValueFrom(this.http.post(`${this.url}/product/addProduct`, body))
    return response
  }
  async getProducts() {
    const response = await lastValueFrom(this.http.get(`${this.url}/product/getProducts`))
    return response
  }
  async getProduct(id: string) {
    const response = await lastValueFrom(this.http.get(`${this.url}/product/getProduct/${id}`))
    return response
  }
  async updateProduct(id: string, body: any) {
    const response = await lastValueFrom(this.http.patch(`${this.url}/product/updateProduct/${id}`, body))
    return response
  }
  async removeProduct(id: string) {
    const response = await lastValueFrom(this.http.delete(`${this.url}/product/removeProduct/${id}`))
    return response
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
