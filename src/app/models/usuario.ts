export interface usuarioLogin {
   id?: string;
   username: string;
   password: string;
}

export interface usuario extends usuarioLogin {
  nombre: string;
  email: string;
}

