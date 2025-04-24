import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const expedientesCol = collection(db, 'expedientes');
    const snapshot = await getDocs(expedientesCol);
    const expedientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(expedientes);
  }

  res.status(405).json({ error: 'Método no permitido' });
}
