import { Component, OnInit ,EventEmitter,Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  name :string;
  constructor(private router : Router){}
  ngOnInit(): void {
    const sessionData = sessionStorage.getItem('key');
    if (sessionData) {
  this.name = JSON.parse(sessionStorage.getItem('key')).firstName;

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
