import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BlogReadDTO } from '../../Models/Blogs/blog-read-dto';
import { environment } from '../../../environments/environment.development';
import { BlogCreateDTO } from '../../Models/Blogs/blog-create-dto';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class BlogService {

  private adminToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb2hhbWVkaGFzZW4yMjciLCJqdGkiOiIyMTFmZWEyZC1lMDIzLTRjNWMtOGQ4YS1hOGJiNjI1ZGYwMTQiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJ1aWQiOiJhZTEzMzNkNC1iZmUzLTRhYTgtYTg5Zi0xN2ZkOGVkZjk3ZWYiLCJyb2xlcyI6WyJBZG1pbiIsIlVzZXIiXSwiZXhwIjoxNzY2MDY4OTQ0LCJpc3MiOiJTZWN1cmVBcGkiLCJhdWQiOiJTZWN1cmVBcGlVc2VyIn0.0cTDOG2hTdWiayhGdzrzeeMJiagQ8gphZCA2WCA_zVs"
  private token :string =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb2hhbWVkaGFzZW4yMjciLCJqdGkiOiIxMDU3ZTA0Zi00ZTVjLTRmZDItODE0OS0wNjk4NWIxODAyZGMiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJ1aWQiOiJhZTEzMzNkNC1iZmUzLTRhYTgtYTg5Zi0xN2ZkOGVkZjk3ZWYiLCJyb2xlcyI6IlVzZXIiLCJleHAiOjE3NjYwNjQ4MTksImlzcyI6IlNlY3VyZUFwaSIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.sVnqb_GEC2370ZhahhAORktHv_mWI53sEzZ0YFnrkts"
  constructor(private _httpClient:HttpClient)
  {}

  getBlogs():Observable<BlogReadDTO[]>
  {
    return this._httpClient.get<BlogReadDTO[]>(`${environment.baseURL}/Posts`)
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
  updateBlog(id:number , blog:BlogCreateDTO):Observable<void>
  {
    return this._httpClient.put<void>(`${environment.baseURL}/Posts/${id}` , blog , {
      headers : new HttpHeaders ({
        "Authorization" : `Bearer ${this.token}`
      })
    })
  }
  deleteBlog(id:number):Observable<string>
  {
    return this._httpClient.delete<string>(`${environment.baseURL}/Posts/${id}` , {
      headers : new HttpHeaders ({
        "Authorization" : `Bearer ${this.adminToken}`
      })
    })
  }
  
}
