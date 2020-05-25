import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public LoginService: AuthenticationService) { }

  onLogin(form: NgForm){
     if (form.invalid) {
      return;
     }
     this.LoginService.loginUsuario(form.value.username, form.value.password);
     console.log(form.value);
  }

  ngOnInit(): void {
    localStorage.clear();
    console.log(localStorage.clear());
  }



}
