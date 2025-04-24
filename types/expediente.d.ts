// pages/expedientes/[id].tsx

import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NewExpedienteForm from '../../components/ui/NewExpedienteForm';
import { Expediente } from '../../types/expediente';

interface ExpedientePageProps {
  expediente: Expediente | null;
}

const ExpedientePage: NextPage<ExpedientePageProps> = ({ expediente }) => {
  const router = useRouter();
  const { id } = router.query;

  // Si los datos aún no se han cargado o el id es inválido, mostramos un mensaje de carga.
  if (!expediente || typeof id !== 'string') {
    return <div>Cargando...</div>;
  }

  // Construimos el objeto que cumple completamente con la interfaz Expediente.
  // Si alguna propiedad viene vacía, se asigna un valor por defecto (aquí cadena vacía).
  const initialData: Expediente = {
    id: id,
    numero: expediente.numero || '',
    estado: expediente.estado || '',
    usuario: expediente.usuario || '',
    fechaIngreso: expediente.fechaIngreso || '',
  };

  return <NewExpedienteForm initialData={initialData} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!; // Obtenemos el id desde los parámetros de la URL

  // Aquí debes reemplazar esta parte con la lógica real de obtención de datos (por ejemplo, una consulta a una API o base de datos).
  let expediente: Expediente | null = null;
  try {
    expediente = {
      id: id as string,
      numero: '12345',
      estado: 'En Proceso',
      usuario: 'usuario@example.com',
      fechaIngreso: '2025-04-23',
    };
  } catch (error) {
    console.error('Error al obtener el expediente:', error);
  }

  return { props: { expediente } };
};

export default ExpedientePage;
