import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {
  currentRole:any;
  showMessage: boolean = false;


  allUsers:any[]=[];
  constructor(private formBuilder: FormBuilder,private http : HttpClient,private router :Router) { }
  registerForm: FormGroup;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      role: ['', Validators.required]
    });

    const token = JSON.parse(sessionStorage.getItem('key')).token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      this.http.get('http://localhost:8082/api/admin/all', { headers, responseType: 'json' }).subscribe(
       {next: 
        (data: any) => {
          this.allUsers=data;
          // this.allManagers.push(...data.filter(item => item.role === 'Manager'));
          
        },
        error:
        (error) => {
          console.error('Error fetching data:', error);
        }
       } );
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    
  
    // Submit the form data
    console.log(this.registerForm.value);
    console.log(this.registerForm.value.role);
    this.postRole();
  }

  postRole(){

    const token = JSON.parse(sessionStorage.getItem('key')).token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    
    let body = {
      "role": this.registerForm.value.role
    };
    this.http.put('http://localhost:8082/api/admin/update/role/'+this.registerForm.value.userId, body,{headers,responseType:'text'}).subscribe((response)=>{
      console.log(response);
      this.showMessage=true;
      setTimeout(() => {
        this.showMessage = false;
      }, 3000); 
    })
  }

  clearForm():void{
    this.registerForm.patchValue({
      userId:'',
      role: ''
    });
  }
}
