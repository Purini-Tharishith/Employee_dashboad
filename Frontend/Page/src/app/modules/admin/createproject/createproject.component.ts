import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent {
   
  projectForm: FormGroup;
  isCreated= false;
  isUpdated = false;
  updateprojectForm:FormGroup;
  allUsers:any[]=[];
  projects:any[]=[];
  allManagers:any[]=[];
  selectedProjectId:number;
  constructor(private fb: FormBuilder,private http:HttpClient) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
        name: [''],
        status: [''],
        assignDate: [''],
        completionDate: [''],
        assignedTo: [''],
      description:[''],
      departmentName:['']
    });
  // },{ validator: dateValidator });

  this.updateprojectForm = this.fb.group({
    name: [''],
    status: [''],
    assignDate: [''],
    completionDate: [''],
    assignedTo: [''],
   description:[''],
   departmentName:[''],
   projectId:['']
  })

  const token = JSON.parse(sessionStorage.getItem('key')).token
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  this.http.get('http://localhost:8082/api/admin/all', { headers, responseType: 'json' }).subscribe(
   {next: 
    (data: any) => {
      this.allUsers=data;
      for (let i = 0; i < this.allUsers.length; i++) {
         if(this.allUsers[i].authority == "Manager"){
              this.allManagers.push(this.allUsers[i]);
         }
      }
    
      console.log(this.allManagers);
    },
    error:
    (error) => {
      console.error('Error fetching data:', error);
    }
   } );


   this.http.get<any[]>('http://localhost:8083/api/project/all/projects',{headers}).subscribe((response)=>{
    console.log(response);
    this.projects = response;
  
  })

   
}

  onSubmit() {
    // Handle form submission
    const token = JSON.parse(sessionStorage.getItem('key')).token;
    const email = JSON.parse(sessionStorage.getItem('key')).email;
    console.log(this.projectForm.value);
    console.log(email);
    console.log(this.projectForm.value.assignedTo);
    let body={
    "name": this.projectForm.value.name,
    "status": this.projectForm.value.status,
    "assignedDate": this.projectForm.value.assignDate,
    "completionDate": this.projectForm.value.completionDate,
    "assignedTo": this.projectForm.value.assignedTo,
    "assignedBy": email,
    "description":this.projectForm.value.description,
    "department_name":this.projectForm.value.departmentName
    };

   console.log(body);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.post('http://localhost:8083/api/project/create',body, { headers, responseType: 'json' }).subscribe((response)=>{
      console.log(response);
      this.isCreated=true;
      setTimeout(() => {
        this.isCreated = false;
      }, 3000); 
      this.clearForm();
    })
  
  }
  UpdateProject(){
    const token = JSON.parse(sessionStorage.getItem('key')).token;
    const email = JSON.parse(sessionStorage.getItem('key')).email;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let body = {
      "name": this.updateprojectForm.value.name,
      "status": this.updateprojectForm.value.status,
      "assignedDate": this.updateprojectForm.value.assignDate,
      "completionDate": this.updateprojectForm.value.completionDate,
      "assignedTo": this.updateprojectForm.value.assignedTo,
      "assignedBy": email,
      "description":this.updateprojectForm.value.description,
      "department_name":this.updateprojectForm.value.departmentName
    };
    this.http.put('http://localhost:8083/api/project/details/'+this.updateprojectForm.value.projectId,body,{headers,responseType:'text'}).subscribe((response)=>{
      console.log(response);
      this.isUpdated=true;
      setTimeout(() => {
        this.isUpdated = false;
      }, 3000); 

      this.clearUpdateForm();
    })
  }

  clearForm(): void {
    // Clear the form except for the values of status and tasks_id
    this.projectForm.patchValue({
      name: '',
        status: '',
        assignDate: '',
        completionDate: '',
        assignedTo: '',
      description:'',
      departmentName:''
    });
  }

  clearUpdateForm(): void{
    this.updateprojectForm.patchValue({
      name: '',
        status: '',
        assignDate: '',
        completionDate: '',
        assignedTo: '',
      description:'',
      departmentName:'',
      projectId:''
    });
  }
}
