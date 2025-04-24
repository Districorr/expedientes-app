
# 📁 Sistema de Gestión de Expedientes

Aplicación web moderna construida con **Next.js + Firebase** para gestionar expedientes de forma eficiente y escalable.

🚀 Desplegado automáticamente con **Vercel**

---

## 🛠 Tecnologías utilizadas

| Tecnología  | Descripción                                    |
|-------------|------------------------------------------------|
| **Next.js** | Framework React para frontend y backend unificado |
| **Firebase**| Base de datos en tiempo real (Firestore)       |
| **TypeScript** | Tipado estático para mayor seguridad         |
| **Vercel**  | Despliegue continuo conectado a GitHub         |

---

## ✅ Funcionalidades actuales

- 🔍 **Búsqueda de expedientes** por número
- 📄 Visualización de información básica (estado, observaciones)
- 🔗 Conexión real a Firebase Firestore
- ⚙️ Despliegue automático con GitHub + Vercel

---

## 📦 Estructura del proyecto

```
/pages
  └── index.tsx           # Página principal con buscador
/api
  └── expedientes.ts      # (En desarrollo) API para backend
/components
  └── ExpedienteCard.tsx  # Componente para mostrar un expediente
/lib
  └── firebase.ts         # Configuración Firebase
/utils
  └── estados.ts          # Estados válidos del sistema
```

---

## ⚡ Cómo usar

### Clonar y correr localmente:

```bash
git clone https://github.com/Districorr/expedientes-app.git
cd expedientes-app
npm install
npm run dev
```

Acceder en: `http://localhost:3000`

---

## 🔥 Firebase

Este proyecto se conecta a Firebase Firestore usando esta config:

```ts
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "expedientes-ioscord.firebaseapp.com",
  projectId: "expedientes-ioscord",
  ...
};
```

La colección usada actualmente es: `expedientes`

Cada expediente tiene la estructura:

```ts
{
  numero: "123/2024",
  estado: "Mesa de Entrada",
  observaciones: "Texto opcional"
}
```

---

## 📈 Próximas mejoras

- [ ] Crear nuevo expediente desde el frontend
- [ ] Edición de datos
- [ ] Historial de cambios (logs)
- [ ] Reportes y exportación a PDF
- [ ] Filtros avanzados por estado, fechas, observaciones

---

## 🧠 Desarrollado por

Equipo de **Districorr**  
Con soporte técnico para migración desde Google Apps Script a un entorno profesional escalable.
