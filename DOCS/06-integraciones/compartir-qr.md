# Compartir por QR

Cubre RF-062 y CU-05. Tras la sesión, la app muestra un **QR** que lleva al invitado a su foto/galería
en la web DecaBox, desde donde descarga y comparte él mismo.

## Por qué QR

- Es la forma **fiable y legal** de que el invitado lleve sus fotos al móvil y las comparta/etiquete en sus redes (la app no puede publicar por él en Instagram; ver [límites](instagram-limitaciones.md)).
- No requiere que el invitado teclee nada (a diferencia del email).

## Qué codifica el QR

- Una **URL determinista** de galería: `https://<web>/g/<eventCode>/<sessionCode>`.
- La URL existe en cuanto la subida concreta; si aún no hay red, la galería muestra "preparando tus fotos" y se completa al sincronizar (ver [sync](../01-arquitectura/flujo-offline-online-sync.md)).
- Códigos **no adivinables** (aleatorios) → privacidad (ver [seguridad](../01-arquitectura/seguridad-y-privacidad.md)).

## Generación

- En el proceso main de la app con la librería `qrcode` (genera el QR localmente, sin depender de red).
- Se calcula a partir de `eventCode` + `sessionCode` que la app ya conoce (los obtiene/define al crear evento/sesión en la API).
- Se muestra en pantalla grande tras el montaje, junto a las opciones de email.

## Flujo del invitado

1. Ve el QR en pantalla.
2. Lo escanea con la cámara de su móvil.
3. Abre la **galería** de su sesión en la web DecaBox.
4. Descarga su foto/gif y usa el botón nativo de **compartir** del móvil para Instagram/Stories/WhatsApp, etiquetándose él.

## Consideraciones

- Tamaño y contraste del QR suficientes para escanear desde ~30–50 cm.
- Mostrar también un **código corto** legible por si el QR falla.
- El QR puede representar la **sesión** (todas las fotos del grupo) más que una sola foto, para compartir el conjunto.

Relacionado: [galería pública](../05-web-decabox/galeria-publica-eventos.md) · [email](email-resend.md) · [Instagram](instagram-limitaciones.md).
