import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../shared-data.service';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

import {Chart, registerables} from 'node_modules/chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit{
  
  
  constructor(private http:HttpClient,private  router : Router){}
  projectData: any;
  chartdata : any ;
  labeldata: any[]=[];
  taskCounts: any = {};
  length:any;
  ngOnInit(): void {   
    const sessionData = sessionStorage.getItem('key');
    if (sessionData) {
    const token = JSON.parse(sessionStorage.getItem('key')).token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    
    this.http.get('http://localhost:8083/api/task/user', { headers, responseType: 'json' }).subscribe(
      (data: any) => {
       console.log(data);
       this.chartdata = data;
       this.projectData = data;
       this.length = this.projectData.tasks.length;
      //  this.length = data.length;
      //  console.log(this.length);
       sessionStorage.setItem('taskkey',JSON.stringify(data));
      
       this.taskCounts = {
        COMPLETED: 0,
        IN_PROGRESS: 0,
        ON_HOLD: 0
      };

      this.chartdata.tasks.forEach(task => {
        if (task.status in this.taskCounts) {
          this.taskCounts[task.status]++;
        }
      });
  
      console.log(this.length);
      Object.keys(this.taskCounts).forEach(status => {
        if (this.taskCounts[status] > 0) {
          this.labeldata.push(`${status} (${this.taskCounts[status]})`);
        }
      });

      // Render chart
      this.renderChart();

      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    }
  }


  renderChart() {
    const myChart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: this.labeldata,
        datasets: [{
          label: '# of Tasks',
          data: Object.values(this.taskCounts),
          backgroundColor: [
            'rgba(255, 140, 0, 0.2)',  
            'rgba(139, 0, 0, 0.2)',     
            'rgba(0, 0, 139, 0.2)'     
        ],
        borderColor: [
          'rgba(255, 140, 0, 0.2)',  
          'rgba(139, 0, 0, 0.2)',     
          'rgba(0, 0, 139, 0.2)'  
        ]
          
        ,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            display: false
          }
        }
      }
    });
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
}
