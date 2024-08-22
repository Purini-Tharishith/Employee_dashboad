import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  selecteduserId:any;
  registerForm:FormGroup;
  deleteUserStatus:boolean;
  projectId:number;
  allManagers:any[]=[];
  isDeleted:boolean= false;
  isDeleteProject:boolean=false;
  allUsers:any[]=[];
  projects: any[] = [];
  selectedProjectId: any;
  projectslength:number;
  constructor(private formBuilder: FormBuilder,private http : HttpClient,private router :Router) { }
  ngOnInit(): void {
       
    
      const token = JSON.parse(sessionStorage.getItem('key')).token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      this.http.get('http://localhost:8082/api/admin/all', { headers, responseType: 'json' }).subscribe(
       {next: 
        (data: any) => {
          this.allUsers=data;
          this.allManagers.push(...data.filter(item => item.role === 'Manager'));
          
        },
        error:
        (error) => {
          console.error('Error fetching data:', error);
        }
       } );


       this.http.get<any[]>('http://localhost:8083/api/project/all/projects',{headers}).subscribe((response)=>{
        console.log(response);
        this.projects = response;
        this.projectslength = response.length;
      })
       
  }
  
  public DeleteUser(){


    const token = JSON.parse(sessionStorage.getItem('key')).token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
      this.http.delete('http://localhost:8082/api/admin/delete/'+this.selecteduserId,{headers,responseType:'text'}).subscribe((data)=>{
        console.log(data);
      })
      this.isDeleted = true;
      this.selecteduserId='';
      setTimeout(()=>{
        this.isDeleted = false;
      },3000);

  }
  
  public DeleteProject(){
    const token = JSON.parse(sessionStorage.getItem('key')).token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.delete('http://localhost:8083/api/project/delete/'+this.selectedProjectId,{headers,responseType:'text'}).subscribe((data)=>{
      console.log(data);
    })

    this.isDeleteProject = true;
    this.selectedProjectId='';
    setTimeout(()=>{
      this.isDeleteProject = false;
    },3000);
   
  }

  
}
