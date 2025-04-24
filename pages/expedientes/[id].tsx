import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@lib/firebase';
import { NewExpedienteForm } from '@components/NewExpedienteForm';

export default function EditarExpediente() {
  const router = useRouter();
  const { id } = router.query;
  const [expediente, setExpediente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchExpediente = async () => {
      try {
        const docRef = doc(db, 'expedientes', id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setExpediente({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such document!');
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching expediente:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchExpediente();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando expediente...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {expediente && <NewExpedienteForm initialData={expediente} />}
      </div>
    </div>
  );
}
