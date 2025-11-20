import { Component, OnInit } from '@angular/core';
import { BlogReadDTO } from '../../../Models/Blogs/blog-read-dto';
import { BlogService } from '../../../Services/Blogs/blog-service';
import { Router, RouterLink } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blogs-list',
  imports: [RouterLink , DatePipe],
  templateUrl: './blogs-list.html',
  styleUrl: './blogs-list.css',
})
export class BlogsList implements OnInit{

  blogs : BlogReadDTO[] = []
  constructor(
    private _blogService:BlogService,
    private _router:Router
  )
  {

  }

  ngOnInit(){
    this._blogService.getBlogs().subscribe({
      next:(res)=>
        {
          this.blogs = res
          // console.log(this.blogs)
        },

      error:(err)=>
        {
          console.log(err)
        }
    })
  }

  goToDetails(id:number)
  {
    this._router.navigate(['/blog-details' , id])
  }

  goToEdit(id:number)
  {
    this._router.navigate(['/blog-edit' , id])
  }
  goToDelete(id:number)
  {
    this._router.navigate(['/blog-delete' , id])
  }

}
