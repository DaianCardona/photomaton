# Galería pública de eventos

Cubre RF-082 y CU-05. Página(s) donde los invitados ven y descargan las fotos de su evento, a las que
llegan **por QR/enlace** generado en el fotomatón.

## Acceso

- URL por **código no adivinable**: `/(g)/:eventCode/:sessionCode` (sesión concreta) o `/(g)/:eventCode` (evento).
- **No indexable** (noindex, no listada públicamente) y con **caducidad** opcional (RGPD). Ver [privacidad](../01-arquitectura/seguridad-y-privacidad.md).
- Sin login para el invitado; opcionalmente PIN por evento.

## Contenido de la galería

- Las fotos (singles, layout), GIF y, si aplica, confesiones de la sesión.
- Acciones del invitado:
  - **Descargar** foto/gif.
  - **Compartir** en sus redes desde su propio móvil (el sistema operativo del móvil ofrece "Compartir" → Instagram/Stories/WhatsApp), etiquetándose ellos mismos. Ver [Instagram](../06-integraciones/instagram-limitaciones.md).
  - **Recibir por email** (reenvío).

## Implementación en la web

Dos opciones según la estrategia de la web (ver [cambios frontend](cambios-frontend.md)):

1. **Servida por la API** (`decabox-api`): ruta `/g/...` que devuelve HTML o JSON; la web Next la enlaza. Más simple para contenido dinámico y control de acceso/caducidad.
2. **Ruta dinámica en Next** (`app/g/[eventCode]/[sessionCode]/page.tsx`) que llama a la API para obtener los medios. Requiere render dinámico (no static export puro) o ISR.

> Recomendación: que la **galería sea dinámica vía API** (opción 1 o 2 con render dinámico), porque su contenido cambia en tiempo real durante el evento, mientras que las páginas comerciales pueden seguir siendo mayormente estáticas.

## Relación con el fotomatón

- El fotomatón crea evento/sesión en la API y sube los medios (ver [endpoints](../04-backend-api/endpoints-api.md)).
- El **QR** que muestra la app codifica la URL de galería de esa sesión. Mientras la subida termina, la galería muestra "preparando tus fotos" (ver [sync](../01-arquitectura/flujo-offline-online-sync.md)).

## Branding

- Reutiliza el estilo de la web DecaBox (Tailwind + shadcn) para coherencia visual.
- Cabecera con nombre del evento y marca DecaBox; pie con enlace a la web.
