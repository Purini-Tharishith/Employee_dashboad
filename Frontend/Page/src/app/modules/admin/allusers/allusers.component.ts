import { Component ,OnInit} from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../shared-data.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit{

  constructor(private http : HttpClient,private router : Router,private sharedData : SharedDataService){}
  mySet: Set<object> = new Set<object>(); 
  length:number ;
  ngOnInit(): void {
    this.UserRequest();
  }
  allUsers:any[]=[];
  authority:any;
  public UserRequest(){
    const token = JSON.parse(sessionStorage.getItem('key')).token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('http://localhost:8082/api/admin/all', { headers, responseType: 'json' }).subscribe(
     {next: 
      (data: any) => {
        this.allUsers=data;
        sessionStorage.setItem('alluserkey',JSON.stringify(data));
        console.log(data);
        // this.mySet.add(data);
        // Object userData = this.mySet.get
        this.length = data.length;
        console.log(this.allUsers);
        console.log(this.length);
        this.authority = JSON.parse(sessionStorage.getItem('key')).authority;
  
      },
      error:
      (error) => {
        console.error('Error fetching data:', error);
      }
     } );
     
  }
}
