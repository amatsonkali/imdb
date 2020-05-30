import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { MovieService } from '../movie-service/movie.service';
import { ImageService } from 'src/app/imageService/image.service';
import { Subscription } from 'rxjs';
import { Persona, Star } from 'src/app/models/persona';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  peli: Pelicula = {
    idPelicula: -1,
    titulo: "Aun no carga el titulo gg",
    duracion: "Sin duracion",
    clasificacion: "Sin clasificacion"
  };
  peliSub: Subscription;
  loading = true;

  personaSub: Subscription;
  persona: Persona = {
    idPersona: -1,
    nombre: "No ha cargado el nombre"
  };

  actores: Star[]=[];
  actoresSub: Subscription;


  constructor(public movieService: MovieService, public imageService: ImageService) {
  }

  ngOnInit(): void {
    this.movieService.getSelectedPeli();
    this.peliSub = this.movieService.getSelectedPeliListener().subscribe(
      (pelicula: Pelicula) => {
        this.peli = pelicula;
        this.loading = false;
    });

    this.movieService.getSelectedPersona();
    this.personaSub = this.movieService.getSelectedPersonaListener().subscribe(
      (persona: Persona) => {
        this.persona = persona;
      });

    this.movieService.getActores();
    this.actoresSub = this.movieService.getActoresUpdateListener()
    .subscribe((actores: Star[])=>{
      console.log(actores);
      this.actores= actores;
    });
  }
}
