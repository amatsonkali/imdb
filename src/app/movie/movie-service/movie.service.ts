import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Pelicula } from 'src/app/models/pelicula';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  selectedIdPeli: number;

  urlPelisRating: string = "api/peliculas";
  urlPelisGenero: string = "api/peliculas/peliculasGenero/";
  urlPelisEdad: string = "api/peliculas/peliculasClasificacion/";
  urlPeliDetails: string = "api/peliculas/pelicula/";
  urlGenerosById: string = "api//peliculas/genero/"
  private pelisCalifUpdated = new Subject < Pelicula[] > ();
  private pelisGeneroUpdated = new Subject < Pelicula[] > ();
  private pelisEdadUpdated = new Subject < Pelicula[] > ();
  private selectedPeliUpdated= new Subject<Pelicula>();
  pelisCalif: Pelicula[];
  pelisGenero: Pelicula[];
  pelisEdad : Pelicula[];
  selectedPeli:Pelicula;
  
  constructor(private router: Router,private http: HttpClient, private sanitizer: DomSanitizer) { }

  viewMovieDetails(idPeli: number){
    this.selectedIdPeli = idPeli;
    this.router.navigate(['/movie']);
  }

  getselectedIdPeli(){
    return this.selectedIdPeli;
  }

  getPelisCalif(){
    this.http.get<any[]>(this.urlPelisRating).subscribe(
      (peliculasData)=>{
        this.pelisCalif=[];
        peliculasData.forEach( (peli,index)=>{

          this.pelisCalif.push({
            idPelicula:peli.idPelicula,
            titulo: peli.titulo,
            img: this.getUrlFromBlob(peli.imagenPortada.data),
            calificacion: peli.calificacionAvg
          });
        });
        this.pelisCalifUpdated.next([...this.pelisCalif]);
      }
    );
  }

  getPelisByGenero(genero: string){
    this.http.get<any[]>(this.urlPelisGenero+genero).subscribe(
      (peliculasData)=>{
        this.pelisGenero=[];
        peliculasData.forEach( (peli,index)=>{
          this.pelisGenero.push({
            idPelicula:peli.idPelicula,
            titulo: peli.titulo,
            img: this.getUrlFromBlob(peli.imagenPortada.data),
            calificacion: peli.calificacionAvg
          });
        });
        this.pelisGeneroUpdated.next([...this.pelisGenero]);
      }


    );
  }

  getPelisEdad(edad: string){
    this.http.get<any[]>(this.urlPelisEdad+edad).subscribe(
      (peliculasData)=>{
        this.pelisEdad=[];
        peliculasData.forEach( (peli,index)=>{
          this.pelisEdad.push({
            idPelicula:peli.idPelicula,
            titulo: peli.titulo,
            img: this.getUrlFromBlob(peli.imagenPortada.data),
            calificacion: peli.calificacionAvg
          })
          
        });
        this.pelisEdadUpdated.next([...this.pelisEdad]);
      }

    );
  }

  getSelectedPeli(){
    this.http.get<any>(this.urlPeliDetails+this.selectedIdPeli).subscribe(
      (peliculaData)=>{
        let peli= peliculaData[0];
        console.log(peliculaData);
        this.selectedPeli={
          idPelicula: peli.idPelicula,
          titulo: peli.titulo,
          duracion: peli.duracion,
          fechaEmision: peli.fechaEmision,
          sinopsis: peli.sinopsis,
          linkTrailer: peli.linkTrailer,
          img: this.getUrlFromBlob(peli.imagenPortada.data),
          pais: peli.nombrePais,
          clasificacion: peli.tipoClasificacion,
          tipoMaterial: peli.tipo,
          calificacion: peli.calificacionAvg,
          generos:[]
        }
        this.getGenerosById(this.selectedPeli.idPelicula);
      
    });
  }

  getGenerosById(idPeli: number){
    this.http.get<{tipoGenero:string}[]>(this.urlGenerosById+idPeli).subscribe(
      (generos)=>{
        generos.forEach((genero,index)=>{
          this.selectedPeli.generos.push(genero.tipoGenero);
        });
        this.selectedPeliUpdated.next({...this.selectedPeli});
    });
  }

  getPelisCalifListener(){
    return this.pelisCalifUpdated.asObservable();
  }

  getPelisGeneroListener(){
    return this.pelisGeneroUpdated.asObservable();
  }

  getPelisEdadListener(){
    return this.pelisEdadUpdated.asObservable();
  }

  getSelectedPeliListener(){
    return this.selectedPeliUpdated.asObservable();
  }

  getUrlFromBlob(blobData){
    let TYPED_ARRAY = new Uint8Array(blobData);
          const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
          /*let base64String = btoa(STRING_CHAR);
          console.log("TYPED_ARRAY:");
          console.log(TYPED_ARRAY);
          console.log("STRING_CHAR:");
          console.log(STRING_CHAR);
          console.log("base64String:");
          console.log(base64String);*/
          let image="";
          let imageUrl;
          if(STRING_CHAR != ""){
            image = 'data:image/jpg;base64,' + STRING_CHAR;
            imageUrl = this.getImgContent(image);
          }
          return imageUrl;
  }
  getImgContent(imgFile): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imgFile);
  }
}
