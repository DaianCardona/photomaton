# Instagram: limitaciones y alternativa

Cubre RF-064. El usuario pedía que los invitados pudieran subir las fotos a Instagram **etiquetándose
ellos**. Esto **no es posible** de forma automática por la API de Instagram. Aquí se explica por qué y
cuál es la alternativa real (la que implementa el proyecto).

## Qué NO permite la API de Instagram

- **No se puede publicar en el feed de un tercero.** La *Instagram Graph API* solo permite publicar en cuentas **Business/Creator** sobre las que se tiene autorización (token), no en la cuenta personal de un invitado.
- **No se puede etiquetar a otras personas** automáticamente en una publicación hecha por una app (el etiquetado de usuarios desde la API está muy restringido).
- **No hay API para Stories** de cuentas de terceros.
- Publicar incluso en **tu propia** cuenta Business requiere: app de Meta revisada, cuenta Business conectada a una página de Facebook, y los medios accesibles por URL pública. Es un proceso de aprobación no trivial.

En resumen: la idea de "el invitado se autopublica y se etiqueta desde el fotomatón" choca con las
políticas y capacidades de la plataforma.

## La alternativa que implementamos (recomendada)

**El invitado comparte desde su propio móvil**, partiendo del QR:

1. La app muestra el **QR** (ver [QR](compartir-qr.md)).
2. El invitado abre su **galería** en la web DecaBox (ver [galería](../05-web-decabox/galeria-publica-eventos.md)).
3. Descarga la foto/gif y usa el botón **"Compartir"** nativo de su móvil → elige Instagram (feed/Stories), y **se etiqueta él mismo** y etiqueta a DecaBox si quiere.

Ventajas: es **legal y fiable**, sin aprobaciones de Meta, y el invitado controla su propia publicación.

### Ayudas que sí podemos dar
- En la galería, botón **"Compartir"** (Web Share API en móvil) que abre el menú nativo con la imagen.
- **Texto/hashtags sugeridos** copiables (p. ej. `@decabox #boda...`) para que el invitado pegue al publicar.
- Marca de agua/branding sutil en la foto para difusión.

## Opción documentada (no recomendada para el etiquetado pedido)

- **Auto-publicar en TU Instagram** (cuenta Business de DecaBox) vía Graph API: técnicamente posible con app revisada por Meta, pero **no permite que el invitado se etiquete** ni publica en su cuenta. Serviría solo para alimentar el feed de DecaBox, no para lo que pedía el usuario. Queda como posible mejora de marketing, no como solución al requisito original.

## Conclusión

El requisito "el invitado sube a Instagram etiquetándose" se cumple mediante **QR → galería → compartir
nativo del móvil**, no mediante publicación automática. Así se documenta y así se implementa.
