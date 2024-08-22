import { Component } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent {
username: any;
  //http://localhost:8083/api/project/all/projects

  projects: any[] = []; // Populate this array with your project data
  updateClicked = false;
  selectedProject: any;
  selectedTaskStatus: string;
  projectlength:number;
  constructor(private http : HttpClient) {}
  ngOnInit(): void {

   
   this.GetProjects();
  }
  selectProject(project: any) {
    this.selectedProject = project;
  }

  GetProjects(){
    const token = JSON.parse(sessionStorage.getItem('key')).token;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<any[]>('http://localhost:8083/api/project/all/projects',{headers}).subscribe((response)=>{
      console.log(response);
      this.projects = response;
      this.projectlength= response.length;
      sessionStorage.setItem('allProjectkey',JSON.stringify(response));
      
    })
  }
  
}
