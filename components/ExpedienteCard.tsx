interface Props {
  numero: string;
  estado: string;
  observaciones?: string;
}

export default function ExpedienteCard({ numero, estado, observaciones }: Props) {
  return (
    <div className="border p-4 rounded shadow-sm mb-2">
      <h2 className="text-lg font-semibold">{numero}</h2>
      <p className="text-sm text-gray-600">Estado: {estado}</p>
      {observaciones && <p className="text-xs text-gray-500">Obs: {observaciones}</p>}
    </div>
  );
}
