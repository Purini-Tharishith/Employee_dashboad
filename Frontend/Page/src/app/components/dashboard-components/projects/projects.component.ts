import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  constructor(){}
  projectData: any;

  ngOnInit(): void {
      this.projectData = JSON.parse(sessionStorage.getItem('taskkey'));
      console.log(this.projectData);
      console.log(this.projectData.project_id);
  }

}
