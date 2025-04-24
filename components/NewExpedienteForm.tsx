import { useState } from "react";
import { addDoc, collection, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '@lib/firebase'; // Cambiado a @lib/ para consistencia
import { Button } from "@components/ui/button"; // Cambiado a @components/
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { useRouter } from "next/router";

interface Expediente {
  id?: string;
  numero: string;
  usuario: string;
  fechaIngreso: string;
  observaciones: string;
  estado: string;
  creadoEn?: any;
}

export default function NewExpedienteForm({ initialData }: { initialData?: Expediente }) {
  // ... (resto del código permanece igual)
}
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!numero || !usuario || !fechaIngreso) return alert("Completa todos los campos obligatorios");

    try {
      if (initialData?.id) {
        const ref = doc(db, "expedientes", initialData.id);
        const oldDoc = await getDoc(ref);
        const oldData = oldDoc.data();

        await updateDoc(ref, {
          numero,
          usuario,
          fechaIngreso,
          observaciones,
        });

        await addDoc(collection(ref, "logs"), {
          cambio: "Edición",
          antes: oldData,
          despues: { numero, usuario, fechaIngreso, observaciones },
          realizadoPor: usuario,
          fecha: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "expedientes"), {
          numero,
          usuario,
          fechaIngreso,
          estado: "Mesa de Entrada",
          observaciones,
          creadoEn: serverTimestamp(),
        });
      }
      router.push("/");
    } catch (error) {
      console.error("Error al guardar expediente:", error);
      alert("Ocurrió un error al guardar el expediente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">
        {initialData ? "Editar expediente" : "Nuevo Expediente"}
      </h1>

      <label className="block mb-2">Número de expediente *</label>
      <Input value={numero} onChange={(e) => setNumero(e.target.value)} required />

      <label className="block mt-4 mb-2">Usuario *</label>
      <Input value={usuario} onChange={(e) => setUsuario(e.target.value)} required />

      <label className="block mt-4 mb-2">Fecha de ingreso *</label>
      <Input type="date" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} required />

      <label className="block mt-4 mb-2">Observaciones</label>
      <Textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />

      <Button type="submit" className="mt-6 w-full">
        {initialData ? "Guardar cambios" : "Guardar expediente"}
      </Button>
    </form>
  );
}

