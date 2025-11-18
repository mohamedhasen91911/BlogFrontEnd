import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { BlogService } from '../../../Services/Blogs/blog-service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-blog-delete',
  imports: [],
  templateUrl: './blog-delete.html',
  styleUrl: './blog-delete.css',
})
export class BlogDelete implements OnInit{


  constructor(
    private _activatedRoute:ActivatedRoute ,
    private _router:Router,
    private _blogService:BlogService,
    private _location:Location
  ){}


  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next:(res)=>{
        const idParam = res.get('id')
        const id =Number(idParam)
  
        if(!idParam || isNaN(id))
          {
            Swal.fire({
              title: "Invalid URL",
              text: "This Url is invalid please try again",
              icon: "error"
            });
  
            this._router.navigateByUrl('/blogs-list')
  
          }
        if(id > 0 )
          {


            Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              this._blogService.deleteBlog(id).subscribe({
                next:(tt)=>{
                  Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                }
              );

              // console.log(tt)
                
                },
                error:(err)=>
                  {
                    console.log(err)
                  }
              })
              
            }
          });
          
          this._router.navigate(['/blogs-list'])

            
          }
        
        
      },
      error(err)
      {
        console.log(err)
      }
    })
  }

 

}
