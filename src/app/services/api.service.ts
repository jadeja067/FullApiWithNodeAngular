import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:7000';
  sideBar: Subject<any> = new Subject();
  addCate: Subject<any> = new Subject();
  categories: Subject<any> = new Subject();
  headers!: any
  res!: any
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Authorization': `Bearer ${localStorage.getItem('auth')}`
    })
  }
  async signUp(body: any) {
    return await lastValueFrom(this.http
      .post(`${this.url}/user/signup`, body, {headers: this.headers}));
  }
  async signIn(body: any) {
    return await lastValueFrom(this.http
      .post(`${this.url}/user/signin`, body, {headers: this.headers}))
  }
  async sendMail(body: any) {
    return await lastValueFrom(this.http
      .post(`${this.url}/user/sendmail`, body, {headers: this.headers}))
  }
  async updatePassword(body: any) {
    return await lastValueFrom(this.http
      .patch(`${this.url}/user/changePassword`, body, {headers: this.headers}))
  }
  async addProduct(body: any) {
    return await lastValueFrom(this.http.post(`${this.url}/product/addProduct`, body, {headers: this.headers}))
  }
  async getAllProducts() {
    return await lastValueFrom(this.http.get(`${this.url}/product/getProducts`, {headers: this.headers}))
  }
  async getProducts() {
    return await lastValueFrom(this.http.get(`${this.url}/product/getProducts/${localStorage.getItem('user')}`, {headers: this.headers}))
  }
  async getProduct(id: string) {
    return await lastValueFrom(this.http.get(`${this.url}/product/getProduct/${id}`, {headers: this.headers}))
  }
  async updateProduct(id: string, body: any) {
    return await lastValueFrom(this.http.patch(`${this.url}/product/updateProduct/${id}`, body, {headers: this.headers}))
  }
  async removeProduct(id: string) {
    return await lastValueFrom(this.http.delete(`${this.url}/product/removeProduct/${id}`, {headers: this.headers}))
  }
  async addCategory(body: any) {
    const response = await lastValueFrom(this.http.post(`${this.url}/category/add-category`, body, {headers: this.headers}))
    this.getCategories()
    return response
  }
  getCategoy(name: string) {
    return this.http.get(`${this.url}/category/categories/name/${name}`, {headers: this.headers})
  }
  async getCategories() {
    this.categories.next(await lastValueFrom(this.http.get(`${this.url}/category/categories`, {headers: this.headers})))
  }
  async getSubCategories(id: string) {
    return await lastValueFrom(this.http.get(`${this.url}/category/sub-categories/${id}`, {headers: this.headers}))
  }
  async deleteCategory(id: string){
    return await lastValueFrom(this.http.delete(`${this.url}/category/delete/${id}`, {headers: this.headers}))
  }
  async deleteSubCategory(id: string){
    return await lastValueFrom(this.http.delete(`${this.url}/category/sub/delete/${id}`, {headers: this.headers}))
  }
}
