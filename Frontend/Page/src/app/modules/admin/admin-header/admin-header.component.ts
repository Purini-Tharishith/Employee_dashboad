import { Component,OnInit,EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  
  constructor(private router : Router){}
  name:string;
  ngOnInit(): void {
    const sessionData = sessionStorage.getItem('key');
    if (sessionData) {
    const token = JSON.parse(sessionStorage.getItem('key')).token;
    this.name = JSON.parse(sessionStorage.getItem('key')).firstName;
    if (!token) {
      this.router.navigateByUrl('/login')
    }
  }
  else{
    this.router.navigateByUrl('/login');
  }
      
  }
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  

  logout(){
    sessionStorage.removeItem('key');
    sessionStorage.removeItem('taskkey');
    this.router.navigateByUrl('/login');
  }
}
