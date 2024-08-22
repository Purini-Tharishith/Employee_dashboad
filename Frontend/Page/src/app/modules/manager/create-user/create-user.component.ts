import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{
  
  reactiveForm : FormGroup;
  isCreated:boolean = false;
  
 constructor(private http: HttpClient,private router : Router){

 }
 ngOnInit(): void {
     
     this.reactiveForm = new FormGroup({
      firstName : new FormControl(null,[Validators.required]),
      lastName: new FormControl(null),
      password: new FormControl(null,[Validators.required ,Validators.minLength(8),Validators.maxLength(12)]),
      email:new FormControl(null,[Validators.required,Validators.email])
     })

 }


  
 public postMethod(){
  let body = {
     "firstName": this.reactiveForm.value.firstName,
    "lastName": this.reactiveForm.value.lastName,
    "email": this.reactiveForm.value.email,
    "password": this.reactiveForm.value.password
  };


  const sessionData = sessionStorage.getItem('key');
    if (sessionData)
     {
    const token = JSON.parse(sessionData).token;

    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
     });
     console.log(token);

     this.http.post('http://localhost:8082/api/manager/new/user',body, { headers,responseType:'json'}).subscribe((response)=>{
      console.log(response);
      sessionStorage.setItem('new-user-Bymanager',JSON.stringify(response));
       this.isCreated = true;
       this.reactiveForm.reset();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

 }

OnFormSubmit(){
  this.postMethod();
  console.log(this.reactiveForm);
 }
}
