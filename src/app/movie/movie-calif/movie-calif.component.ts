import { Component, OnInit} from '@angular/core';
import {Calificacion} from 'src/app/models/calificacion';
import { MovieService } from '../movie-service/movie.service';
import { AuthenticationService } from 'src/app/User/authentication.service';

@Component({
  selector: 'app-movie-calif',
  templateUrl: './movie-calif.component.html',
  styleUrls: ['./movie-calif.component.css']
})
export class MovieCalifComponent implements OnInit {

  idUsuario = Number(localStorage.getItem('usuario'));

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
    this.calificacionUsuario.idUsuario = this.idUsuario;
  }

  saveCalificacion(calificacionUsuario: Calificacion){
    console.log(this.calificacionUsuario);
    this.movieService.saveCalificacion(calificacionUsuario).subscribe(data =>{
      this.movieService.getCalificacionesById().subscribe((calificaciones: Calificacion[]) =>{
        console.log(calificaciones);
        this.calificaciones = calificaciones;
      });
      calificacionUsuario.calificacion = 0;
      calificacionUsuario.subtitulo = '';
      calificacionUsuario.comentario = '';
    });
  }

}
