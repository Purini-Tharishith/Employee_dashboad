import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit{
  
  taskId:any;
  projectId:any;
  selectedProjectId:any;
  isDeleted:boolean = false;
  projects:any[]=[];
  tasks:any[]=[];
  selectedTaskId:any;
  constructor(private formBuilder: FormBuilder,private http : HttpClient,private router :Router) { }
  ngOnInit(): void {
   
    const token = JSON.parse(sessionStorage.getItem('key')).token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
      
    this.http.get<any[]>('http://localhost:8083/api/project/details',{headers}).subscribe((response)=>{
      console.log(response);
      this.projects = response;
      //this.projectslength = response.length;
    })
  }
 
  DeleteTask(){

    const token = JSON.parse(sessionStorage.getItem('key')).token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
     
    this.http.delete('http://localhost:8083/api/task/delete/'+this.selectedProjectId+'/task/'+this.selectedTaskId,{headers,responseType:'text'}).subscribe((response)=>{
      console.log(response);
      this.isDeleted = true;
      this.selectedProjectId='';
      this.selectedTaskId='';
      setTimeout(()=>{
        this.isDeleted = false;
      },3000);      
      
    })
  }

  loadTasks(){

    const token = JSON.parse(sessionStorage.getItem('key')).token;
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });
 
     this.http.get<any[]>('http://localhost:8083/api/project/all/tasks/'+this.selectedProjectId,{headers,responseType:'json'}).subscribe(
     { next:
       (response:any)=>{
       console.log(response.taskId);
         this.tasks = response.taskId;
       
     },
     error:
     (error:any)=>{
       console.log("error occured ");
     }
     });
 
  }
  
}
