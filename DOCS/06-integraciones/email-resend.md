# Envío por email (Resend)

Cubre RF-063 y CU-06. El invitado introduce su correo en pantalla y recibe su foto/gif. Se usa
**Resend**, que ya está instalado en la web DecaBox (`resend` + `@react-email/render`).

## Arquitectura

- El **envío lo hace la API** (`decabox-api`), no la app de escritorio, para no exponer la clave de Resend en el cliente y para reintentar desde el servidor.
- La app llama a `POST /media/:id/email { to }` (ver [endpoints](../04-backend-api/endpoints-api.md)).
- Si no hay conexión, la app **encola** la solicitud y la envía al sincronizar (ver [sync](../01-arquitectura/flujo-offline-online-sync.md)).

## Flujo

```
[Invitado] pulsa "Enviar por email"
   ▼
[Teclado en pantalla] introduce su correo (validación de formato)
   ▼
[App] encola item kind=email (media_id + destino)
   ▼ (cuando hay red)
[API] POST /media/:id/email → Resend envía el correo con la foto/gif (enlace o adjunto)
   ▼
[Registro] email_requests (status sent/error, provider_id)
```

## Contenido del email

- Plantilla con **@react-email/render** (coherente con la marca DecaBox).
- Incluye: saludo, la foto/gif (como **enlace a la galería** y/o adjunto ligero), nombre y fecha del evento, y CTA a la web.
- Adjuntar el binario solo si es ligero (foto); para GIF/vídeo, **enlace** a la galería.

## Configuración

| Variable | Dónde | Detalle |
|----------|-------|---------|
| `RESEND_API_KEY` | API (CapRover) | Clave de Resend (secreta) |
| Remitente | API | Dominio verificado en Resend (p. ej. `fotos@decabox.<dominio>`) |
| Plantilla | API | Componente react-email |

## Consideraciones

- **Verificar el dominio** en Resend para que los correos no caigan en spam (SPF/DKIM).
- **Validar** el email en cliente (formato) y en servidor.
- **Rate limiting** del endpoint de email para evitar abuso.
- **Privacidad:** el email es un dato personal; se usa solo para el envío solicitado (ver [seguridad](../01-arquitectura/seguridad-y-privacidad.md)).
- **Reintentos** desde la API si Resend falla; estado en `email_requests`.

Relacionado: [QR](compartir-qr.md) · [galería](../05-web-decabox/galeria-publica-eventos.md) · [endpoints](../04-backend-api/endpoints-api.md).
