import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../service/profile.service';
import { faUser, faUserPen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent implements OnInit{
  editProfile=faUserPen;
  user=faUser;
  userProfile: any;
  userEmail:any=JSON.parse(sessionStorage.getItem('key')).email;
  userId:any;
  loginResponse:any=sessionStorage.getItem('key');
  constructor(private profileService: ProfileService) {}
  ngOnInit() {
    this.loadUserProfile();
  }
  skills:any[]=[];
  loadUserProfile() {
    this.profileService.getUserProfile().subscribe({
      next:
      (data) => {
        this.userProfile = data;
        this.skills=data.skills;
      },
      error:
      (error) => {
        console.error('Error fetching user profile:', error);
      }
  });
  }
  skill:string="";
  profile: any = {
    user_id: JSON.parse(sessionStorage.getItem('key')).user_id,
    phone_no: '',
    address: '',
    department_name: '',
    gender: '',
    skillId: []
  };
  profileInvalid=false;
  profileCreated=true;
  success=false;
  onSubmit() {
    this.profile.skillId=[...this.intSet];
      console.log('Submitted profile:', this.profile);
      this.profileService.addUserProfile(this.profile).subscribe({
        next:
        (res:any)=>{
          console.log(res);
          this.loadUserProfile();
          this.success=true;
        },
        error:
        (error:any)=>{
            console.log(error);
            this.profileCreated=false;
        }
      });
    // Here you can send the profile data to your backend server
  }
  intSet = new Set<number>();
  addSkill() {
    this.profileService.addSkills(this.skill).subscribe({
      next:
      (data) => {
       this.intSet.add(data.id);
       console.log(this.intSet);
      },
      error:
      (error) => {
        console.error('Error fetching user profile:', error);
      }
  });
  }
}
  



