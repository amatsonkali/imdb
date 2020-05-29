export interface Pelicula {
    idPelicula?: number;
    titulo: string,
    duracion?: string,
    fechaEmision?: Date,
    sinopsis?: string,
    linkTrailer?: string,
    clasificacion?: string,
    idClasificacion?: number,
    idPais?: number,
    idTipoMaterial?: number,
    calificacion?: number,
    pais?:string,
    tipoMaterial?:string,
    imagenPortada?: any,
    generos?: string[]
  }
