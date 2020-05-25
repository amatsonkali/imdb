import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import { usuario, usuarioLogin } from '../models/usuario';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private saveUsuarioUrl = '/api/usuarios';
  private loginUsuarioUrl = '/api/usuarios/login';
  var = 1;
  constructor(private http: HttpClient, private router: Router) {
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  saveUsuario(nombre: string, email: string, username: string, password: string) {
    const Usuario: usuario = {nombre, email, username, password};
    this.http.post(this.saveUsuarioUrl, Usuario)
    .subscribe(response => {
            if ('1' in response[0][0]){
                Swal.fire({
                  icon: 'success',
                  title: 'Cuenta creada correctamente',
                  showConfirmButton: false,
                  timer: 2000
                });
                setTimeout(() => {
                  this.gotoLogin();
                }, 2025);
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Datos invalidos o ya registrados',
                showConfirmButton: false,
                timer: 2000
              });
            }
    });
  }

  loginUsuario(username: string, password: string){
    const Usuario: usuarioLogin = {username, password};
    this.http.post(this.loginUsuarioUrl, Usuario)
    .subscribe(response => {
      console.log(response[0][0]);
      if ('1' in response[0][0]){
        Swal.fire({
          icon: 'success',
          title: 'BIENVENIDO',
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          this.gotoHome();
          localStorage.setItem('usuario', username);
        }, 2025);
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Datos invalidos',
          showConfirmButton: false,
          timer: 2000
        });
      }
      });
  }

}
