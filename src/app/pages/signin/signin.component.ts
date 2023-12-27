import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signInForm!:FormGroup
  signUpForm!:FormGroup
  isSignIn: boolean = true
  constructor(private form: FormBuilder, private service: ApiService) {
    this.signInForm = form.group({
      email: ['',[Validators.email, Validators.required]],
      password: ['',[Validators.minLength(4), Validators.maxLength(8), Validators.required]]
    })
    this.signUpForm = form.group({
      username: ['',[Validators.minLength(4), Validators.required]],
      email: ['',[Validators.email, Validators.required]],
      password: ['',[Validators.minLength(4), Validators.maxLength(8), Validators.required]]
    })
  }
  toggleSignIn(){
    this.isSignIn = !this.isSignIn
  }
  signUp(){
    const response = this.service.signUp(this.signUpForm.value)
    console.log(response)
  }
  async signIn(){
    const response = await this.service.signIn(this.signInForm.value)
    console.log(response)

  }
}
