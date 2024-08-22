import { Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Router, RouterModule, Routes } from '@angular/router';
import {Chart, registerables} from 'node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit{
  
  sideBarOpen = true;
  authtoken: any;
  constructor(private http : HttpClient,private router : Router){}
  token: string | null = null;
  ngOnInit(): void {
    this.CheckLogin();
  }
  

  public CheckLogin() {
    const sessionData = sessionStorage.getItem('key');
    if (sessionData) {
      const token = JSON.parse(sessionData).token;
      // Do something with the token
      if (!token) {
            this.router.navigateByUrl('/login')
          }
    } else {
      // Handle the case when 'key' is not found in session storage
      this.router.navigateByUrl('/login')
    }
  }
  
  // public CheckLogin(){
  //   const authtoken = JSON.parse(sessionStorage.getItem('key')).token;
  //   if (authtoken==null) {
  //     this.router.navigateByUrl('/login')
  //   }
  // }

  
  public sideBarToggler()
  {
    this.sideBarOpen = !this.sideBarOpen;
  }
  
}
