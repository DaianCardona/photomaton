# Reimpresión y galería local

Cubre RF-032/034 y CU-03. Permite ver todas las sesiones del evento y reimprimir bajo demanda con la
cantidad de copias que se quiera.

## Galería del evento

- Cuadrícula con miniaturas de **todos los layouts** (montajes) de la sesión actual del evento.
- Filtros/orden: por hora, por sesión.
- Al seleccionar un layout, vista ampliada con: fotos individuales, GIF, y acciones.

## Acciones sobre un layout

| Acción | Detalle |
|--------|---------|
| **Reimprimir** | Elegir nº de copias adicionales (RF-032) y corte (10x15 / 5x15), enviar a la impresora (RF-033). |
| **Reenviar por email** | Volver a enviar al correo indicado o a otro. |
| **Mostrar QR** | Regenerar/mostrar el QR de esa foto/sesión. |
| **Ver GIF / vídeo** | Reproducir el GIF asociado. |

## Reimpresión: comportamiento

1. Desde galería se selecciona el layout.
2. Se indican copias adicionales y corte.
3. Se crea un nuevo `print_job` (auditoría) y se envía a la cola de impresión.
4. Si la impresora está ocupada/sin papel, el trabajo espera y se avisa.

> Útil cuando varias personas de la misma foto quieren copia, o cuando una copia sale defectuosa.

## Datos

- La galería lee de SQLite (`sessions`, `photos`, `print_jobs`) y muestra los binarios desde la carpeta del evento.
- No depende de internet: es totalmente local (RNF-005).

## Acceso

- Disponible desde el **modo operador** (ajustes → galería) y, si se desea, desde un botón del modo invitado limitado a "ver mis fotos" sin permitir reimprimir sin PIN.

Relacionado: [impresora DNP](../03-hardware/impresora-dnp.md) · [ajustes](pantalla-ajustes.md) · [QR](../06-integraciones/compartir-qr.md) · [email](../06-integraciones/email-resend.md).
