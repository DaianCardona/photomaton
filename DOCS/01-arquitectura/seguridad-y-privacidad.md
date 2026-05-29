# Seguridad y privacidad

El fotomatón captura imágenes y vídeos de personas en eventos privados. Aplica el **RGPD** (UE) y la
**LOPDGDD** (España). Este documento fija los principios; la implementación concreta se detalla en los
docs de API, email y galería.

## Datos personales tratados

- **Imágenes y vídeos** de invitados (categoría de datos personales; las imágenes pueden revelar datos sensibles de forma incidental).
- **Email** del invitado (cuando solicita recibir su foto).
- Metadatos: fecha/hora, evento.

No se recogen datos identificativos adicionales salvo el email voluntario.

## Base legal y consentimiento

- **Consentimiento** del invitado para: hacerse la foto, recibirla por email y que se publique en la galería del evento.
- El **contrato con el cliente** (anfitrión) cubre el tratamiento durante el servicio; DecaBox actúa como encargado/responsable según el caso (a definir en el contrato; ya existe modelo de contrato en la carpeta de negocio).
- En pantalla, antes de capturar o al enviar email, se muestra un **aviso breve** + enlace a la política de privacidad de DecaBox.

## Galería web y acceso por QR

- Las galerías por evento deben ser **no indexables** y de **acceso por enlace/código** (no listado público abierto). Ver [galería](../05-web-decabox/galeria-publica-eventos.md).
- URL con código no adivinable (`/g/<eventCode>/<sessionCode>`), opción de caducidad del enlace.
- Opción de **borrar una foto** a petición del invitado (derecho de supresión).

## Retención y borrado

- **Local (Surface):** los originales y medios del evento se conservan hasta que el operador los entrega/archiva y limpia. Ver [mantenimiento](../08-operativa/mantenimiento-y-backups.md).
- **Web:** definir una política de retención por evento (p. ej. galería disponible X meses, luego archivado/borrado).
- Mecanismo de **borrado por evento** y **por foto** desde la web/BBDD.

## Seguridad técnica

| Aspecto | Medida |
|---------|--------|
| Acceso a ajustes de la app | Modo operador con **PIN** (RNF-014) |
| Comunicación app ↔ API | **HTTPS** obligatorio |
| Autenticación del dispositivo | Token/JWT de dispositivo emitido por la API (ver [auth](../04-backend-api/autenticacion-y-roles.md)) |
| Secretos (tokens, claves Resend) | Variables de entorno; **nunca** en el repo ni en el cliente |
| Almacén de medios | Acceso por URL con código; no *bucket* público listable |
| Logs | Sin volcar datos personales innecesarios; rotación de logs |
| Instalador | Firmado (a futuro) para evitar alertas y manipulación |

## RGPD: checklist mínima antes de producción

- [ ] Texto de consentimiento en pantalla (captura y email).
- [ ] Política de privacidad enlazada (la web ya tiene `/privacidad`).
- [ ] Galerías con acceso por código y opción de caducidad.
- [ ] Función de borrado por foto/evento.
- [ ] Acuerdo de tratamiento de datos con el cliente del evento (contrato).
- [ ] Cifrado en tránsito (HTTPS) y secretos fuera del cliente.
