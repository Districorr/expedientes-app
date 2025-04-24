import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getExpedienteById } from '../../lib/firebase';
import NewExpedienteForm from '../../components/NewExpedienteForm';
import { Expediente } from '../../types/expediente';

const ExpedientePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [expediente, setExpediente] = useState<Expediente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getExpedienteById(id as string)
        .then((data) => {
          if (data) {
            setExpediente(data as Expediente);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading || !expediente) {
    return <div>Cargando...</div>;
  }

  return (
    <NewExpedienteForm initialData={{ id: id as string, ...expediente }} />
  );
};

export default ExpedientePage;
