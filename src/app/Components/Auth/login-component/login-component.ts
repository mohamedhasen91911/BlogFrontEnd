import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../Services/Auth/auth-service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  loginForm : FormGroup 

  constructor
  (
    private _AuthService:AuthService,
    private _router:Router
  )
  {
    this.loginForm = new FormGroup({
      email:new FormControl('' , [Validators.required , Validators.minLength(1) , Validators.maxLength(50) , Validators.email]),
      password:new FormControl('' , [Validators.required , Validators.minLength(8) , Validators.maxLength(50)])
    })

  }

  login()
  {
    this._AuthService.login2(this.loginForm.value).subscribe({
      next:(res)=>
        {
          console.log(res.username, res.email, res.roles);
          this._router.navigate(['/blogs-list'])

        },
        error:(err:string)=>
          {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err}`,
            footer: '<a href="#">Forget Password?</a>'
          });

          }
    })

  }

  

  getEmail()
  {
    return this.loginForm.get('email')
  }
  getPassword()
  {
    return this.loginForm.get('password')
  }

}
