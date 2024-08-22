import { Component } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasksLength : any ;

  constructor(private http :HttpClient){}
  projectData: any;
  ngOnInit(): void {

    const sessionData = sessionStorage.getItem('key');
    if (sessionData) {
    const token = JSON.parse(sessionStorage.getItem('key')).token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    
    this.http.get('http://localhost:8083/api/task/user', { headers, responseType: 'json' }).subscribe(
      (data: any) => {
       console.log(data);
      this.projectData = data;
      this.tasksLength = this.projectData.tasks.length;
      })
  }
}

}