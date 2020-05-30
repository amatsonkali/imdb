export interface Pelicula {
    idPelicula: number;
    titulo: string,
    duracion?: string,
    fechaEmision?: Date,
    sinopsis?: string,
    linkTrailer?: any,
    clasificacion?: string,
    calificacion?: number,
    pais?:string,
    tipoMaterial?:string
    img?: any,
    generos?: string[]
  }
