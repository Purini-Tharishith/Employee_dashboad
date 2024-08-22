import { Component } from '@angular/core';
import { faHand, faListCheck, faLocationDot, faPencil, faUser,faEraser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manager-sidenav',
  templateUrl: './manager-sidenav.component.html',
  styleUrls: ['./manager-sidenav.component.css']
})
export class ManagerSidenavComponent {
 
  faUser= faUser;
  tasks=faListCheck;
  help=faHand;
  location=faLocationDot;
  update =faPencil
  remove= faEraser
}
