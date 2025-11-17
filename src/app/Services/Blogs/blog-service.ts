import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogReadDTO } from '../../Models/Blogs/blog-read-dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BlogService {

  constructor(private _httpClient:HttpClient)
  {}

  getAllPosts():Observable<BlogReadDTO[]>
  {
    return this._httpClient.get<BlogReadDTO[]>(`${environment.baseURL}/Posts`)
  }
  
}
