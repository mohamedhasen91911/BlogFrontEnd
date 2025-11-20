import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../Services/Auth/auth-service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  isUserLogged = false
  username = ''

  constructor(private _AuthService: AuthService) {

  }


  ngOnInit(): void {
    this._AuthService.isAuthenticated().subscribe({
      next: (res) => {
        this.isUserLogged = res
        if (res == true) {
          this.username = localStorage.getItem('username') ?? ""
        }
        // console.log(this.isUserLogged)
        // console.log(this.username)
      }
    })
  }

  logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#171717ff",
      cancelButtonColor: "rgba(206, 206, 206, 1)",
      confirmButtonText: "Yes, Logout!"
    })
      .then((result) => {
        if (result.isConfirmed) {
          this._AuthService.logout()
          Swal.fire({
            title: "Logout!",
            text: "Logout succefuly.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          })
        }
      })

  }


}
