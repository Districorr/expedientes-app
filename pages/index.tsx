import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { DocumentData } from "firebase/firestore";

export default function Home() {
  const [numero, setNumero] = useState("");
  const [expediente, setExpediente] = useState<DocumentData | null>(null);

  const buscarExpediente = async () => {
    const q = query(
      collection(db, "expedientes"),
      where("numero", "==", numero)
    );
    const snapshot = await getDocs(q);
    setExpediente(snapshot.docs[0]?.data() || null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Head>
        <title>Gestión de Expedientes</title>
        <meta name="description" content="Sistema de gestión de expedientes" />
      </Head>

      <main className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          📁 Sistema de Gestión de Expedientes
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Ingrese N° de expediente"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && buscarExpediente()}
            />
            <button
              onClick={buscarExpediente}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>

          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>

        {expediente && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Resultado de la búsqueda</h2>
            <ExpedienteCard {...expediente} />
          </div>
        )}
      </main>
    </div>
  );
}
