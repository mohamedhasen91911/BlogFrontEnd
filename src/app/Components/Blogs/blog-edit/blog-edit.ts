import { Component, getNgModuleById, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { BlogService } from '../../../Services/Blogs/blog-service';
import { BlogReadDTO } from '../../../Models/Blogs/blog-read-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlogCreate } from '../blog-create/blog-create';
import { BlogCreateDTO } from '../../../Models/Blogs/blog-create-dto';
import { Location } from '@angular/common';


@Component({
  selector: 'app-blog-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './blog-edit.html',
  styleUrl: './blog-edit.css',
})
export class BlogEdit implements OnInit {

  blog : BlogReadDTO  = {} as BlogReadDTO

  blogForm : FormGroup 
  

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _router : Router,
    private _blogService:BlogService,
    private _location : Location

  )
  {
    this.blogForm = new FormGroup({

      title : new FormControl(''),
      content: new FormControl('')
    })
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next:(res)=>
        {
          const idParam = res.get('id')
          const id = Number(idParam)

          if(!idParam || isNaN(id))
            {
              Swal.fire({
                title: "Invalid URL",
                text: "This Url is invalid please try again",
                icon: "error"
              });
              this._router.navigateByUrl('/blogs-list')

            }

            if(id>0)
              {
                this._blogService.getBlogById(id).subscribe({
                  next:(getBlog)=>
                    {
                      this.blog = getBlog
                      if(this.blog)
                        {
                          this.blogForm.get('title')?.setValue(this.blog.title)
                          this.blogForm.get('content')?.setValue(this.blog.content)
                        }
                    },
                    error:(err)=>{
                      console.log(err)
                    }
                })
              }
        }
    })
  }

  editeBlog(){
    let newBlogDTO : BlogCreateDTO = this.blogForm.value
        this._blogService.updateBlog(this.blog.id , newBlogDTO).subscribe
        ({
          next:(res)=>
            {
              Swal.fire({
              title: "Success",
              text: "Blog Edited Successfly!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });

            this._router.navigate(['/blogs-list'])
            // console.log('success')
          },
          error:(err)=>
            {
              console.log(err)
            }
          
        })
        {
    
        }
  }


  back(){
    this._location.back()
  }

  getTitle()
  {
    return this.blogForm.get('title')
  }

  getContent()
  {
    return this.blogForm.get('content')
  }

}
