import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { MovieService } from '../movie-service/movie.service';
import { ImageService } from 'src/app/imageService/image.service';
import { Subscription } from 'rxjs';

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
  generos: string[]=["Accion","Aventura","Anime"];
  peliSub: Subscription;
  loading: boolean = true;

  constructor(public movieService: MovieService, public imageService: ImageService) {}

  ngOnInit(): void {
    this.movieService.getSelectedPeli();
    this.peliSub = this.movieService.getSelectedPeliListener().subscribe(
      (pelicula: Pelicula)=>{
        this.peli= pelicula;
        this.loading=false;
    });
  }

}
