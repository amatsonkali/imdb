import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { usuario } from '../models/usuario';



@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private saveUsuarioUrl = '/register';

  constructor(private http: HttpClient, private router: Router) {
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  saveUsuario(nombre: string, email: string, username: string, password: string) {
    const Usuario: usuario = {nombre, email, username, password};
    this.http.post(this.saveUsuarioUrl, Usuario)
    .subscribe(response => {
            //this.gotoLogin();
    });
}
}
