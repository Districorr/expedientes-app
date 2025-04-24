import { useState } from "react";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Expediente {
  id?: string;
  numero: string;
  estado: string;
  usuario: string;
  fechaIngreso: string;
  observaciones?: string;
}

interface Props {
  initialData?: Expediente;
}

export default function NewExpedienteForm({ initialData }: Props) {
  const [formData, setFormData] = useState<Omit<Expediente, "id">>({
    numero: initialData?.numero || "",
    estado: initialData?.estado || "Mesa de Entrada",
    usuario: initialData?.usuario || "",
    fechaIngreso: initialData?.fechaIngreso || "",
    observaciones: initialData?.observaciones || "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData?.id) {
        await updateDoc(doc(db, "expedientes", initialData.id), {
          ...formData,
          actualizadoEn: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "expedientes"), {
          ...formData,
          creadoEn: serverTimestamp(),
        });
      }
      router.push("/");
    } catch (error) {
      console.error("Error guardando expediente:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
      <div>
        <label>Número:</label>
        <input
          type="text"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Estado:</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        >
          <option value="Mesa de Entrada">Mesa de Entrada</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Finalizado">Finalizado</option>
        </select>
      </div>

      <div>
        <label>Usuario:</label>
        <input
          type="text"
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Fecha de Ingreso:</label>
        <input
          type="date"
          name="fechaIngreso"
          value={formData.fechaIngreso}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Observaciones:</label>
        <textarea
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        {initialData?.id ? "Actualizar" : "Crear"} Expediente
      </button>
    </form>
  );
}

