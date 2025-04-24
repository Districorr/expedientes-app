
import { useState } from "react";
import Head from "next/head";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import ExpedienteCard from "../components/ExpedienteCard";

export default function Home() {
  const [numero, setNumero] = useState("");
  const [expediente, setExpediente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buscarExpediente = async () => {
    setLoading(true);
    setError("");
    setExpediente(null);

    try {
      const q = query(collection(db, "expedientes"), where("numero", "==", numero));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setError("No se encontró el expediente.");
      } else {
        setExpediente(snapshot.docs[0].data());
      }
    } catch (err) {
      setError("Error al buscar expediente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Head><title>Gestión de Expedientes</title></Head>
      <h1 className="text-xl font-bold text-blue-600 mb-4">📁 Sistema de Expedientes</h1>
      <input
        type="text"
        placeholder="Ingrese N° de expediente"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        className="border p-2 w-full max-w-md"
      />
      <button
        onClick={buscarExpediente}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Buscar
      </button>

      {loading && <p className="mt-4 text-gray-500">Buscando...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {expediente && (
        <div className="mt-4">
          <ExpedienteCard
            numero={expediente.numero}
            estado={expediente.estado}
            observaciones={expediente.observaciones}
          />
        </div>
      )}
    </div>
  );
}
