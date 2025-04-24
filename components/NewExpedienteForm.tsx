import { useState } from "react";
import { useRouter } from "next/router";
import { addDoc, collection, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { DocumentData } from "firebase/firestore";

interface Expediente {
  id?: string;
  numero: string;
  estado: string;
  usuario: string;
  fechaIngreso: string;
  observaciones?: string;
}

export default function NewExpedienteForm({ initialData }: { initialData?: Expediente }) {
  const [formData, setFormData] = useState<Omit<Expediente, 'id'>>({
    numero: initialData?.numero || '',
    estado: initialData?.estado || 'Mesa de Entrada',
    usuario: initialData?.usuario || '',
    fechaIngreso: initialData?.fechaIngreso || '',
    observaciones: initialData?.observaciones || ''
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData?.id) {
        await updateDoc(doc(db, "expedientes", initialData.id), {
          ...formData,
          actualizadoEn: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, "expedientes"), {
          ...formData,
          creadoEn: serverTimestamp()
        });
      }
      router.push("/");
    } catch (error) {
      console.error("Error guardando expediente:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario aquí */}
    </form>
  );
}
