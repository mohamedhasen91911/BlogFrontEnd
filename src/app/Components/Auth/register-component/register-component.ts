import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth-service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {

  registerForm : FormGroup

  constructor
  (
    private _router:Router,
    private _AuthService:AuthService,

  )
  {
    this.registerForm = new FormGroup({
      firstname : new FormControl( '' , [Validators.required , Validators.minLength(3) , Validators.maxLength(50)] ),
      lastname: new FormControl('', [Validators.required , Validators.minLength(3) , Validators.maxLength(50)]),
      username : new FormControl('' , [Validators.required , Validators.minLength(3) , Validators.maxLength(50)]),
      email : new FormControl('' , [Validators.required , Validators.email ,  Validators.minLength(3) , Validators.maxLength(50)]),
      password : new FormControl('' , [Validators.required , Validators.minLength(8) , Validators.maxLength(50)])
    })
  }

  getFirstName (){return this.registerForm.get('firstname')}
  getLastName(){return this.registerForm.get('lastname')}
  getuserName(){return this.registerForm.get('username')}
  getEmail(){return this.registerForm.get('email')}
  getPassword(){return this.registerForm.get('password')}

  register()
    {
      this._AuthService.register(this.registerForm.value).subscribe({
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
              text: `username or email is used!`,
            });
  
            }
      })
  
    }

  goToLogin()
  {
    this._router.navigate(['/login'])
  }

}
