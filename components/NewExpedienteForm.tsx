import React, { useState } from 'react';
import { Expediente } from '../types/expediente';

type Props = {
  initialData?: Partial<Expediente>;
};

const NewExpedienteForm: React.FC<Props> = ({ initialData = {} }) => {
  const [numero, setNumero] = useState(initialData.numero || '');
  const [estado, setEstado] = useState(initialData.estado || '');
  const [usuario, setUsuario] = useState(initialData.usuario || '');
  const [fechaIngreso, setFechaIngreso] = useState(initialData.fechaIngreso || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expediente: Expediente = {
      id: initialData.id || '',
      numero,
      estado,
      usuario,
      fechaIngreso,
    };
    console.log('Enviando expediente:', expediente);
    // Acá podrías enviar expediente al backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Número:</label>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Estado:</label>
        <input
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Usuario:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Fecha de Ingreso:</label>
        <input
          type="date"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
          required
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default NewExpedienteForm;
