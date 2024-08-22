import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.css']
})
export class UpdateprojectComponent implements OnInit{
  
  projectForm: FormGroup;
  isCreated= false;
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
}
   public onSubmit(){

  }

}
