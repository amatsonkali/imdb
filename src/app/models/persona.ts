export interface Persona {
  idPersona?: number,
  nombre?: string,
  fechaNacimiento?: Date,
  miniBiografia?: string,
  imagenPersona?: any,
  nombreDirectores?: string[]
  nombreEscritores?: string[]
  nombreEstrellas?: string[]
  idPais?: number,
  nombrePais? : string,
  personajes?: string[],
  estelar?: boolean
}

export interface Star extends Persona{
  idActor?: number,
  nombrePapel?: string
}
