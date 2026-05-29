# Troubleshooting

Incidencias frecuentes y cómo resolverlas en directo. Orden: lo más crítico para no parar el servicio.

## Cámara

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| No aparece la cámara | USB/cable o modo de la cámara | Reconectar USB; cámara encendida y en modo foto; cambiar de puerto/cable; reabrir sesión desde ajustes |
| Live view negro o congelado | EDSDK perdió el stream | Detener/reiniciar live view; reconectar; revisar batería/adaptador |
| Disparo no responde | Cámara ocupada/error EDSDK | Reintento automático; si persiste, reconectar; usar **fallback webcam** para no parar |
| Fotos salen oscuras/claras | Exposición/iluminación | Ajustar luz; revisar ajustes de cámara |

## Impresora DNP

| Síntoma | Causa | Solución |
|---------|-------|----------|
| No imprime | Spooler/driver o impresora apagada | Comprobar encendido y conexión; reintentar trabajo desde galería |
| Atasco de papel | Consumible mal colocado | Seguir guía DNP de desatasco; reanudar cola |
| "Sin papel/ribbon" | Consumible agotado | Cambiar rollo/ribbon; el trabajo en cola se reanuda |
| El corte no se aplica | Preset/opción de corte incorrecta | Seleccionar el preset "5x15 corte" o "10x15"; ver [impresora DNP](../03-hardware/impresora-dnp.md) |
| Colores desviados | Falta de perfil ICC/calibración | Aplicar perfil DNP; calibrar |

## Conectividad / sync

| Síntoma | Causa | Solución |
|---------|-------|----------|
| No sube a la web | Sin internet | Normal: queda en cola; subirá al recuperar red. No bloquea el evento |
| QR muestra "preparando tus fotos" | Subida aún pendiente | Se completa al sincronizar; verificar red |
| Email no llega | Resend/dominio/spam | Revisar carpeta spam; verificar dominio en Resend; reintento desde galería |
| Sync atascada | Errores repetidos | Revisar estado de cola en ajustes; comprobar token de dispositivo y URL de API |

## App / sistema

| Síntoma | Causa | Solución |
|---------|-------|----------|
| App lenta | Procesado pesado / disco lleno | Cerrar otras apps; liberar disco; desactivar IA de fondo |
| La Surface se suspende | Energía | Mantener enchufada; la app evita suspensión, pero conviene verificar plan de energía |
| Cuelgue/cierre | Error inesperado | Reabrir la app y el evento: las sesiones guardadas **no se pierden**; continuar |
| Falta espacio | Eventos pesados | Mover eventos antiguos; usar disco externo; ver [mantenimiento](mantenimiento-y-backups.md) |

## Confesiones (vídeo/audio)

| Síntoma | Causa | Solución |
|---------|-------|----------|
| No se oye | Micrófono mal seleccionado | Elegir dispositivo en ajustes; test de audio; revisar conexión |
| Audio desincronizado | Drift A/V | Repetir grabación; revisar configuración de sync (ffmpeg) |

## Dónde mirar los logs
- Logs locales por evento (electron-log) en el directorio de datos de la app.
- Estado de cola y conexión en **Ajustes → Compartir/conectividad**.

> Regla de oro en directo: **el evento manda**. Si algo online falla, sigue capturando e imprimiendo;
> la parte web se resuelve después con la cola de sync.
