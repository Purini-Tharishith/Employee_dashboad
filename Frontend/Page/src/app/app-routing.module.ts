import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './components/dashboard-components/profile/profile.component';
import { DashboardMainComponent } from './components/dashboard-components/dashboard-main/dashboard-main.component';
import { DashboardComponent } from './components/dashboard-components/dashboard/dashboard.component';
import { ProjectsComponent } from './components/dashboard-components/projects/projects.component';
import { TasksComponent } from './components/dashboard-components/tasks/tasks.component';
import { preRouteGuard } from './pre-route.guard';
import { AllusersComponent } from './modules/admin/allusers/allusers.component';
import { NewmanagerComponent } from './modules/admin/newEmployee/newmanager.component';
import { CreatetaskComponent } from './modules/manager/createtask/createtask.component';
import { ManagerDashboardComponent } from './modules/manager/manager-dashboard/manager-dashboard.component';
import { ManagerProjectsComponent } from './modules/manager/manager-projects/manager-projects.component';
import { ManagerProfileComponent } from './modules/manager/manager-profile/manager-profile.component';
import { CreateUserComponent } from './modules/manager/create-user/create-user.component';
import { DefaultDashboardComponent } from './modules/manager/default-dashboard/default-dashboard.component';
import { UpdateTaskComponent } from './modules/manager/update-task/update-task.component';
import { CreateprojectComponent } from './modules/admin/createproject/createproject.component';
import { DeleteUserComponent } from './modules/admin/DeleteUser/delete-user.component';
import { DeleteProjectComponent } from './modules/admin/delete-project/delete-project.component';
import { UpdateprojectComponent } from './modules/admin/updateproject/updateproject.component';
import { UpdateRoleComponent } from './modules/admin/update-role/update-role.component';
import { DeleteTaskComponent } from './modules/manager/delete-task/delete-task.component';
import { UsertaskUpdateComponent } from './components/dashboard-components/usertask-update/usertask-update.component';
const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path :'allusers',component:AllusersComponent},
  {
    path:'dashboard',component:DashboardMainComponent,
    children: [
    { path: '', component:DashboardComponent},
    { path: 'projects', component: ProjectsComponent },
    { path: 'profile', component: ProfileComponent },
    {path:'tasks',component:TasksComponent},
    {path:'usertask-update',component:UsertaskUpdateComponent}
    ]
  },

  {
    path:'admindashboard',component:AdminDashboardComponent,
    children: [
    { path: '', component: AllusersComponent},
    { path: 'allusers', component: AllusersComponent},
    {path : 'newmanager',component:NewmanagerComponent},
    { path: 'update-role', component:UpdateRoleComponent},
    { path: 'create-project', component: CreateprojectComponent},
    { path: 'delete-user', component: DeleteUserComponent},
     {path:'delete-project',component:DeleteProjectComponent}
    ]
  },

  {
    path:'managerdashboard',component:ManagerDashboardComponent,
    children: [
    {path:'',component:DefaultDashboardComponent},
    {path:'createtasks',component:CreatetaskComponent},
    {path:'manager-projects',component:ManagerProjectsComponent},
    {path:'manager-profile',component:ManagerProfileComponent},
    {path:'create-user',component:CreateUserComponent},
    {path:'update-task',component:UpdateTaskComponent},
    {path:'delete-task',component:DeleteTaskComponent}
    ]
  },
  // {path:'admin',
  // loadChildren:() => 
  // import('./modules/admin/admin.module').then((m)=> m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: 'PRE_ROUTE_GUARD', // Provide a token for the guard
      useValue: preRouteGuard // Use the preRouteGuard function
    }
  ] 
})
export class AppRoutingModule { }
