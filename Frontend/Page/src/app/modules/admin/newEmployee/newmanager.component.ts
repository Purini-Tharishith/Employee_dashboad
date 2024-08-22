import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../shared-data.service';
@Component({
  selector: 'app-newmanager',
  templateUrl: './newmanager.component.html',
  styleUrls: ['./newmanager.component.css']
})
export class NewmanagerComponent implements OnInit{
  currentRole:any;
  showMessage: boolean = false;
  constructor(private formBuilder: FormBuilder,private http : HttpClient,private router :Router,private sharedData : SharedDataService) { }
  registerForm: FormGroup;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    
    // Submit the form data
    console.log(this.registerForm.value);
    console.log(this.registerForm.value.role);
    this.allEmployee();
  }

  public allEmployee(){

    const token =JSON.parse(sessionStorage.getItem('key')).token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    if(this.registerForm.value.role == "admin"){
    this.http.post<any>('http://localhost:8082/api/admin/new/admin',this.registerForm.value,{headers}).subscribe((data) =>{
      console.log(data);
      this.currentRole= this.registerForm.value.role;
      this.showMessage = true; 
      setTimeout(() => {
        this.showMessage = false;
      }, 5000); 
     // sessionStorage.setItem('newAdmin-key',JSON.stringify(data));
    })
    }
    else if(this.registerForm.value.role == "manager"){
      this.http.post<any>('http://localhost:8082/api/admin/new/manager',this.registerForm.value,{headers}).subscribe((data) =>{
      console.log(data);
      this.currentRole= this.registerForm.value.role;
      this.showMessage = true; 
      setTimeout(() => {
        this.showMessage = false;
      }, 5000); 
      //sessionStorage.setItem('newManager-key',JSON.stringify(data));
    })
    }
    else{
      this.http.post<any>('http://localhost:8082/api/admin/new/user',this.registerForm.value,{headers}).subscribe((data) =>{
        console.log(data);
        this.currentRole= this.registerForm.value.role;
        this.showMessage = true; 
        setTimeout(() => {
          this.showMessage = false;
        }, 5000); 
    })
  }
  this.clearForm();
 }

 clearForm(): void {
  // Clear the form except for the values of status and tasks_id
  this.registerForm.patchValue({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  });
}
}
