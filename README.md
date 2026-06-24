# Generador de Contraseñas PWA

Este proyecto es una aplicación web progresiva (PWA) desarrollada con Angular que genera contraseñas seguras y aleatorias usando la Web Crypto API. La aplicación ofrece una interfaz de usuario intuitiva y es completamente responsive, lo que permite su uso en dispositivos móviles y de escritorio.

## Características

- Generación de contraseñas aleatorias criptográficamente seguras (`crypto.getRandomValues`), con opciones personalizables
- Interfaz de usuario moderna y responsive utilizando Angular Material
- Funcionalidad de copiar al portapapeles
- Implementado como PWA para instalación en dispositivos y uso offline
- Versionado automático con cada commit y despliegue
- Diseño responsive con soporte para dispositivos móviles y de escritorio

## Requisitos previos

- Node.js 20 o superior
- [pnpm](https://pnpm.io/) (gestionado vía Corepack: `corepack enable`)

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/generador-contraseñas-pwa.git
   ```

2. Navega al directorio del proyecto:
   ```
   cd generador-contraseñas-pwa
   ```

3. Instala las dependencias:
   ```
   pnpm install
   ```

## Uso

Para ejecutar la aplicación en modo de desarrollo:

```
pnpm start
```

Navega a `http://localhost:4200/` en tu navegador. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Construcción

Para construir el proyecto para producción:

```
pnpm build
```

Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Calidad de código

```
pnpm lint       # comprueba el código con ESLint
pnpm lint:fix   # corrige automáticamente lo que sea posible
pnpm test       # ejecuta los tests unitarios (Karma + Jasmine)
```

## Despliegue

Este proyecto está configurado para desplegarse automáticamente en Vercel con cada push a la rama principal. El script de construcción personalizado en Vercel ejecuta:

```
pnpm deploy
```

Esto asegura que la versión se actualice antes de cada despliegue.

## Estructura del proyecto

```
src/
├── app/
│   ├── password-generator/
│   │   ├── password-generator.component.ts
│   │   ├── password-generator.component.html
│   │   └── password-generator.component.scss
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.component.scss
├── assets/
│   └── icons/
│       ├── 72.png
│       ├── 96.png
│       ├── 128.png
│       ├── 144.png
│       ├── 152.png
│       ├── 192.png
│       └── 512.png
├── index.html
├── main.ts
└── styles.scss
public/
├── favicon.ico
└── manifest.webmanifest
```

## Versionado

Este proyecto utiliza versionado semántico automático con [`commit-and-tag-version`](https://github.com/absolute-version/commit-and-tag-version). La versión se actualiza automáticamente con cada commit y despliegue basándose en los mensajes de commit convencionales.

Para crear manualmente una nueva versión:

```
pnpm release
```

## Contribución

Las contribuciones son bienvenidas. Por favor, asegúrate de seguir las convenciones de commit al hacer pull requests.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
