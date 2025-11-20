import { Injectable } from '@angular/core';
import { LoginAuthDTO } from '../../Models/Auth/login-auth-dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { AuthResponseDTO } from '../../Models/Auth/auth-response-dto';
import { RegisterAuthDTO } from '../../Models/Auth/register-auth-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isUserAuthenticated =new BehaviorSubject<boolean>(false)

  constructor(
    private _httpClient:HttpClient
  )
  {
       const token = localStorage.getItem('token');
    this.isUserAuthenticated.next(!!token);
    
  }
  
  login(user:LoginAuthDTO):Observable<string>
  {

    let token = this._httpClient.post<string>(`${environment.baseURL}/Auth/token` , user)
    return token

  }

  login2(user: LoginAuthDTO): Observable<AuthResponseDTO> {
    return this._httpClient
      .post<AuthResponseDTO>(`${environment.baseURL}/Auth/token`, user)
      .pipe(
        tap(res => {
          if (res.isAuthenticated && res.token) {
            localStorage.setItem('token', res.token);
            // لو هتحتاجهم بعدين:
            localStorage.setItem('roles', JSON.stringify(res.roles));
            localStorage.setItem('expiresOn', res.expiresOn);
            localStorage.setItem('username' , res.username)


            this.setAuthState(true);
          } else {
            this.setAuthState(false);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let message = 'Something went wrong';
          if (error.status === 400 || error.status === 401) {
            message = 'Invalid email or password';
          }
          this.setAuthState(false);
          return throwError(() => message);
        })
      );
  }


register(user: RegisterAuthDTO): Observable<AuthResponseDTO> {
  return this._httpClient
    .post<AuthResponseDTO>(`${environment.baseURL}/Auth/register`, user)
    .pipe(
      tap(res => {
        if (res.isAuthenticated && res.token) {
          // SUCCESS
          localStorage.setItem('token', res.token);
          localStorage.setItem('roles', JSON.stringify(res.roles));
          localStorage.setItem('expiresOn', res.expiresOn);
          localStorage.setItem('username' , res.username)
          this.setAuthState(true);
        } else {
          // BACKEND RETURNED ERROR MESSAGE (BUT STATUS = 200)
          this.setAuthState(false);
          throw new Error(res.message || "Registration failed");
        }
      }),
      catchError((error: any) => {
        // ده هيمسك error اللي رميناه فوق
        return throwError(() => error.message || "Unknown error");
      })
    );
}


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('expiresOn');
    this.setAuthState(false);
  }



  isAuthenticated():Observable<boolean>
  {
    return this.isUserAuthenticated.asObservable()
  }

  setAuthState(isAuth: boolean) {
  this.isUserAuthenticated.next(isAuth);
}

  
}
