import React from 'react';

interface ExpedienteCardProps {
  numero: string;
  estado: string;
  observaciones?: string;
  fechaIngreso?: string;
}

export const ExpedienteCard: React.FC<ExpedienteCardProps> = ({
  numero,
  estado,
  observaciones,
  fechaIngreso,
}) => {
  return (
    <div className="border p-4 rounded shadow-sm mb-2 bg-white">
      <h2 className="text-lg font-semibold">{numero}</h2>
      <p className="text-sm text-gray-600">Estado: {estado}</p>
      {fechaIngreso && <p className="text-xs text-gray-500">Ingreso: {fechaIngreso}</p>}
      {observaciones && <p className="text-xs text-gray-500 mt-2">Obs: {observaciones}</p>}
    </div>
  );
};
