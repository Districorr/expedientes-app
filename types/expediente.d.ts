interface Expediente {
  id?: string;
  numero: string;
  estado: string;
  usuario: string;
  fechaIngreso: string;
  observaciones?: string;
  creadoEn?: firebase.firestore.Timestamp | Date;
  actualizadoEn?: firebase.firestore.Timestamp | Date;
}

interface ExpedienteLog {
  cambio: string;
  antes: Partial<Expediente>;
  despues: Partial<Expediente>;
  realizadoPor: string;
  fecha: firebase.firestore.Timestamp | Date;
}

interface ExpedienteFilters {
  estado?: string;
  desde?: string;
  hasta?: string;
  observacion?: string;
  limit?: number;
  lastVisible?: firebase.firestore.DocumentSnapshot;
}
