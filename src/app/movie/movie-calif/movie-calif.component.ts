import { Component, OnInit} from '@angular/core';
import {Calificacion} from 'src/app/models/calificacion';
import { MovieService } from '../movie-service/movie.service';

@Component({
  selector: 'app-movie-calif',
  templateUrl: './movie-calif.component.html',
  styleUrls: ['./movie-calif.component.css']
})
export class MovieCalifComponent implements OnInit {

  calificaciones : Calificacion[];
  calificacionUsuario: Calificacion = {
    calificacion : 0,
    subtitulo : '',
    comentario : '',
    idPelicula : 0,
    idUsuario : 0
  };
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getCalificacionesById().subscribe((calificaciones: Calificacion[]) =>{
      console.log(calificaciones);
      this.calificaciones = calificaciones;
    });
    this.calificacionUsuario.idPelicula = this.movieService.getselectedIdPeli();
  }

  saveCalificacion(){
    console.log(this.calificacionUsuario);
  }

}
