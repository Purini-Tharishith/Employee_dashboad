import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-default-dashboard',
  templateUrl: './default-dashboard.component.html',
  styleUrls: ['./default-dashboard.component.css']
})
export class DefaultDashboardComponent implements OnInit {
  chartLabels = [];
  chartData = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const token = JSON.parse(sessionStorage.getItem('key')).token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:8083/api/project/details', { headers, responseType: 'json' }).subscribe(
      (response) => {
        console.log(response);
        sessionStorage.setItem('projectkey', JSON.stringify(response));
        this.processProjectData(response);
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  processProjectData(response: any[]): void {
    const projectCounts = {
      COMPLETED: 0,
      IN_PROGRESS: 0,
      ON_HOLD: 0
    };

    response.forEach(project => {
      if (project.status in projectCounts) {
        projectCounts[project.status]++;
      }
    });

    this.chartLabels = Object.keys(projectCounts);
    this.chartData = Object.values(projectCounts);

    setTimeout(() => {
      this.renderPieChart();
      this.renderTaskPieChart();
    });
  }

  renderPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Project Status',
          data: this.chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)', // COMPLETED
            'rgba(54, 162, 235, 0.5)', // IN_PROGRESS
            'rgba(255, 206, 86, 0.5)', // ON_HOLD
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  renderTaskPieChart(): void {
    const projectData = JSON.parse(sessionStorage.getItem('projectkey'));
    const taskCounts = {
      COMPLETED: 0,
      IN_PROGRESS: 0,
      ON_HOLD: 0
    };

    projectData.forEach(project => {
      project.tasks.forEach(task => {
        if (task.status in taskCounts) {
          taskCounts[task.status]++;
        }
      });
    });

    const chartLabels = Object.keys(taskCounts);
    const chartData = Object.values(taskCounts);

    const ctx = document.getElementById('taskpieChart') as HTMLCanvasElement;
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Task Status',
          data: chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)', // COMPLETED
            'rgba(54, 162, 235, 0.5)', // IN_PROGRESS
            'rgba(255, 206, 86, 0.5)', // ON_HOLD
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
