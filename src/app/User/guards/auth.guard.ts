import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(public LoginService: AuthenticationService, private router: Router){}

  canActivate(){
    if(this.LoginService.isLoggedUser()){
      return true;
    }else{
      Swal.fire({
        icon: 'error',
        title: 'No se puede acceder así',
        showConfirmButton: false,
        timer: 2000
      });
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 2030);
      return false;
    }
  }
}
