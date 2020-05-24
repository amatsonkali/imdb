import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(public Registerservice: AuthenticationService) { }

  onRegister(form: NgForm) {
     if (form.invalid) {
      return;
     }
     this.Registerservice.saveUsuario(form.value.nombre, form.value.correo, form.value.user, form.value.password);
     console.log(form.value);
  }

  ngOnInit(): void {
  }



}
