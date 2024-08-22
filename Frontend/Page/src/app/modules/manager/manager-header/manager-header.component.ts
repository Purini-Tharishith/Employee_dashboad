import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-header',
  templateUrl: './manager-header.component.html',
  styleUrls: ['./manager-header.component.css']
})
export class ManagerHeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router :Router){}

  data : any ;
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  ngOnInit(): void {
    this.data = JSON.parse(sessionStorage.getItem('key'));
  }
  
  logout(){
    console.log("logout click is working");
    sessionStorage.removeItem('key');
    this.router.navigateByUrl('../login');
  }
  
}
