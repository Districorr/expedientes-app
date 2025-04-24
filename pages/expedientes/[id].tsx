import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import NewExpedienteForm from "@/components/NewExpedienteForm";
import type { DocumentData } from "firebase/firestore";

export default function EditarExpediente() {
  const router = useRouter();
  const { id } = router.query;
  const [expediente, setExpediente] = useState<DocumentData | null>(null);

  useEffect(() => {
    if (id) {
      const fetchExpediente = async () => {
        const docRef = doc(db, "expedientes", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setExpediente(docSnap.data());
        }
      };
      fetchExpediente();
    }
  }, [id]);

  if (!expediente) return <div>Cargando...</div>;

  return <NewExpedienteForm initialData={{ id: id as string, ...expediente }} />;
}
