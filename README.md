# Find My Albañil (Frontend)

Bienvenido al repositorio frontend de **Find My Albañil**, una plataforma moderna diseñada para conectar a profesionales de la construcción con clientes que necesitan sus servicios. Este proyecto está construido utilizando **Angular** dentro de un monorepositorio **Nx**, asegurando escalabilidad, modularidad y un excelente rendimiento.

## 🚀 Tecnologías Principales

Este proyecto utiliza un stack tecnológico robusto y moderno:

- **[Angular](https://angular.io/)**: Framework principal para la construcción de la interfaz de usuario.
- **[Nx](https://nx.dev/)**: Herramienta de gestión de monorepositorios para un desarrollo eficiente.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilidad para un diseño rápido, responsivo y personalizado.
- **[Zod](https://zod.dev/)**: Librería de validación de esquemas TypeScript-first para formularios robustos y seguros.
- **[RxJS](https://rxjs.dev/)**: Programación reactiva para el manejo de eventos y estado.

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular organizada en aplicaciones y librerías:

### Aplicaciones (`apps/`)

- **`user-app`**: La aplicación principal para los usuarios finales (clientes y profesionales).
- **`admin-app`**: Panel de administración para la gestión de la plataforma.

### Librerías (`libs/`)

- **`auth`**: Módulo de autenticación que contiene componentes de login, registro y recuperación de contraseña, así como la lógica de seguridad.
- **`shared-ui`**: Librería de componentes de interfaz reutilizables (botones, inputs, logos, etc.) y utilidades de diseño.
- **`data-access`**: Servicios y lógica para la comunicación con el backend y manejo de datos.

## ✨ Características Clave

- **Validación en Tiempo Real**: Integración avanzada de **Zod** con Angular Reactive Forms para feedback inmediato al usuario.
- **Componentes Reutilizables**: Arquitectura de componentes UI agnósticos y altamente configurables (`lib-input-text`, `lib-primary-button`).
- **HTML Semántico**: Estructura de código optimizada para accesibilidad y SEO.
- **Diseño Responsivo y Tema Oscuro**: Interfaz adaptada a todos los dispositivos y preferencias de usuario.

## 🛠️ Configuración y Ejecución

### Prerrequisitos

- Node.js (v18 o superior)
- pnpm (recomendado) o npm

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   ```

### Ejecutar el Servidor de Desarrollo

Para iniciar la aplicación de usuario:

```bash
pnpm nx serve user-app
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias algún archivo fuente.

### Otras Comandos Útiles

- **Linting**: Analiza el código en busca de errores.
  ```bash
  pnpm nx run-many -t lint
  ```
- **Construcción (Build)**: Genera los artefactos de producción.
  ```bash
  pnpm nx build user-app
  ```
- **Generar Componentes**:
  ```bash
  pnpm nx g @nx/angular:component my-component --project=shared-ui
  ```
