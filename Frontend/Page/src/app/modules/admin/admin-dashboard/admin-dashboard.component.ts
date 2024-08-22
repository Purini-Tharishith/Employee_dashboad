import { Component ,OnInit} from '@angular/core';
import { SharedDataService } from '../../../shared-data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  
  constructor(private sharedData : SharedDataService,private router : Router){}
  sideBarOpen = true;
  ngOnInit(): void {
    this.checkToken();
  }

  
  public sideBarToggler()
  {
    this.sideBarOpen = !this.sideBarOpen;
  }
  

  public checkToken(){
    const sessionData = sessionStorage.getItem('key');
    if (sessionData) {
    const token = JSON.parse(sessionStorage.getItem('key')).token
    if (!token) {
      this.router.navigateByUrl('/login')
    }
  }
}
}
