import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import NewExpedienteForm from '@/components/NewExpedienteForm';

type Expediente = {
  id: string;
  numero: string;
  estado: string;
  usuario: string;
  fechaIngreso: string;
};

export default function ExpedientePage() {
  const router = useRouter();
  const { id } = router.query;

  const [expediente, setExpediente] = useState<Expediente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchExpediente = async () => {
      try {
        const docRef = doc(db, 'expedientes', id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setExpediente({
            id: docSnap.id,
            numero: data.numero || '',
            estado: data.estado || '',
            usuario: data.usuario || '',
            fechaIngreso: data.fechaIngreso || '',
          });
        } else {
          console.warn('Expediente no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener expediente:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpediente();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (!expediente) return <div>No se encontró el expediente</div>;

  return <NewExpedienteForm initialData={expediente} />;
}
