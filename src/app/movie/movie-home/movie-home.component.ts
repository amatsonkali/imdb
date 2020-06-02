import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie-service/movie.service';
import { Subscription } from 'rxjs';
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.css']
})
export class MovieHomeComponent implements OnInit {
  dato = (localStorage.getItem('usuario'));
  user = localStorage.getItem('admin');
  peliCaliSub : Subscription;
  peliGenSub: Subscription;
  peliEdadSub: Subscription;
  pelisCalif : Pelicula[];
  pelisGenero: Pelicula[];
  pelisEdad : Pelicula[];
  constructor(public movieService:MovieService) { }

  ngOnInit(): void {
    //console.log(this.dato);
    console.log(this.user);
    this.movieService.getPelisCalif();
    this.movieService.getPelisByGenero("Acción");
    this.movieService.getPelisEdad("AA");
    this.susbscribeToAll();
  }

  susbscribeToAll(){
    this.peliCaliSub = this.movieService.getPelisCalifListener().subscribe(
      (pelis: Pelicula[])=>{
        console.log("Si actualizó");
        console.log(pelis);
        this.pelisCalif=pelis;
      });
    this.peliGenSub = this.movieService.getPelisGeneroListener().subscribe(
      (pelis: Pelicula[])=>{
        this.pelisGenero= pelis;
    });
    this.peliEdadSub = this.movieService.getPelisEdadListener().subscribe(
      (pelis: Pelicula[])=>{
        this.pelisEdad= pelis;
    });
  }

}
