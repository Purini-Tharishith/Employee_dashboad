import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot ,Router} from '@angular/router';
import { SharedDataService } from './shared-data.service';

export const preRouteGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  //  console.log('pre-routeGuard is called');
  // // const router = inject(Router);
  // // const sharedDataService = new SharedDataService();
  // // const token = sharedDataService.getToken();
  // // console.log(token);
  // // if(token){
  // //   return true;
  // // }
  // // else{
  // //   router.navigateByUrl('/login')
  // //   return false;
  // // }

  // const sharedDataService = new SharedDataService(); // Instantiate SharedDataService
  // const token = sharedDataService.getToken(); // Get token from SharedDataService

  // if (token) {
  //   return true;
  // } else {
  //   const router = new Router(); // Instantiate Router
  //   router.navigateByUrl('/login'); // Navigate to login page
    return true;
};


