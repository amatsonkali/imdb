import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie-service/movie.service';
import { Peli } from 'src/app/models/peli';
import { Clasificacion } from 'src/app/models/clasificacion';
import { Pais } from 'src/app/models/pais';
import { TipoMaterial } from 'src/app/models/tipoMaterial';
import Swal from 'sweetalert2';
import { Genero } from 'src/app/models/genero';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [MovieService]
})
export class MovieCreateComponent implements OnInit {

  pelicula: Peli;
  clasificaciones: Clasificacion[]=[];
  paises: Pais[]=[];
  tipoMateriales: TipoMaterial[];
  direccion: string;

  generosCatalogo: Genero[] = [{idGenero:1,tipoGenero:"accion", isChecked:false}];
  generosSub: Subscription;
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.catalogoClasificaciones().subscribe((clasificacion: Clasificacion[])=>{
      console.log(clasificacion);
      this.clasificaciones = clasificacion;
    });
    this.movieService.catalogoPaises().subscribe((pais: Pais[])=>{
      console.log(pais);
      this.paises = pais;
    });
    this.movieService.catalogoTipoMaterial().subscribe((tipoMaterial: TipoMaterial[])=>{
      console.log(tipoMaterial);
      this.tipoMateriales = tipoMaterial;
    });
  }

  onFileChanges(files){
    console.log("File is not null :: ", files);
    this.direccion = files[0].base64;
  }

  saveMovie(pelicula: Peli){
      if(this.direccion){
        pelicula.imagenPortada = this.direccion;
      }else{
        pelicula.imagenPortada = "";
      }
      this.movieService.savePelicula(pelicula).subscribe(data => { });
      Swal.fire({
        icon: 'success',
        title: 'La pelicula fue creada con éxito',
        showConfirmButton: false,
        timer: 1500
      });
  }
}
