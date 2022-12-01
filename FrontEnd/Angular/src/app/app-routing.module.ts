import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

const routes: Routes = [
  // {path: 'add-event',component:'new-event'}
{path:'',component:UserLayoutComponent,children:[
  {path:'',loadChildren:()=>import('./views/user/home/home.module').then(m=>m.HomeModule)},
  {path:'loginuser',loadChildren:()=>import('./views/user/loginuser/loginuser.module').then(m=>m.LoginuserModule)},
  {path:'list-event',loadChildren:()=>import('./views/user/list-event/list-event.module').then(m=>m.ListEventModule)},
  {path:'show-event',loadChildren:()=>import('./views/user/show-event/show-event.module').then(m=>m.ShowEventModule)}
]},
{path:'admin',component:AdminLayoutComponent,children:[
  {path:'',loadChildren:()=>import('./views/admin/dashboard/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'dashboard',loadChildren:()=>import('./views/admin/dashboard/dashboard/dashboard.module').then(m=>m.DashboardModule)},
  {path:'events',loadChildren:()=>import('./views/admin/allevents/allevents.module').then(m=>m.AlleventsModule)},
  {path:'add-event',loadChildren:()=>import('./views/admin/add-event/add-event.module').then(m=>m.AddEventModule)},
  {path:'update-event',loadChildren:()=>import('./views/admin/update-event/update-event.module').then(m=>m.UpdateEventModule)},
  {path:'loginadmin',loadChildren:()=>import('./views/admin/loginadmin/loginadmin.module').then(m=>m.LoginadminModule)}
]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }