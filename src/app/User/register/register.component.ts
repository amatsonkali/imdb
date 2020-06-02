import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import Swal from 'sweetalert2';

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
     if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.value.correo)
     && /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(form.value.password)){
       this.Registerservice.saveUsuario(form.value.nombre, form.value.correo, form.value.user, form.value.password);
     } else {
      Swal.fire({
        icon: 'warning',
        title: 'Correo y/o Contraseña no permitidas',
        text: "Debe ser un correo válido, y la contraseña debe de tener por lo menos una letra mayúscula, una minúscula y 6 caracteres de extensión ",
      });
     }

     console.log(form.value);
  }

  ngOnInit(): void {
  }



}
