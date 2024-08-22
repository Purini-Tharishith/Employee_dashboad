import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './components/dashboard-components/dashboard/dashboard.component';
// import { HeaderComponent } from './components/dashboard-components/header/header.component';
import { ProfileComponent } from './components/dashboard-components/profile/profile.component';
// import { SidenavComponent } from './components/dashboard-components/sidenav/sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardMainComponent } from './components/dashboard-components/dashboard-main/dashboard-main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
 import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/dashboard-components/header/header.component';
import { SidenavComponent } from './components/dashboard-components/sidenav/sidenav.component';
import { ProjectsComponent } from './components/dashboard-components/projects/projects.component';
import { TasksComponent } from './components/dashboard-components/tasks/tasks.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';
import { AdminsidebarComponent } from './modules/admin/adminsidebar/adminsidebar.component';
import { AllusersComponent } from './modules/admin/allusers/allusers.component';
import { NewmanagerComponent } from './modules/admin/newEmployee/newmanager.component';
import { MasterInterceptor } from './service/master.interceptor';
import { CreatetaskComponent } from './modules/manager/createtask/createtask.component';
import { ManagerDashboardComponent } from './modules/manager/manager-dashboard/manager-dashboard.component';
import { ManagerSidenavComponent } from './modules/manager/manager-sidenav/manager-sidenav.component';
import { ManagerHeaderComponent } from './modules/manager/manager-header/manager-header.component';
import { ManagerProjectsComponent } from './modules/manager/manager-projects/manager-projects.component';
import { ManagerProfileComponent } from './modules/manager/manager-profile/manager-profile.component';
import { CreateUserComponent } from './modules/manager/create-user/create-user.component';
import { DefaultDashboardComponent } from './modules/manager/default-dashboard/default-dashboard.component';
import { UpdateTaskComponent } from './modules/manager/update-task/update-task.component';
import { UsertaskUpdateComponent } from './components/dashboard-components/usertask-update/usertask-update.component';
import { DeleteProjectComponent } from './modules/admin/delete-project/delete-project.component';
import { DeleteUserComponent } from './modules/admin/DeleteUser/delete-user.component';

import { CreateprojectComponent } from './modules/admin/createproject/createproject.component';
import { UpdateprojectComponent } from './modules/admin/updateproject/updateproject.component';
import { UpdateRoleComponent } from './modules/admin/update-role/update-role.component';
import { AdminHeaderComponent } from './modules/admin/admin-header/admin-header.component';
import { DeleteTaskComponent } from './modules/manager/delete-task/delete-task.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    SidenavComponent,
    DashboardMainComponent,
    ProjectsComponent,
    TasksComponent,
    AdminDashboardComponent,
    AdminsidebarComponent,
    AllusersComponent,
    NewmanagerComponent,
    CreatetaskComponent,
    ManagerDashboardComponent,
    ManagerSidenavComponent,
    ManagerHeaderComponent,
    ManagerProjectsComponent,
    ManagerProfileComponent,
    CreateUserComponent,
    DefaultDashboardComponent,
    UpdateTaskComponent,
    UsertaskUpdateComponent,
    DeleteProjectComponent,
    DeleteUserComponent,

    CreateprojectComponent,
    UpdateprojectComponent,
    UpdateRoleComponent,
    AdminHeaderComponent,
    DeleteTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    FormsModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MasterInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
