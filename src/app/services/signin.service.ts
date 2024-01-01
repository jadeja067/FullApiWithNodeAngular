import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:7000';
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
}
