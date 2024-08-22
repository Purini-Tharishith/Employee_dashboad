import { Component } from '@angular/core';
import { faListCheck,faUser,faHand,faLocationDot, faPencil } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  
  faUser= faUser;
  tasks=faListCheck;
  help=faHand;
  location=faLocationDot;
  update =faPencil
}
