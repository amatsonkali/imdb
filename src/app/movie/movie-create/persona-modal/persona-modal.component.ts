import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Persona } from 'src/app/models/persona';
import { Pais } from 'src/app/models/pais';
import { MovieService } from '../../movie-service/movie.service';

@Component({
  selector: 'app-persona-modal',
  templateUrl: './persona-modal.component.html',
  styleUrls: ['./persona-modal.component.css'],
  providers: [MovieService]
})
export class PersonaModalComponent implements OnInit {

  persona: Persona;
  direccion: string;
  paises: Pais[];

  constructor(private movieService: MovieService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.movieService.catalogoPaises().subscribe((pais: Pais[])=>{
      console.log(pais);
      this.paises = pais;
    });
  }

  onFileChanges(files){
    console.log("File is not null ::", files);
    this.direccion = files[0].base64;
  }

  savePersona(persona: Persona){
      
  }
}
