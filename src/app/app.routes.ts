import { Routes } from '@angular/router';
import { BlogsList } from './Components/Blogs/blogs-list/blogs-list';
import { BlogDelete } from './Components/Blogs/blog-delete/blog-delete';
import { BlogDetails } from './Components/Blogs/blog-details/blog-details';
import { BlogCreate } from './Components/Blogs/blog-create/blog-create';
import { BlogEdit } from './Components/Blogs/blog-edit/blog-edit';
import { LoginComponent } from './Components/Auth/login-component/login-component';
import { RegisterComponent } from './Components/Auth/register-component/register-component';

export const routes: Routes = [
    {path:'' , component:BlogsList},
    {path:'blogs-list' , component:BlogsList},
    {path:'blog-list/:userid' , component:BlogsList},
    {path:'blog-details/:id' , component:BlogDetails},
    {path:'blog-create' , component:BlogCreate},
    {path:'blog-edit/:id' , component:BlogEdit},
    {path:'blog-delete/:id' , component:BlogDelete},
    {path:'login' , component:LoginComponent},
    {path:'register' , component:RegisterComponent}
];
