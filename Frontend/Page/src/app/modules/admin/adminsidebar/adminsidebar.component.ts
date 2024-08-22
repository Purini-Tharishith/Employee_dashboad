import { Component } from '@angular/core';
import { faListCheck,faUser,faHand,faLocationDot, faUsers, faEraser, faBriefcase } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css']
})
export class AdminsidebarComponent {
  
  manyUsers=faUsers;
  faUser= faUser;
  tasks=faListCheck;
  help=faHand;
  location=faLocationDot;
  remove= faEraser
  project=faBriefcase
  
}
