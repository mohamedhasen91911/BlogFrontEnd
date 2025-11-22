import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BlogReadDTO } from '../../Models/Blogs/blog-read-dto';
import { environment } from '../../../environments/environment.development';
import { BlogCreateDTO } from '../../Models/Blogs/blog-create-dto';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { AuthService } from '../Auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {

  // private adminToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb2hhbWVkaGFzZW4yMjciLCJqdGkiOiIyMTFmZWEyZC1lMDIzLTRjNWMtOGQ4YS1hOGJiNjI1ZGYwMTQiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJ1aWQiOiJhZTEzMzNkNC1iZmUzLTRhYTgtYTg5Zi0xN2ZkOGVkZjk3ZWYiLCJyb2xlcyI6WyJBZG1pbiIsIlVzZXIiXSwiZXhwIjoxNzY2MDY4OTQ0LCJpc3MiOiJTZWN1cmVBcGkiLCJhdWQiOiJTZWN1cmVBcGlVc2VyIn0.0cTDOG2hTdWiayhGdzrzeeMJiagQ8gphZCA2WCA_zVs"
  private token :string
  constructor(
    private _httpClient:HttpClient,
    private _authService:AuthService
  
  )
  {
    this.token = _authService.getToken()
  }

  getBlogs():Observable<BlogReadDTO[]>
  {
    return this._httpClient.get<BlogReadDTO[]>(`${environment.baseURL}/Posts`)
  }

  getBlogsByUserId(userid : string):Observable<BlogReadDTO[]>
  {
    return this._httpClient.get<BlogReadDTO[]>(`${environment.baseURL}/Posts/user/${userid}`)
  }

  getBlogById(id:number):Observable<BlogReadDTO>
  {
    return this._httpClient.get<{result: BlogReadDTO}>(`${environment.baseURL}/Posts/${id}`).pipe(
      map(res => res.result)
    )
  }
  createBlog(blog:BlogCreateDTO):Observable<void>
  {
    return this._httpClient.post<void>(`${environment.baseURL}/Posts` , blog ,{
      headers : new HttpHeaders ({
        "Authorization" : `Bearer ${this.token}`
      })
    })
  }

  updateBlog(id:number , blog:BlogCreateDTO):Observable<string>
  {
    return this._httpClient.put(`${environment.baseURL}/Posts/${id}` , blog , {
      headers : new HttpHeaders ({
        "Authorization" : `Bearer ${this.token}`
      }),
      responseType : 'text'
    })
  }

  deleteBlog(id:number):Observable<string>
  {
    return this._httpClient.delete(`${environment.baseURL}/Posts/${id}` , {
      headers : new HttpHeaders ({
        "Authorization" : `Bearer ${this.token}`
      }),
      responseType:'text'
    })
  }
  
}
