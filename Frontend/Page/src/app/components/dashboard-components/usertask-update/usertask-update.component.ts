import { Component,OnInit } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-usertask-update',
  templateUrl: './usertask-update.component.html',
  styleUrls: ['./usertask-update.component.css']
})
export class UsertaskUpdateComponent implements OnInit {
  updateClicked = false;
  taskId:number;
  taskStatus:String;
  isUpdated:boolean= false;
  projectData: any;
  selectedTaskId:any;
  tasksLength:number;
  constructor(private http: HttpClient){}
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
  updateTaskStatus()
  {  
     const token = JSON.parse(sessionStorage.getItem('key')).token;
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });

     this.http.put('http://localhost:8083/api/task/status/'+this.selectedTaskId ,{ status: this.taskStatus }, { headers,responseType:'text'}).subscribe((response)=>{
      console.log(response);
      this.isUpdated = true;
      this.taskStatus='';
      this.selectedTaskId='';
      setTimeout(() => {
        this.isUpdated = false;
      }, 3000); 

    })
 }
}
