import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Pelicula } from 'src/app/models/pelicula';
import { Clasificacion } from 'src/app/models/clasificacion';
import { Pais } from 'src/app/models/pais';
import { TipoMaterial } from 'src/app/models/tipoMaterial';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Calificacion } from 'src/app/models/calificacion';
import { Persona, Star } from 'src/app/models/persona';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  selectedIdPeli: number;

  urlPelisRating: string = "api/peliculas";
  urlPelisGenero: string = "api/peliculas/peliculasGenero/";
  urlPelisEdad: string = "api/peliculas/peliculasClasificacion/";
  urlPeliDetails: string = "api/peliculas/pelicula/";
  urlGenerosById: string = "api/peliculas/genero/";
  urlCalificacionById: string = "api/peliculas/calificacionesPelicula/";

  private pelisCalifUpdated = new Subject < Pelicula[] > ();
  private pelisGeneroUpdated = new Subject < Pelicula[] > ();
  private pelisEdadUpdated = new Subject < Pelicula[] > ();
  private selectedPeliUpdated = new Subject<Pelicula>();

  pelisCalif: Pelicula[];
  pelisGenero: Pelicula[];
  pelisEdad : Pelicula[];
  selectedPeli:Pelicula;

  private urlClasificaciones = 'api/clasificaciones';
  private urlPaises = 'api/paises';
  private urlTipoMaterial = 'api/tipoMaterial';
  private urlsavePelicula = 'api/peliculas/pelicula';
  private urlSaveCalificacion = 'api/peliculas/calificacion/';

  clasificacion: Clasificacion[];
  pais: Pais[];
  tipoMaterial: TipoMaterial[];
  calificaciones: Calificacion[];


  urlGETPersonas = 'api/personas/aleatorio'
  urlGETDirectores = 'api/personas/directores/'
  urlGETEscritores = 'api/personas/escritores/'

  private selectedPersonaUpdated = new Subject<Persona>();
  private selectEscritoresUpdated = new Subject<Persona>();
  private actoresUpdated = new Subject <Star[]>();
  Allpersonas: Star
  Actores: Star[]
  personaDirector: Persona[]
  personaEscritor: Persona[]


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
    this.http.get<any>(this.urlPeliDetails + this.selectedIdPeli).subscribe(
      (peliculaData)=>{
        let peli = peliculaData[0];
        console.log(peliculaData);
        this.selectedPeli = {
          idPelicula: peli.idPelicula,
          titulo: peli.titulo,
          duracion: peli.duracion,
          fechaEmision: peli.fechaEmision,
          sinopsis: peli.sinopsis,
          linkTrailer: this.getVideoIframe(peli.linkTrailer),
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
    this.http.get<{tipoGenero:string}[]>(this.urlGenerosById + idPeli).subscribe(
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
    const STRING_CHAR = this.utf8ArrayToStr(blobData); // String.fromCharCode.apply(null, TYPED_ARRAY);
          //console.log("STRING_CHAR:");
          //console.log(STRING_CHAR);
          /*let base64String = btoa(STRING_CHAR);
          console.log("TYPED_ARRAY:");
          console.log(TYPED_ARRAY);
          console.log("base64String:");
          console.log(base64String);*/
          let image="";
          let imageUrl;
          if(STRING_CHAR != ""){
            if(!STRING_CHAR.startsWith('data:')){
              image = 'data:image/jpg;base64,' + STRING_CHAR;
              imageUrl = this.getImgContent(image);
            }else imageUrl= STRING_CHAR;

          }
          return imageUrl;
  }

  getVideoIframe(url) {
    var video, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
}

  getImgContent(imgFile): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imgFile);
  }

  catalogoClasificaciones() {
    return this.http.get<Clasificacion[]>(this.urlClasificaciones);
  }

  catalogoPaises() {
    return this.http.get<Pais[]>(this.urlPaises);
  }

  catalogoTipoMaterial() {
    return this.http.get<TipoMaterial[]>(this.urlTipoMaterial);
  }

  savePelicula(pelicula: Pelicula) {
    return this.http.post<Pelicula>(this.urlsavePelicula, pelicula);
  }

  getCalificacionesById(){
    return this.http.get<Calificacion[]>(this.urlCalificacionById + this.selectedIdPeli);
  }

  saveCalificacion(calificacion: Calificacion){
    return this.http.post<Calificacion>(this.urlSaveCalificacion, calificacion);
  }



  utf8ArrayToStr = (function () {
    var charCache = new Array(128);  // Preallocate the cache for the common single byte chars
    var charFromCodePt = String.fromCodePoint || String.fromCharCode;
    var result = [];

    return function (array) {
        var codePt, byte1;
        var buffLen = array.length;

        result.length = 0;

        for (var i = 0; i < buffLen;) {
            byte1 = array[i++];

            if (byte1 <= 0x7F) {
                codePt = byte1;
            } else if (byte1 <= 0xDF) {
                codePt = ((byte1 & 0x1F) << 6) | (array[i++] & 0x3F);
            } else if (byte1 <= 0xEF) {
                codePt = ((byte1 & 0x0F) << 12) | ((array[i++] & 0x3F) << 6) | (array[i++] & 0x3F);
            } else if (String.fromCodePoint) {
                codePt = ((byte1 & 0x07) << 18) | ((array[i++] & 0x3F) << 12) | ((array[i++] & 0x3F) << 6) | (array[i++] & 0x3F);
            } else {
                codePt = 63;    // Cannot convert four byte code points, so use "?" instead
                i += 3;
            }

            result.push(charCache[codePt] || (charCache[codePt] = charFromCodePt(codePt)));
        }

        return result.join('');
    };
})();


/* PERSONAS */

getPersonaDirectores(){
  this.http.get<{nombre:string}[]>(this.urlGETDirectores + this.getselectedIdPeli()).subscribe(
    (nombreDirectores)=>{
      this.personaDirector=[];
      nombreDirectores.forEach( (persona,index)=>{
        this.Allpersonas.nombreDirectores.push(persona.nombre)
        console.log(this.Allpersonas.nombreDirectores);
      });
      this.selectedPersonaUpdated.next({...this.Allpersonas});
    });
}

getPersonaEscritores(){
  this.http.get<{nombre:string}[]>(this.urlGETEscritores + this.getselectedIdPeli()).subscribe(
    (personasData)=>{
      //this.personaEscritor=[];
      personasData.forEach( (persona,index)=>{
        this.Allpersonas.nombreEscritores.push(persona.nombre)
        console.log(this.Allpersonas.nombreEscritores);
      });
      this.selectEscritoresUpdated.next({...this.Allpersonas});
    });
}

getSelectedPersona(){
  this.http.get<any>(this.urlGETPersonas).subscribe(
    (personaData)=>{
      let perso = personaData;
      console.log(personaData);
      this.Allpersonas = {
        nombre: perso.nombre,
        nombreDirectores: [],
        nombreEscritores: []
      }
      this.getPersonaDirectores();
      this.getPersonaEscritores();
      });
}


getActores() {
  this.http.get <Star[]> (this.urlGETPersonas)
    .subscribe((resultado) => {
      this.Actores = resultado;
      this.actoresUpdated.next([...this.Actores]);
    });
}

getActoresUpdateListener() {
  return this.actoresUpdated.asObservable();
}

getSelectedPersonaListener(){
  return this.selectedPersonaUpdated.asObservable();
}

getSelectedEscritorListener(){
  return this.selectEscritoresUpdated.asObservable();
}

}




