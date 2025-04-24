import type { NextApiRequest, NextApiResponse } from "next";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { DocumentData } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const snapshot = await getDocs(collection(db, "expedientes"));
    const expedientes: DocumentData[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json(expedientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener expedientes" });
  }
}
