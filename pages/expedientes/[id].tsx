// pages/expedientes/[id].tsx

import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NewExpedienteForm from '../../components/NewExpedienteForm';
import { Expediente } from '../../types'; // Asegúrate de tener definida esta interfaz en tu proyecto

interface ExpedientePageProps {
  expediente: Expediente | null;
}

const ExpedientePage: NextPage<ExpedientePageProps> = ({ expediente }) => {
  const router = useRouter();
  const { id } = router.query;

  // Si no se obtuvo el expediente o el id no es de tipo string, mostramos un mensaje de carga.
  if (!expediente || typeof id !== 'string') {
    return <div>Cargando...</div>;
  }

  // Aseguramos que el objeto cumple con todos los campos requeridos de la interfaz Expediente.
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
  const { id } = context.params!; // Obtenemos el id de la URL

  // Simulación de obtención del expediente.
  // Reemplaza este bloque con la llamada a tu API o consulta a la base de datos.
  let expediente: Expediente | null = null;
  try {
    expediente = {
      id: id as string,
      numero: "12345",
      estado: "Pendiente",
      usuario: "usuario@example.com",
      fechaIngreso: "2025-04-23",
    };
  } catch (error) {
    console.error("Error al obtener el expediente:", error);
  }

  return { props: { expediente } };
};

export default ExpedientePage;
