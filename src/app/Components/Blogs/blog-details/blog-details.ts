import { Component, OnInit } from '@angular/core';
import { BlogReadDTO } from '../../../Models/Blogs/blog-read-dto';
import { BlogService } from '../../../Services/Blogs/blog-service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { DatePipe, JsonPipe, Location } from '@angular/common';


@Component({
  selector: 'app-blog-details',
  imports: [JsonPipe , DatePipe],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css',
})
export class BlogDetails implements OnInit{
blog : BlogReadDTO  = {} as BlogReadDTO

constructor(
  private _blogService:BlogService ,
  private _activatedRoute:ActivatedRoute,
  private _router:Router,
  private _location : Location
)
{

}

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
          this._blogService.getBlogById(id).subscribe({
            next:(getBlog)=>
              {
                if(getBlog)
                  {
                    this.blog = getBlog
                    console.log(this.blog)
                  }
              }
          })
        }
      
      
    },
    error(err)
    {
      console.log(err)
    }
  })
}

goToEdit(id :number)
{
  this._router.navigate(['blog-edit' , id])
}


back()
{
  this._location.back();
}


  goToDelete(id:number)
  {
    this._router.navigate(['/blog-delete' , id])
  }


}
