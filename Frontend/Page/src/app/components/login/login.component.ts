import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators'; 

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private sessionTimer$: Observable<number>;
  loginFailed:boolean;
  firstName : any ;
  lastName: any;
  token : any;
  email: any;
  Checkemail:boolean;
  user_id:number;
  showMessage:boolean;
  loginForm : FormGroup;
  invalidCredential: boolean =false;
  constructor(private http: HttpClient,private router : Router){

  }
  ngOnInit(): void {
     this.loginForm = new FormGroup({
       "email": new FormControl(null,[Validators.required,Validators.email]),
       "password": new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(12)])
     })
  }
  
  public login()
  { 
    if(this.loginForm.valid){
    this.http.post("http://localhost:8082/api/signin", this.loginForm.value , {responseType:'json'}).subscribe({
      next : (data: any) => {
        console.log(data);
        this.invalidCredential = false;
        sessionStorage.setItem('key',JSON.stringify(data));
        console.log(JSON.parse(sessionStorage.getItem('key')).user_id);
       if(data.status == true)
       {

        if(data.authority == "[USER]"){
        // Navigate to the dashboard page
        this.router.navigateByUrl('/dashboard');
        }
        else if(data.authority == "[ADMIN]"){
          this.router.navigateByUrl('/admindashboard');
        }
       // this.startSessionTimer();
       else{
        this.router.navigateByUrl('/managerdashboard');
       }
      }
      else{
        this.loginFailed=true;
      }
    },
      
      error:(error : any) => {
        this.invalidCredential = true;
      }
    }
    );
  }  
  }
  //http://localhost:8082/api/check/email
  public ClickOnLogin()
  {  
    if(this.loginForm.valid){
      
      let body={
        "email":this.loginForm.value.email,
      }

      this.http.post("http://localhost:8082/api/check/email", body , {responseType:'json'}).subscribe({
      next : (data: boolean) => {
        console.log(data);
        this.Checkemail = data;

        if(this.Checkemail == true){
          this.login();
        }
        else{
          this.showMessage=true;
        }
      },
      error:(error:any)=>{
      
      }
    })
      console.log(this.loginForm.value);
     // this.login();
   
    console.log(this.loginForm.value.email);
   
    }
    else{
      this.invalidCredential=true;
    }
  }
  

  private startSessionTimer(): void {
    const sessionDuration = 1 * 60 * 1000; // 30 minutes in milliseconds
    const sessionExpiry = new Date().getTime() + sessionDuration;

    this.sessionTimer$ = timer(0, 1000).pipe(
      map(() => sessionExpiry - new Date().getTime()),
      takeWhile(timeLeft => timeLeft > 0)
    );

    this.sessionTimer$.subscribe(() => {
      // Session expired, logout user
      this.logout();
    });
  }

    logout(){
      sessionStorage.removeItem('key');
      sessionStorage.removeItem('taskkey');
      this.router.navigateByUrl('/login');
    }

 
}
