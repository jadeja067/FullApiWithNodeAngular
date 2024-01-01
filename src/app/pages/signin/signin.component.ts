import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signInForm!: FormGroup;
  signUpForm!: FormGroup;
  forgotTimeEmailForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  changePasswordForm!: FormGroup;
  isSignIn: boolean = true;
  isEmail: number = 0;
  constructor(private form: FormBuilder, private service: ApiService) {
    this.signInForm = form.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [Validators.minLength(4), Validators.maxLength(8), Validators.required],
      ],
    });
    this.signUpForm = form.group({
      username: ['', [Validators.minLength(4), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [Validators.minLength(4), Validators.maxLength(8), Validators.required],
      ],
    });
    this.forgotTimeEmailForm = form.group({
      email: ['', [Validators.email, Validators.required]],
    });
    this.forgotPasswordForm = form.group({
      OTP: [
        '',
        [Validators.required, Validators.maxLength(4), Validators.minLength(4)],
      ],
    });
    this.changePasswordForm = form.group({
      password: [
        '',
        [Validators.required, Validators.maxLength(4), Validators.minLength(4)],
      ],
    });
  }
  toggleSignIn() {
    this.isSignIn = !this.isSignIn;
  }
  async signUp() {
    const response = await this.service.signUp(this.signUpForm.value);
    console.log(response);
  }
  async signIn() {
    const response = await this.service.signIn(this.signInForm.value);
    console.log(response);
  }

  async sendMail() {
    this.toggleIsEmail();
    // await this.service.sendMail(this.forgotTimeEmailForm.value);
  }

  toggleIsEmail() {
    if (this.isEmail < 3 && this.isEmail > -1) this.isEmail+=1;
  }

  changePassword() {
    this.toggleIsEmail();
    console.log(this.isEmail);

    // console.log(this.forgotPasswordForm.value);
  }
  updatePassword() {
    console.log(this.isEmail);
  }
  back() {
    this.isEmail = 0
  }
}
