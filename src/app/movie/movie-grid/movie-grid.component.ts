import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ImageService } from '../../imageService/image.service';
import { Pelicula } from 'src/app/models/pelicula';
import { MovieService } from '../movie-service/movie.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  img?: any;
}
@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit {

  @Input() pelis: Pelicula[] = [];

  loading=true;
  imageToShow: any;
  numColumnas: number = 3;
  pelisPerColums: any[]=[];
  constructor(public imageService: ImageService, public movieService:MovieService) { }

  ngOnInit(): void {

    this.convertirArregloDado();
  
  }
convertirArregloDado(){ //lo divide en el numero de tiles
  let modCounter;
  this.pelis.forEach((tile,index)=>{
    if(!this.pelisPerColums[index%3])
      this.pelisPerColums[index%3]=[];

    this.pelisPerColums[index%3].push(tile); 
  });
  //console.log(this.pelisPerColums);
  this.loading=false;
}

viewPeli(idPeli: number){
  console.log("Ver peli:" + idPeli);
  this.movieService.viewMovieDetails(idPeli);
}

 getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

}
