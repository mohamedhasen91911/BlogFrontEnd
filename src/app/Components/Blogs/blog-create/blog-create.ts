import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../../Services/Blogs/blog-service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-blog-create',
  imports: [ReactiveFormsModule , JsonPipe],
  templateUrl: './blog-create.html',
  styleUrl: './blog-create.css',
})
export class BlogCreate {

  newBlog : FormGroup

  constructor(
    private _blogService:BlogService,
    private _router : Router
  )
  {
    this.newBlog = new FormGroup({
      title  : new FormControl('' , [Validators.required , Validators.maxLength(150) , Validators.minLength(3)]),
      content : new FormControl('' , [Validators.required , Validators.maxLength(265) , Validators.minLength(0)])
      })
  }

  getTitle()
  {
    return this.newBlog.get('title')
  }

  getContent()
  {
    return this.newBlog.get('content')
  }

  createNewBlog()
  {
    let newBlogDTO : BlogCreate = this.newBlog.value
    this._blogService.createBlog(this.newBlog.value).subscribe({
      next:(res)=>
        {
          Swal.fire({
          title: "Success",
          text: "Blog Added Successfly!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });

        this._router.navigate(['/blogs-list'])

        }
    })
    {

    }
  }

}
