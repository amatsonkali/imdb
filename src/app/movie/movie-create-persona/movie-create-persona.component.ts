import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie-service/movie.service';
import { Pais } from 'src/app/models/pais';
import { Persona } from 'src/app/models/persona';
import { TipoProfesion } from 'src/app/models/tipoProfesion';

@Component({
  selector: 'app-movie-create-persona',
  templateUrl: './movie-create-persona.component.html',
  styleUrls: ['./movie-create-persona.component.css']
})
export class MovieCreatePersonaComponent implements OnInit {

  direccionPersona: string;
  nombre: string = "";
  paises: Pais[]=[];
  tipoProfesionesCatalogo: TipoProfesion[] = [{idtipoProfesion:1,tipo:"accion", isChecked:false}];
  idPersona: number=-1;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
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
    if(this.direccionPersona){
      persona.imagenPersona = this.direccionPersona;
    }else{
      persona.imagenPersona = "";
    }
    this.nombre = persona.nombre;
    this.movieService.savePersona(persona).subscribe(data => {
      console.log("Data",data[0][0].persona_insertada);
      this.idPersona=data[0][0].persona_insertada;
      if(this.idPersona != -1){
        this.savePersonaTipoProfesion();
       }
     });
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
  }
}
