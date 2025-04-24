// pages/expedientes/[id].tsx

import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NewExpedienteForm from '../../components/NewExpedienteForm';
import { Expediente } from '../../types'; // Asegúrate de tener definida esta interfaz

interface ExpedientePageProps {
  expediente: Expediente | null;
}

const ExpedientePage: NextPage<ExpedientePageProps> = ({ expediente }) => {
  const router = useRouter();
  const { id } = router.query;

  // Si aún no se cargaron los datos o el id no es una cadena, mostramos un mensaje de "Cargando..."
  if (!expediente || typeof id !== 'string') {
    return <div>Cargando...</div>;
  }

  // Creamos un objeto initialData que Cumpla completamente con la interfaz Expediente.
  // Si alguna propiedad resulta nula o indefinida, le asignamos un valor por defecto (en este ejemplo, cadena vacía).
  const initialData: Expediente = {
    id,
    numero: expediente.numero || '',
    estado: expediente.estado || '',
    usuario: expediente.usuario || '',
    fechaIngreso: expediente.fechaIngreso || '',
  };

  return <NewExpedienteForm initialData={initialData} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  // Simulación de obtención del expediente.
  // Reemplaza este bloque por la lógica real para obtener el expediente (por ejemplo, una consulta a una API o base de datos).
  let expediente: Expediente | null = null;
  try {
    expediente = {
      id: id as string,
      numero: '12345',
      estado: 'Pendiente',
      usuario: 'usuario@example.com',
      fechaIngreso: '2025-04-23',
    };
  } catch (error) {
    console.error('Error al obtener el expediente:', error);
  }

  return { props: { expediente } };
};

export default ExpedientePage;
