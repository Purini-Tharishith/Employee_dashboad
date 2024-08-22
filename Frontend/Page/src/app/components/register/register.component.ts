import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

 reactiveForm : FormGroup;
 checkStatus:boolean;
 CheckRegister:boolean;
 OnClickedButton:boolean=false;
 constructor(private http: HttpClient){

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

   this.http.post("http://localhost:8082/api/signup",body).subscribe((data) =>{
    sessionStorage.setItem('signupkey',JSON.stringify(data));
      console.log(data);
     this.checkStatus=  JSON.parse(sessionStorage.getItem('signupkey')).status
     console.log(this.checkStatus);
    if(this.checkStatus == true){
      this.CheckRegister=true;
    }
    else{
      this.CheckRegister= false;
    }
    this.reactiveForm.reset();
   })
  
 }
 
 OnFormSubmit(){
  this.postMethod();
  this.OnClickedButton= true;
   console.log(this.reactiveForm);
 }


}
