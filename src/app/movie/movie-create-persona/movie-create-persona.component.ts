import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie-service/movie.service';
import { Pais } from 'src/app/models/pais';
import { Persona } from 'src/app/models/persona';
import { TipoProfesion } from 'src/app/models/tipoProfesion';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../User/authentication.service';

@Component({
  selector: 'app-movie-create-persona',
  templateUrl: './movie-create-persona.component.html',
  styleUrls: ['./movie-create-persona.component.css']
})
export class MovieCreatePersonaComponent implements OnInit {

  agregarPersonaForm: boolean = false;
  direccionPersona: string;
  nombre: string = "";
  paises: Pais[]=[];
  tipoProfesionesCatalogo: TipoProfesion[] = [{idtipoProfesion:1,tipo:"accion", isChecked:false}];
  idPersona: number=-1;
  undefined: any = undefined;
  resetForm:HTMLFormElement;
  resetFormProf:HTMLFormElement;
  isAdmin: boolean;

  constructor(private movieService: MovieService, public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.isAdmin = this.auth.checkAdmin();
    this.movieService.catalogoPaises().subscribe((pais: Pais[])=>{
      console.log(pais);
      this.paises = pais;
    });

    this.movieService.catalogoTipoProfesion().subscribe(
      (tipoProfesion: TipoProfesion[]) => {
        this.tipoProfesionesCatalogo = tipoProfesion;
      }
    )
  }

  savePersona(persona: Persona){
    if(persona.nombre=="" || !persona.fechaNacimiento || persona.miniBiografia=="" || !this.direccionPersona || persona.idPais==null){
      Swal.fire({
        icon: 'info',
        title: 'Error',
        text: 'Ingresa los datos completos',
      })
    }else{
    if(this.direccionPersona){
      persona.imagenPersona = this.direccionPersona;
    }else{
      persona.imagenPersona = "";
    }
    this.nombre = persona.nombre;
    this.movieService.savePersona(persona).subscribe(data => {
      if (data[0][0].persona_insertada != null) {
        console.log("Data",data[0][0].persona_insertada);
        this.idPersona=data[0][0].persona_insertada;
        this.savePersonaTipoProfesion();
       }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Esa persona ya fue registrada',
        })
       }
     });
    }
  }

  onFilePersona(files){
    console.log("File is not null ::", files);
    this.direccionPersona = files[0].base64;
  }

  savePersonaTipoProfesion(){
    for(var i = 0; i<this.tipoProfesionesCatalogo.length; i++){
      if(this.tipoProfesionesCatalogo[i].isChecked === true){
        this.tipoProfesionesCatalogo[i].idPersona = this.idPersona;
        console.log(this.tipoProfesionesCatalogo[i]);
        this.movieService.savePersonaTipoProfesion(this.tipoProfesionesCatalogo[i]).subscribe(data => { });
      }
    }
    this.idPersona=-1;
    Swal.fire({
      icon: 'success',
      title: 'La persona fue creada con éxito',
      showConfirmButton: false,
      timer: 1500
    });
    this.movieService.getAllPersonas();
    this.clearForm();
  }

  clearForm(){
    this.resetForm= <HTMLFormElement>document.getElementById('Persona');
    this.resetFormProf= <HTMLFormElement>document.getElementById('profesiones');
    this.direccionPersona = '';
    if(this.resetForm)
        this.resetForm.reset();
    for(var i = 0; i<this.tipoProfesionesCatalogo.length; i++)
      this.tipoProfesionesCatalogo[i].isChecked = false;
  }

  newPersona(){
    this.agregarPersonaForm = true;
  }

  quitPersona(){
    this.agregarPersonaForm = false;
  }
}
