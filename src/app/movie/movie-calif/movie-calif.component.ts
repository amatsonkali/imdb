import { Component, OnInit } from '@angular/core';
import {Calificacion} from 'src/app/models/calificacion';
import { MovieService } from '../movie-service/movie.service';

@Component({
  selector: 'app-movie-calif',
  templateUrl: './movie-calif.component.html',
  styleUrls: ['./movie-calif.component.css']
})
export class MovieCalifComponent implements OnInit {

  calificaciones : Calificacion[];
  constructor(private movieService : MovieService) { }

  ngOnInit(): void {
    this.movieService.getCalificacionesById().subscribe((calificaciones: Calificacion[]) =>{
      console.log(calificaciones);
      this.calificaciones = calificaciones;
    });
  }
}
