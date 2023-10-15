# WeatherApp

WeatherApp es una aplicación simple construida con Expo que te permite conocer la información meteorológica actual de tu ubicación. La aplicación solicita permisos de localización para proporcionarte datos precisos y te muestra detalles como la temperatura, velocidad del viento y el tiempo de amanecer.

## Características

- **Información Meteorológica**: Obtén datos en tiempo real sobre la temperatura, velocidad del viento y tiempo de amanecer.
- **Localización Automática**: La aplicación utiliza la geolocalización para obtener datos precisos basados en tu ubicación actual.
- **Interfaz Intuitiva**: Diseño limpio y sencillo para una experiencia de usuario fácil de usar.

## Capturas de Pantalla

![Screenshot 1](https://example.com/weatherapp-screenshot1.png)

## Cómo Usar

1. Clona este repositorio: `git clone https://github.com/tuusuario/weatherapp.git`
2. Instala las dependencias: `yarn install`
3. Inicia la aplicación: `yarn export start`

## Requisitos

- Node.js
- npm (Node Package Manager)
- Expo CLI

## Configuración de Variables de Entorno

Antes de ejecutar la aplicación, asegúrate de configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:
Obtén tu clave de API meteorológica de https://openweathermap.org/ y reemplaza 'EXPO_PUBLIC_APP_KEY' con la clave proporcionada.

```plaintext
EXPO_PUBLIC_APP_KEY=valor_de_tu_clave
EXPO_PUBLIC_BASE_URL=valor_de_tu_url
EXPO_PUBLIC_UNIT=valor_de_tu_unidad
EXPO_PUBLIC_LANG=valor_de_tu_idioma
```
