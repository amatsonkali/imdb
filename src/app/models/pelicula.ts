export interface Pelicula {
    idPelicula: number;
    titulo: string,
    duracion: string,
    fechaEmision?: Date,
    sinopsis?: string,
    linkTrailer?: string,
    clasificacion?: string,
    pais?:string,
    tipoMaterial?:string

  }