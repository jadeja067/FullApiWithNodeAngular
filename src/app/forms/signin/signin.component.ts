import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit{
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  forgotTimeEmailForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  changePasswordForm!: FormGroup;
  isSignIn: boolean = true;
  isEmail: number = 0;
  OTP!: any
  constructor(private form: FormBuilder, private service: ApiService, private router: Router) {
    this.signInForm = this.form.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [Validators.minLength(4), Validators.maxLength(8), Validators.required],
      ],
      user: localStorage?.getItem("auth")
    });
    this.signUpForm = this.form.group({
      username: ['', [Validators.minLength(4), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [Validators.minLength(4), Validators.maxLength(8), Validators.required],
      ],
    });
    this.forgotTimeEmailForm = this.form.group({
      email: ['', [Validators.email, Validators.required]],
    });
    this.forgotPasswordForm = this.form.group({
      OTP: [
        '',
        [Validators.required, Validators.maxLength(4), Validators.minLength(4)],
      ],
    });
    this.changePasswordForm = this.form.group({
      password: [
        '',
        [Validators.required, Validators.maxLength(4), Validators.minLength(4)],
      ],
    });
  }
  ngOnInit(): void {
    if(localStorage.getItem("auth") && localStorage.getItem("user"))
      this.router.navigate(['/dashboard'])
  }
  toggleSignIn() {
    this.isSignIn = !this.isSignIn;
  }
  async signUp() {
    const response = await this.service.signUp(this.signUpForm.value);
    if(response) this.isSignIn = true
    else alert("User already exists. please sign in.")
    
  }
  async signIn() {
    const response = await this.service.signIn(this.signInForm.value);
    if(response){
      this.setAuth(response)
      this.router.navigate(['/dashboard'])
    }
  }
  setAuth(res: any){
    localStorage.setItem('auth', res.token)
    localStorage.setItem('user', res.user)

  }
  async sendMail() {
    this.OTP = await this.service.sendMail(this.forgotTimeEmailForm.value);    
    if(this.OTP.OTP) this.toggleIsEmail();
    else alert("This E-mail address doesn't exist.")
  }

  toggleIsEmail() {
    if (this.isEmail < 3 && this.isEmail > -1) this.isEmail++;
  }

  changePassword() {    
    if(this.OTP.OTP.toString() == this.forgotPasswordForm.value.OTP){
      this.toggleIsEmail();
      console.log(this.forgotPasswordForm.value);
    }else alert("something gone wrong. Try again please...")
  }
  updatePassword() {
    this.service.updatePassword({password : this.changePasswordForm.value.password, email: this.forgotTimeEmailForm.value.email})
  }
  back() {
    this.isEmail = 0    
    this.changePasswordForm.reset()
    this.forgotPasswordForm.reset()
    this.forgotTimeEmailForm.reset()
  }
}
