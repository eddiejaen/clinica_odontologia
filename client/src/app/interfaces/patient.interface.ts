export interface patient {
  nombre:string,
  apellidos:string,
  cedula:string
}

export interface history {
  cedula: string,
  tratamiento: boolean,
  medicamento: boolean,
  diabetes: boolean,
  artritis: boolean,
  cardiacas: boolean,
  fiebre: boolean,
  hepatitis: boolean,
  ulceras: boolean,
  trastornos: boolean,
  nerviosas: boolean,
  otras_enfermedades: string,
  internado: boolean,
  alteraciones: boolean,
  padecimiento: boolean,
  aspirina: boolean,
  penicilina: boolean,
  sulfas: boolean,
  otros_medicamentos: string,
  anestesia: boolean,
  sangrado: boolean,
  desmayos: boolean,
  embarazada: boolean,
  lactancia: boolean,
  transtornos: boolean,
  observaciones: string
}

export interface treatment {
  cedula: string,
  fecha: Date,
  pieza: string,
  descripcion: string,
  debe: string,
  abono: string,
  saldo: string
}

export interface odontogram {
  cedula: string,
  caries:boolean,
  mal_estado:boolean,
  buen_estado:boolean,
  pieza: string
}
