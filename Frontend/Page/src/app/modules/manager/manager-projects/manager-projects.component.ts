import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-manager-projects',
  templateUrl: './manager-projects.component.html',
  styleUrls: ['./manager-projects.component.css']
})
export class ManagerProjectsComponent implements OnInit{
 
  projects: any[] = []; // Populate this array with your project data
  updateClicked = false;
  selectedProject: any;
  selectedTaskStatus: string;
 
  constructor(private http : HttpClient) {}
  ngOnInit(): void {

    const token = JSON.parse(sessionStorage.getItem('key')).token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:8083/api/project/details', { headers, responseType: 'json' }).subscribe(
      (response) => {
        console.log(response);
        this.projects = response;
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
    
  }
  selectProject(project: any) {
    this.selectedProject = project;
  }
  
 
}
