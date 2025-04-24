import { useState } from 'react';
import { useRouter } from 'next/router';
import { addDoc, collection, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@lib/firebase';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Textarea } from '@components/ui/Textarea';
import { Expediente } from '@/types/expediente';

interface NewExpedienteFormProps {
  initialData?: Expediente;
}

export const NewExpedienteForm = ({ initialData }: NewExpedienteFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<Expediente, 'id'>>({
    numero: initialData?.numero || '',
    estado: initialData?.estado || 'Mesa de Entrada',
    usuario: initialData?.usuario || '',
    fechaIngreso: initialData?.fechaIngreso || '',
    observaciones: initialData?.observaciones || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.numero || !formData.usuario || !formData.fechaIngreso) {
      setError('Por favor complete todos los campos obligatorios');
      return;
    }

    setIsSubmitting(true);

    try {
      const expedienteData = {
        ...formData,
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
    } catch (err) {
      console.error('Error al guardar expediente:', err);
      setError('Ocurrió un error al guardar el expediente. Por favor intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {initialData ? 'Editar Expediente' : 'Nuevo Expediente'}
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Número de Expediente *"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          required
        />

        <Input
          label="Usuario *"
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
          required
        />

        <Input
          label="Fecha de Ingreso *"
          type="date"
          name="fechaIngreso"
          value={formData.fechaIngreso}
          onChange={handleChange}
          required
        />

        <Textarea
          label="Observaciones"
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
          >
            {initialData ? 'Guardar Cambios' : 'Crear Expediente'}
          </Button>
        </div>
      </form>
    </div>
  );
};
