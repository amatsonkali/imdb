import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie-service/movie.service';
import { Pelicula } from 'src/app/models/pelicula';
import { Clasificacion } from 'src/app/models/clasificacion';
import { Pais } from 'src/app/models/pais';
import { TipoMaterial } from 'src/app/models/tipoMaterial';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import { Persona } from 'src/app/models/persona';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Genero } from 'src/app/models/genero';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [MovieService]
})
export class MovieCreateComponent implements OnInit {

  pelicula: Pelicula;
  clasificaciones: Clasificacion[]=[];
  paises: Pais[]=[];
  tipoMateriales: TipoMaterial[];
  direccion: string;
  agregarPersona: boolean = false;
  generosCatalogo: Genero[] = [{idGenero:1,tipoGenero:"accion", isChecked:false}];
  generosSub: Subscription;

  personas: Persona[];
  selectedDirectores: Persona[]=[];
  selectedEscritores: Persona[]=[];
  selectedActores: Persona[]=[];
  personasSub: Subscription;
  constructor(private movieService: MovieService, public modalService: NgbModal) { }

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

    this.movieService.catalogoGeneros().subscribe(
      (generos: Genero[])=>{
        this.generosCatalogo= generos;
      }
    )

    this.movieService.getAllPersonas();
    this.personasSub = this.movieService.getPersonasListener().subscribe(
      (personas: Persona[])=>{
        this.personas= personas;
      }
    );
  }

  openModal(paises: Pais[], modal) {
    this.paises = paises;
    console.log("Hola", paises[1].nombrePais);
    this.modalService.open(modal);
  }

  onFileChanges(files){
    console.log("File is not null ::", files);
    this.direccion = files[0].base64;
  }

  saveMovie(pelicula: Pelicula){
      if(this.direccion){
        pelicula. imagenPortada = this.direccion;
      }else{
        pelicula. imagenPortada = "";
      }
      //this.movieService.savePelicula(pelicula).subscribe(data => { });
      console.log(this.selectedDirectores);
      console.log(this.selectedEscritores);
      console.log(this.selectedActores);
      Swal.fire({
        icon: 'success',
        title: 'La pelicula fue creada con éxito',
        showConfirmButton: false,
        timer: 1500
      });
  }
}
