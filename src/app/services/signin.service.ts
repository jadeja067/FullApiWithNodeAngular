import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:7000';
  sideBar: any = new Subject();
  imageFile = new FormData()
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
    this.imageFile.set('image', body[1])
    const response = await this.http.post(`${this.url}/product/addProduct`, [body[0], this.imageFile]).toPromise()
    return response
  }
  async getProducts() {
    const response = await this.http.get(`${this.url}/product/getProducts`).toPromise()
    return response
  }
  async getProduct(id: string) {
    const response = await this.http.get(`${this.url}/product/getProduct/${id}`).toPromise()
    return response
  }
}
