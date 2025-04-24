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
    if (typeof id === 'string') {
      getExpedienteById(id).then((data) => {
        if (data && data.numero && data.estado && data.usuario && data.fechaIngreso) {
          setExpediente(data as Expediente);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !expediente) {
    return <div>Cargando...</div>;
  }

  return (
    <NewExpedienteForm initialData={{ ...expediente, id: id as string }} />
  );
};

export default ExpedientePage;
