import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import NewExpedienteForm from "@/components/NewExpedienteForm";

export default function EditarExpediente() {
  const { query } = useRouter();
  const { id } = query;
  const [expediente, setExpediente] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchExpediente = async () => {
        const ref = doc(db, "expedientes", id);
        const snap = await getDoc(ref);
        if (snap.exists()) setExpediente({ id, ...snap.data() });
      };
      fetchExpediente();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {expediente && <NewExpedienteForm initialData={expediente} />}
    </div>
  );
}
