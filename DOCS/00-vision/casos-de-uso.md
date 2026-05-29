# Casos de uso

Flujos principales de **operador** e **invitado**. Notación: pasos numerados + flujos alternativos.

---

## CU-01 · Preparar un evento (Operador)

**Precondición:** app instalada, cámara e impresora conectadas.

1. El operador abre la app y crea un evento (nombre + fecha) → RF-001.
2. La app crea la carpeta `Nombre_DD.MM.AA` con subcarpetas (`plantillas`, `originales`, `layout`, `gifs`, `videos`, `confesiones`, `greenscreen`).
3. Elige o diseña la plantilla activa (10x15 o 5x15, nº de huecos) → RF-010..016.
4. Configura ajustes: copias por defecto, filtro, fondo, corte 5x15/10x15, atrezzo, idioma → RF-070.
5. Verifica cámara (live view) e impresora (estado/papel) → RF-020, RF-035.
6. Pulsa "Iniciar evento" → entra en **modo invitado**.

**Resultado:** evento listo para recibir sesiones.

---

## CU-02 · Hacer una sesión de fotos (Invitado)

**Precondición:** evento iniciado en modo invitado.

1. El invitado pulsa "Empezar" en la pantalla táctil.
2. (Opcional) Elige atrezzo virtual y/o fondo si están habilitados → RF-041, RF-042.
3. Por cada foto de la plantilla: live view + cuenta atrás 3-2-1 + disparo → RF-021, RF-022.
4. Tras cada disparo, se muestra la foto recién hecha → RF-023.
5. Al completar las N fotos, se muestra el montaje en la plantilla → RF-024.
6. La app guarda originales y montaje, aplica filtro, y si hay 2+ fotos genera el GIF → RF-025, RF-050.
7. Se imprime automáticamente el nº de copias configurado → RF-030, RF-031.
8. Se ofrece compartir: **QR**, **email** → RF-062, RF-063.
9. Si hay conexión, la subida a la web ocurre en segundo plano; si no, se encola → RF-060, RF-061.

**Alternativos:**
- 2a. Si el invitado no elige atrezzo/fondo, se usa el del evento.
- 7a. Si la impresora da error, se notifica al operador y el layout queda en cola de impresión.

---

## CU-03 · Reimprimir una foto (Operador/Invitado)

1. Desde "Galería del evento", se listan los layouts ya hechos → RF-034.
2. Se selecciona un layout.
3. Se elige el nº de copias adicionales → RF-032.
4. Se envía a imprimir con el corte configurado → RF-033.

---

## CU-04 · Grabar una confesión (Invitado)

1. El invitado entra en "Confesiones".
2. La app activa cámara + micrófono y muestra niveles de audio → RF-052.
3. Cuenta atrás y grabación del clip.
4. El invitado revisa y decide guardar o repetir → RF-053.
5. El clip se guarda en `confesiones/` y se encola para subir si procede.

---

## CU-05 · Compartir por QR (Invitado)

1. Tras la sesión, la app muestra un QR asociado a la(s) foto(s) → RF-062.
2. El invitado lo escanea con su móvil.
3. Se abre la URL pública de su foto/galería en la web DecaBox → [galería](../05-web-decabox/galeria-publica-eventos.md).
4. Desde ahí el invitado descarga y comparte/etiqueta él mismo en sus redes.

**Nota:** la auto-publicación con etiquetado en Instagram **no es posible** por API; ver [límites](../06-integraciones/instagram-limitaciones.md).

---

## CU-06 · Enviar por email (Invitado)

1. El invitado pulsa "Enviar por email".
2. Introduce su correo en un teclado en pantalla → RF-063.
3. La app (o la API) envía la foto/gif vía Resend → [email](../06-integraciones/email-resend.md).
4. Si no hay conexión, el envío se encola.

---

## CU-07 · Sincronizar al recuperar conexión (Sistema)

1. La app detecta conexión disponible.
2. Procesa la cola de subida (fotos, gifs, vídeos, emails pendientes) → RF-061.
3. Marca cada elemento como sincronizado; reintenta los fallidos con backoff.

Ver [flujo offline/online](../01-arquitectura/flujo-offline-online-sync.md).

---

## CU-08 · Gestionar tipos de evento en la web (Administrador)

1. El admin edita el contenido de bodas/comuniones/etc. en BBDD (no en código) → RF-080.
2. La web DecaBox sirve ese contenido en es/fr/eu → RF-081.

Ver [migración a BBDD](../05-web-decabox/migracion-contenido-bbdd.md).
