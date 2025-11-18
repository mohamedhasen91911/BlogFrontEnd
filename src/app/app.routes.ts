import { Routes } from '@angular/router';
import { BlogsList } from './Components/Blogs/blogs-list/blogs-list';
import { BlogDelete } from './Components/Blogs/blog-delete/blog-delete';
import { BlogDetails } from './Components/Blogs/blog-details/blog-details';
import { BlogCreate } from './Components/Blogs/blog-create/blog-create';
import { BlogEdit } from './Components/Blogs/blog-edit/blog-edit';

export const routes: Routes = [
    {path:'blogs-list' , component:BlogsList},
    {path:'blog-details/:id' , component:BlogDetails},
    {path:'blog-create' , component:BlogCreate},
    {path:'blog-edit/:id' , component:BlogEdit},
    {path:'blog-delete/:id' , component:BlogDelete}
];
