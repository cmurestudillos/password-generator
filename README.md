# Generador de Contraseñas PWA

Este proyecto es una aplicación web progresiva (PWA) desarrollada con Angular que genera contraseñas seguras y aleatorias. La aplicación ofrece una interfaz de usuario intuitiva y es completamente responsive, lo que permite su uso en dispositivos móviles y de escritorio.

## Características

- Generación de contraseñas aleatorias con opciones personalizables
- Interfaz de usuario moderna y responsive utilizando Angular Material
- Funcionalidad de copiar al portapapeles
- Implementado como PWA para instalación en dispositivos y uso offline
- Versionado automático con cada commit y despliegue
- Diseño responsive con soporte para dispositivos móviles y de escritorio

## Requisitos previos

- Node.js (versión 12 o superior)
- Angular CLI (versión 12 o superior)

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
   npm install
   ```

## Uso

Para ejecutar la aplicación en modo de desarrollo:

```
ng serve
```

Navega a `http://localhost:4200/` en tu navegador. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Construcción

Para construir el proyecto para producción:

```
ng build --prod
```

Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Despliegue

Este proyecto está configurado para desplegarse automáticamente en Vercel con cada push a la rama principal. El script de construcción personalizado en Vercel ejecuta:

```
npm run release && ng build --prod
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
│   ├── app.module.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.component.scss
├── assets/
│   └── icons/
│       ├── icon-72x72.png
│       ├── icon-96x96.png
│       ├── icon-128x128.png
│       ├── icon-144x144.png
│       ├── icon-152x152.png
│       ├── icon-192x192.png
│       ├── icon-384x384.png
│       └── icon-512x512.png
├── index.html
├── main.ts
├── manifest.webmanifest
└── styles.scss
```

## Versionado

Este proyecto utiliza versionado semántico automático con `standard-version`. La versión se actualiza automáticamente con cada commit y despliegue basándose en los mensajes de commit convencionales.

Para crear manualmente una nueva versión:

```
npm run release
```

## Contribución

Las contribuciones son bienvenidas. Por favor, asegúrate de seguir las convenciones de commit al hacer pull requests.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)