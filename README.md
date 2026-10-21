# APPFOCUS — CORE v3.0

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Aplicación web de productividad basada en la metodología **Deep Work** (trabajo profundo). Permite planificar el día en bloques de trabajo, marcarlos como completados y ver en tiempo real qué porcentaje de lo planeado se ha cumplido, con una interfaz oscura y sin distracciones.

## Funcionalidades

- **Bloques por categoría:** cada tarea se clasifica como *Deep Work*, *Hábito*, *Aprendizaje* u *Operativo*.
- **Índice de eficiencia diaria:** porcentaje de bloques completados sobre el total planificado, recalculado en cada cambio.
- **Datos locales y privados:** los bloques se guardan en el navegador (`localStorage`). No hay servidor, cuentas ni rastreadores; la información nunca sale del dispositivo.
- **Búsqueda instantánea:** filtra los bloques por título o categoría mientras se escribe (`useMemo`).
- **Interfaz enfocada:** modo oscuro, efecto *glassmorphism* y diseño responsive.

## Stack

| Capa | Tecnología |
|------|------------|
| UI | React 18 (hooks: `useState`, `useMemo`, `useEffect`) |
| Estilos | Tailwind CSS |
| Iconos | Lucide |
| Ejecución | Babel Standalone: JSX compilado en el navegador, sin bundler |
| Persistencia | `localStorage` |

> Las librerías se cargan desde CDN, por lo que la primera carga necesita conexión a internet.

## Arquitectura

El proyecto se refactorizó de un único archivo a una estructura modular:

```text
/
├── index.html              # Estructura HTML, sin scripts ni estilos embebidos
├── css/
│   └── style.css           # Estilos globales y reglas personalizadas
└── js/
    ├── components/
    │   └── Icon.js         # Componente reutilizable de iconos
    ├── App.js              # Estado, lógica de negocio y componente principal
    └── main.js             # Punto de entrada de React
```

## Ejecución local

Babel Standalone carga los archivos `.js` por HTTP, así que el proyecto debe servirse desde un servidor local (abrir `index.html` directamente no funciona).

```bash
git clone https://github.com/Lain-Sthid-Ramirez-Rueda/APPFOCUS.git
cd APPFOCUS
python -m http.server 8000     # o: npx serve .
```

Luego abre `http://localhost:8000`.

## Próximos pasos

- Empaquetar con Vite para eliminar la compilación en el navegador y habilitar uso sin conexión real (PWA).
- Edición y eliminación de bloques.
- Historial de eficiencia por día.

---

Desarrollado por **[Lain Sthid Ramirez Rueda](https://github.com/Lain-Sthid-Ramirez-Rueda)** · [Portafolio](https://lainramirez.vercel.app)
