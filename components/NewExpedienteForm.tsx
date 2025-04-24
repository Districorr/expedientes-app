import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { addDoc, collection, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@lib/firebase';

interface ExpedienteFormProps {
  initialData?: {
    id?: string;
    numero: string;
    estado: string;
    usuario: string;
    fechaIngreso: string;
    observaciones?: string;
  };
}

export const NewExpedienteForm: React.FC<ExpedienteFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [numero, setNumero] = useState(initialData?.numero || '');
  const [usuario, setUsuario] = useState(initialData?.usuario || '');
  const [fechaIngreso, setFechaIngreso] = useState(initialData?.fechaIngreso || '');
  const [observaciones, setObservaciones] = useState(initialData?.observaciones || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const expedienteData = {
        numero,
        usuario,
        fechaIngreso,
        observaciones,
        estado: initialData?.estado || 'Mesa de Entrada',
        actualizadoEn: serverTimestamp(),
      };

      if (initialData?.id) {
        await updateDoc(doc(db, 'expedientes', initialData.id), expedienteData);
      } else {
        await addDoc(collection(db, 'expedientes'), {
          ...expedienteData,
          creadoEn: serverTimestamp(),
        });
      }

      router.push('/');
    } catch (error) {
      console.error('Error al guardar expediente:', error);
      alert('Ocurrió un error al guardar el expediente');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {initialData ? 'Editar Expediente' : 'Nuevo Expediente'}
      </h1>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Número de Expediente *</label>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Usuario *</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Fecha de Ingreso *</label>
        <input
          type="date"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Observaciones</label>
        <textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar Expediente' : 'Crear Expediente'}
      </button>
    </form>
  );
};
