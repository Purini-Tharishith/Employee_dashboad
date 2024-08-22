import { Component,OnInit} from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit{
  
  projects: any[] = []; // Populate this array with your project data
  updateClicked = false;
  selectedProjectId:number;
  taskId:number;
  projectId:number;
  taskStatus:string;
  taskForm: FormGroup;
  isCreated= false;
  projectStatus:string;
  allEmployee:any[]=[];
  tasks:any[]=[];
  isProjectStatus:boolean= false;
  projectForm:FormGroup
  projectIdControl = new FormControl();
  constructor(private fb: FormBuilder,private http:HttpClient) {}

  ngOnInit(): void {

    

    this.taskForm = this.fb.group({
      name: ['' ],
      status: [''],
      assignDate: [''],
      completionDate: [''],
      assignedTo: [''],
      projectId: [''],
      taskId:['']
    });
    
    this.projectForm = this.fb.group({
      project_id:[''],
      projectStatus:['']
    });

    this.isCreated=false;
    const token = JSON.parse(sessionStorage.getItem('key')).token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('http://localhost:8082/api/manager/all/users', { headers, responseType: 'json' }).subscribe(
      {next: 
       (data: any) => {
         this.allEmployee=data;
         
       },
       error:
       (error) => {
         console.error('Error fetching data:', error);
       }
      } );

    this.http.get<any[]>('http://localhost:8083/api/project/details',{headers}).subscribe((response)=>{
      console.log(response);
      this.projects = response;
      //this.projectslength = response.length;
    })
    
 
  }
  updateProjectStatus()
  {  
 //  this.updateClicked = true;
     const token = JSON.parse(sessionStorage.getItem('key')).token;
     const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
     });

    
  this.http.put('http://localhost:8083/api/project/status/'+this.projectForm.value.project_id ,{ status: this.projectForm.value.projectStatus }, { headers,responseType:'text'}).subscribe((response)=>{
    console.log(response);
    this.isProjectStatus = true;
    setTimeout(()=>{
      this.isProjectStatus = false;
    })
  })
 }


 onSubmit() {
  // Handle form submission
  const token = JSON.parse(sessionStorage.getItem('key')).token;
  const email = JSON.parse(sessionStorage.getItem('key')).email;

  let body={
  "name": this.taskForm.value.name,
  "status": this.taskForm.value.status,
  "assignedDate": this.taskForm.value.assignDate,
  "completionDate": this.taskForm.value.completionDate,
  "assignedTo": this.taskForm.value.assignedTo,
  "assignedBy": email,
  "projectId": this.taskForm.value.projectId,
  };
   
  this.taskId = this.taskForm.value.taskId;
 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  this.http.put('http://localhost:8083/api/task/update/'+this.taskId,body, { headers, responseType: 'text' }).subscribe((response)=>{
    console.log(response);
    this.isCreated = true;
    setTimeout(() => {
      this.isCreated = false;
    }, 3000); 

  })
  console.log(this.taskForm.value);
}

 loadTasks(){

   const token = JSON.parse(sessionStorage.getItem('key')).token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:8083/api/project/all/tasks/'+this.taskForm.value.projectId,{headers,responseType:'json'}).subscribe(
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
