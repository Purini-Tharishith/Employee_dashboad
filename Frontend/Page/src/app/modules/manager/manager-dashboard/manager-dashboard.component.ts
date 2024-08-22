import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit{
  sideBarOpen = true;
  public sideBarToggler()
  {
    this.sideBarOpen = !this.sideBarOpen;
  }
 
  ngOnInit(): void {
     
      
  }
}
