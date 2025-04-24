// types/expediente.d.ts
import { Timestamp } from 'firebase/firestore';

export interface Expediente {
  id?: string;
  numero: string;
  estado: string;
  usuario: string;
  fechaIngreso: string;
  observaciones?: string;
  creadoEn?: Timestamp | Date;
  actualizadoEn?: Timestamp | Date;
}

export interface ExpedienteLog {
  cambio: string;
  antes: Partial<Expediente>;
  despues: Partial<Expediente>;
  realizadoPor: string;
  fecha: Timestamp | Date;
}

export interface ExpedienteFilters {
  estado?: string;
  desde?: string;
  hasta?: string;
  observacion?: string;
  limit?: number;
  lastVisible?: any;
}
