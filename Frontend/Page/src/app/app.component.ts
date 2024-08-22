import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './shared-data.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Page';
  sharedData: any;

  

}
