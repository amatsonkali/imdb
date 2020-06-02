import { Component, OnInit, ViewChild, ElementRef, Input,OnChanges, SimpleChanges } from '@angular/core';
import { ImageService } from '../../imageService/image.service';
import { Pelicula } from 'src/app/models/pelicula';
import { MovieService } from '../movie-service/movie.service';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';
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
export class MovieGridComponent implements OnInit, OnChanges{

  @Input() pelis: Pelicula[] = [];

  loading=true;
  imageToShow: any;
  numColumnas: number = 3;
  pelisPerColums: any[]=[];
  constructor(public imageService: ImageService, public movieService:MovieService) { }

  ngOnInit(): void {

    this.convertirArregloDado();
  
  }
  ngOnChanges(changes: SimpleChanges): void {

    this.pelis= changes.pelis.currentValue;
    this.convertirArregloDado();
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values

  }
  
  
convertirArregloDado(){ //lo divide en el numero de tiles
  let modCounter;
  this.pelisPerColums=[];
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

deletePelicula(idPelicula: number){
  Swal.fire({
    title: 'Estás seguro?',
    text: "El borrado es permanente",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  }).then((result) => {
    if (result.value) {
      this.movieService.deletePelicula(idPelicula).subscribe(
        (data)=>{
          if(data[0][0]['resultado']==0){
            Swal.fire(
              'Peli borrada!',
              'Permanentemente, claro.',
              'success'
            )
            this.movieService.getPelisCalif();
            this.movieService.getPelisByGenero("Acción");
            this.movieService.getPelisEdad("AA");
          }else{
            Swal.fire(
              'Whoops!',
              'Algo ocurrió, sorry.',
              'error'
            )
          }
        }
      );
    }
  })
  
}

}
