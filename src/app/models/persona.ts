export interface Persona {
  idPersona?: number,
  nombre?: string,
  fechaNacimiento?: Date,
  miniBiografia?: string,
  imagenPersona?: any,
  nombreDirectores?: string[]
  nombreEscritores?: string[]
  idPais?: number,
  personajes?: string[]
}

export interface Star extends Persona{
  idActor?: number,
  nombrePapel?: string
}
