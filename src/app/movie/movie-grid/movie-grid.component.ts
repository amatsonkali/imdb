import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  pelis: Pelicula[] = [
    {idPelicula: 1,
      titulo: "Pelicula 1",
      sinopsis: "lorem ipsum",
      clasificacion: "B-15",
      calificacion: 10.00
    },
    {idPelicula: 2,
      titulo: "Pelicula 2",
      sinopsis: "lorem ipsum",
      clasificacion: "B-15",
      calificacion: 9.00
    },{idPelicula: 3,
      titulo: "Pelicula 3",
      sinopsis: "lorem ipsum",
      clasificacion: "B-14",
      calificacion: 8.00
    },
    {idPelicula: 4,
      titulo: "Pelicula 4",
      sinopsis: "lorem ipsum",
      clasificacion: "AA",
      calificacion: 6.50
    },
    ];

  loading=true;
  imageToShow: any;
  numColumnas: number = 3;
  pelisPerColums: any[]=[];
  constructor(public imageService: ImageService, public movieService:MovieService) { }

  ngOnInit(): void {
    this.getImageFromService();
  }

  getImageFromService() {
    this.pelis.forEach( (item,index)=>{
      this.imageService.getImage("https://loremflickr.com/"+this.getRandomInt(240,400)+"/"+this.getRandomInt(240,400)).subscribe(data => {
        this.createImageFromBlob(data,index);
      }, error => {
        this.loading = false;
        console.log(error);
      });
      
    })

    this.convertirArregloDado();
}

convertirArregloDado(){ //lo divide en el numero de tiles
  let modCounter;
  this.pelis.forEach((tile,index)=>{
    if(!this.pelisPerColums[index%3])
      this.pelisPerColums[index%3]=[];

    this.pelisPerColums[index%3].push(tile); 
  });
  console.log(this.pelisPerColums);
  this.loading=false;
}

createImageFromBlob(image: Blob, index: number) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      //this.imageToShow = reader.result;
      this.pelis[index].img= reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}

viewPeli(idPeli: number){
  console.log("Ver peli:" + idPeli);
  this.movieService.viewMovieDetails(idPeli);
}

// //   @ViewChild('pic', { static: false }) pic: ElementRef;
// //    onLoad() {
// //    console.log( (this.pic.nativeElement as HTMLImageElement).getAttribute("id")  );
// //    console.log((this.pic.nativeElement as HTMLImageElement).naturalWidth);
// //    console.log((this.pic.nativeElement as HTMLImageElement).naturalHeight);
// //  }

 getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

}
