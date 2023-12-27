import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  signUp(body: any){
    this.http.post('http://localhost:7000/user/signup', body).subscribe((data) => data)
  }
  async signIn(body: any){
    let response = {}
    this.http.post('http://localhost:7000/user/signin', body).subscribe((data) =>  response = data)
    return await response
  }
}
