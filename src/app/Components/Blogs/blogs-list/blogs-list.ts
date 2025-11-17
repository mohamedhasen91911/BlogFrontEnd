import { Component, OnInit } from '@angular/core';
import { BlogReadDTO } from '../../../Models/Blogs/blog-read-dto';
import { BlogService } from '../../../Services/Blogs/blog-service';

@Component({
  selector: 'app-blogs-list',
  imports: [],
  templateUrl: './blogs-list.html',
  styleUrl: './blogs-list.css',
})
export class BlogsList implements OnInit{

  blogs : BlogReadDTO[] = []
  constructor(private _blogService:BlogService)
  {

  }

  ngOnInit(){
    this._blogService.getAllPosts().subscribe({
      next:(res)=>
        {
          this.blogs = res
          console.log(this.blogs)
        },

      error:(err)=>
        {
          console.log(err)
        }
    })
  }

}
