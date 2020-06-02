import { Component, OnInit} from '@angular/core';
import {Calificacion} from 'src/app/models/calificacion';
import { MovieService } from '../movie-service/movie.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/User/authentication.service';

@Component({
  selector: 'app-movie-calif',
  templateUrl: './movie-calif.component.html',
  styleUrls: ['./movie-calif.component.css']
})
export class MovieCalifComponent implements OnInit {

  idUsuario = Number(localStorage.getItem('usuario'));

  califU : boolean=false;
  calificaciones : Calificacion[];
  calificacionUsuario: Calificacion = {
    calificacion : 0,
    subtitulo : "",
    comentario : "",
    idPelicula : 0,
    idUsuario : 0
  };
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.califU=false;
    this.movieService.getCalificacionesById().subscribe((calificaciones: Calificacion[]) =>{
      console.log(calificaciones);
      this.calificaciones = calificaciones;
    });
    this.idUsuario = Number(localStorage.getItem('usuario'));
    this.calificacionUsuario.idPelicula = this.movieService.getselectedIdPeli();
    this.calificacionUsuario.idUsuario = this.idUsuario;
    console.log("ID usuario: "+this.calificacionUsuario.idUsuario);
  }

  saveCalificacion(calificacionUsuario: Calificacion){
    console.log(this.calificacionUsuario);
    console.log(calificacionUsuario);
    for(let i=0; i<this.calificaciones.length; i++){
      console.log("for: "+this.calificaciones[i].idUsuario+" "+this.calificacionUsuario.idUsuario);
      if(this.calificaciones[i].idUsuario == this.calificacionUsuario.idUsuario){
        this.califU = true;
      }
    };

    console.log(this.califU);
    if(this.califU){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya calificaste esta película. Consulte al administrador para más información',
      })
    }else{
      if(calificacionUsuario.calificacion==0 || calificacionUsuario.subtitulo == ''){
        Swal.fire({
          icon: 'info',
          title: 'Error',
          text: 'Ingresa los datos completos',
        })
      }else{
        this.calificacionUsuario.subtitulo = calificacionUsuario.subtitulo;
        this.calificacionUsuario.comentario = calificacionUsuario.comentario;
        this.calificacionUsuario.calificacion = calificacionUsuario.calificacion;
        this.movieService.saveCalificacion(this.calificacionUsuario).subscribe(data =>{
          console.log(data);
          this.movieService.getCalificacionesById().subscribe((calificaciones: Calificacion[]) =>{
            console.log(calificaciones);
            this.calificaciones = calificaciones;
            this.movieService.getSelectedPeli();
            this.califU=false;
          });
          // calificacionUsuario.calificacion = 0;
          // calificacionUsuario.subtitulo = '';
          // calificacionUsuario.comentario = '';
        });
      }
    }
  }
}
