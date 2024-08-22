import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  ProfileUrl="http://localhost:8081/api/user";
  skillUrl="http://localhost:8081/api/skill/add";
  jsonData:any;
  userEmail=JSON.parse(sessionStorage.getItem('key')).email;
  user_id=JSON.parse(sessionStorage.getItem('key')).user_id;
  constructor(private http: HttpClient) {}
  getUserProfile(): Observable<any> {
    // Make HTTP request to check if user profile exists
    return this.http.get<any>(`${this.ProfileUrl}/${this.user_id}`);
  }
  addUserProfile(profileData: any): Observable<any> {
    // Make HTTP request to add/update user profile
    const data=JSON.stringify(profileData);
    console.log(JSON.parse(data));
    return this.http.post<any>(`${this.ProfileUrl}/profile`,JSON.parse(data),{responseType:'json'});
  }
  addSkills(skill:string){
    return this.http.post<any>(`${this.skillUrl}`,{name:skill},{responseType:'json'});
  }










}
