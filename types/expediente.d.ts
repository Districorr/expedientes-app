// types/expediente.d.ts
import { Timestamp } from 'firebase/firestore';

declare global {
  interface Expediente {
    id?: string;
    numero: string;
    estado: string;
    usuario: string;
    fechaIngreso: string;
    observaciones?: string;
    creadoEn?: Timestamp | Date;
    actualizadoEn?: Timestamp | Date;
  }

  interface ExpedienteLog {
    cambio: string;
    antes: Partial<Expediente>;
    despues: Partial<Expediente>;
    realizadoPor: string;
    fecha: Timestamp | Date;
  }

  interface ExpedienteFilters {
    estado?: string;
    desde?: string;
    hasta?: string;
    observacion?: string;
    limit?: number;
    lastVisible?: any; // Reemplaza con el tipo correcto de Firebase si es necesario
  }
}

export {}; // Esto convierte el archivo en un módulo
