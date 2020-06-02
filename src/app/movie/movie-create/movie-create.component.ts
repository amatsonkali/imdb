import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie-service/movie.service';
import { Pelicula } from 'src/app/models/pelicula';
import { Clasificacion } from 'src/app/models/clasificacion';
import { Pais } from 'src/app/models/pais';
import { TipoMaterial } from 'src/app/models/tipoMaterial';
import Swal from 'sweetalert2';
import { Genero } from 'src/app/models/genero';
import { Subscription } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { strict } from 'assert';

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
  idPersona: number=-1;
  direccion: string;
  generosCatalogo: Genero[] = [{idGenero:1,tipoGenero:"accion", isChecked:false}];
  personas: Persona[];
  selectedDirectores: Persona[]=[];
  selectedEscritores: Persona[]=[];
  selectedActores: Persona[]=[];
  personasSub: Subscription;
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

  onFileChanges(files){
    console.log("File is not null ::", files);
    this.direccion = files[0].base64;
  }

  saveMovie(pelicula: Pelicula){
    if(this.checkStaff()){
      if(this.checkActores()){
        if(this.checkTrailerLink(pelicula.linkTrailer)){
          if(this.direccion){
            pelicula.img = this.direccion;
          }else{
            pelicula.img = "";
          }
          //console.log("longitud: "+this.selectedDirectores.length);
          this.movieService.savePelicula(pelicula).subscribe(data => {
            console.log(data);
            if(!('errno' in data)){
              if(data[0][0]['last_insert_id()']>0){ //se insertó la peli, a guardar mas cosas
                this.saveGeneros(data[0][0]['last_insert_id()']);
                this.saveDirectores(data[0][0]['last_insert_id()']);
                this.saveEscritores(data[0][0]['last_insert_id()']);
                this.saveActores(data[0][0]['last_insert_id()']);
                Swal.fire({
                  icon: 'success',
                  title: 'La pelicula fue creada con éxito',
                  showConfirmButton: false,
                  timer: 1500
                });
                setTimeout(() => {
                  this.movieService.goToHome();
                }, 2025);
              }
            }else{
                if(data['errno']==1062){
                  Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Peli duplicada! Intenta con otro nombre',
                        })
                  
                }else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrió un error, código '+data['errno'],
                    })
                }
              } 
              
            
           });

        }

      }else{ this.warningToast('Asigna un personaje a cada actor pls'); }
    } else{
      this.warningToast('Directores/Escritores/Actores inválidos');
    }
  }

  saveGeneros(idPelicula: number) {
    this.generosCatalogo.forEach((genero, index) => {
      if (genero.isChecked) {
        console.log("Insertando genero...")
        this.movieService.saveGenerosPelicula(idPelicula, genero.idGenero).subscribe(
          (data) => {
            console.log(data);
          });
      }
    });
  }
  saveDirectores(idPelicula: number) {
    this.selectedDirectores.forEach((director, index) => {
      this.movieService.savePersonaPelicula(idPelicula, director.idPersona).subscribe(
        (data) => {
          let idPersonaPeli = 0;
          if (data[0][0]['personaPeli_exists']) {
            console.log("Director: Persona-pelicula ya existía, ntp");
            idPersonaPeli = data[0][0]['personaPeli_exists'];
          } else if (data[0][0]['personaPelicula_insertada']) {
            console.log("Persona-pelicula insertado, insertando en director..");
            idPersonaPeli = data[0][0]['personaPelicula_insertada'];
          }
          this.movieService.saveDirector(idPersonaPeli).subscribe(
            (data) => {
              console.log("Inserción del director: ");
              this.movieService.savePersonaTipoProfesion({idPersona:director.idPersona, idtipoProfesion:3});
            }
          )
        }
      );
    });
  }

  saveEscritores(idPelicula: number) {
    this.selectedEscritores.forEach((escritor, index) => {
      this.movieService.savePersonaPelicula(idPelicula, escritor.idPersona).subscribe(
        (data) => {
          let idPersonaPeli = 0;
          if (data[0][0]['personaPeli_exists']) {
            console.log("Escritor: Persona-pelicula ya existía, ntp");
            idPersonaPeli = data[0][0]['personaPeli_exists'];
          } else if (data[0][0]['personaPelicula_insertada']) {
            console.log("Persona-pelicula insertado, insertando en escritores..");
            idPersonaPeli = data[0][0]['personaPelicula_insertada'];
          }
          this.movieService.saveEscritor(idPersonaPeli).subscribe(
            (data) => {
              console.log("Inserción de escritor... ");
              this.movieService.savePersonaTipoProfesion({idPersona:escritor.idPersona, idtipoProfesion:4});
            }
          )
        }
      );
    });
  }

  saveActores(idPelicula: number) {
    this.selectedActores.forEach((actor, index) => {
      this.movieService.savePersonaPelicula(idPelicula, actor.idPersona).subscribe(
        (data) => {
          let idPersonaPeli = 0;
          console.log(data);
          if (data[0][0]['personaPeli_exists']) {
            console.log("Actor :Persona-pelicula ya existía, ntp " + data[0][0]['personaPeli_exists']);
            idPersonaPeli = data[0][0]['personaPeli_exists'];
          } else if (data[0][0]['personaPelicula_insertada']) {
            console.log("Persona-pelicula insertado, insertando en actores..");
            idPersonaPeli = data[0][0]['personaPelicula_insertada'];
          }
          this.movieService.saveActor(idPersonaPeli, actor.personajes[0], actor.estelar).subscribe(
            (data) => {
              console.log("Inserción de actor... ");
              this.movieService.savePersonaTipoProfesion({idPersona:actor.idPersona, idtipoProfesion:1});
            }
          )
        }
      );
    });
  }

  checkStaff(){
    return this.selectedDirectores.length>0 && this.selectedEscritores.length>0 && this.selectedActores.length>0;
  }
  checkActores(){
    let check: boolean = true;
    this.selectedActores.forEach(
      (actor,index)=>{
        //console.log(actor.personajes);
        if(!('personajes' in actor)){
          check = false;
        }else if(actor.personajes.length<=0) check = false;
    });
    return check;
  }

  checkTrailerLink(link: string){
    console.log("Comparando: "+link);
    if(!/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/.test(link)){
      this.warningToast("Link de trailer inválido (solo YT pls)")
      return false;
    }
    return true;

  }

  warningToast(mensaje: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'warning',
      title: mensaje
    })
  }


}
