import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  constructor(public LoginService: AuthenticationService) { }

  onLogin(form: NgForm){
    if (form.invalid) {
     Swal.fire({
       icon: 'error',
       title: 'Ingrese todos los datos',
       showConfirmButton: false,
       timer: 2000
     });
    }else{
     this.LoginService.loginUsuario(form.value.username, form.value.password);
    }
    console.log(form.value);
 }

  ngOnInit(): void {
    localStorage.clear();
    console.log(localStorage.clear());
  }



}
