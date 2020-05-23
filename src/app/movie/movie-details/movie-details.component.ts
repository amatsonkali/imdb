import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { MovieService } from '../movie-service/movie.service';
import { ImageService } from 'src/app/imageService/image.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  peli: Pelicula = {
    idPelicula: -1,
    titulo: "Aun no carga el titulo gg",
    duracion: "1hr",
    clasificacion: "B-14"
  };
  generos: string[]=["Accion","Aventura","Anime"];
  loading: boolean = true;

  constructor(public movieService: MovieService, public imageService: ImageService) {}

  ngOnInit(): void {
    this.peli.idPelicula = this.movieService.getselectedIdPeli();
    console.log("idPelicula: " + this.peli.idPelicula);
    this.getImageFromService();
  }

  getImageFromService() {
    this.imageService.getImage("https://loremflickr.com/" + this.getRandomInt(240, 400) + "/" + this.getRandomInt(240, 400)).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      this.loading = false;
      console.log(error);
    });

  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      //this.imageToShow = reader.result;
      this.peli.img = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


}
