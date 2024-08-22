import { Component,OnInit  } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})
export class CreatetaskComponent implements OnInit {
   
  taskForm: FormGroup;
  isCreated= false;
  constructor(private fb: FormBuilder,private http:HttpClient) {}
  projects:any[]=[];
  allUsers:any[]=[];
  allEmployee:any[]=[];
  // selectedProjectId: number;
  ngOnInit(): void {
    const token = JSON.parse(sessionStorage.getItem('key')).token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.taskForm = this.fb.group({
      name: ['' ],
      status: [''],
      assignDate: [''],
      completionDate: [''],
      assignedTo: [''],
      projectId: ['']
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
    "projectId": this.taskForm.value.projectId
    };

   
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.post('http://localhost:8083/api/task/create',body, { headers, responseType: 'json' }).subscribe((response)=>{
      console.log(response);
      this.isCreated = true;
      this.isCreated=true;
      setTimeout(() => {
        this.isCreated = false;
      }, 3000); 

    })
    console.log(this.taskForm.value);
    this.clearForm();
  }

  clearForm(): void {
    // Clear the form except for the values of status and tasks_id
    this.taskForm.patchValue({
      name: '',
        status: '',
        assignDate: '',
        completionDate: '',
        assignedTo: '',
      projectId:''
    });
  }
}

