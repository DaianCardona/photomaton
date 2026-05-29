# Mantenimiento y backups

Cómo cuidar los datos (fotos de clientes = activo crítico) y mantener el sistema sano a lo largo del tiempo.

## Copias de seguridad

### En local (Surface) — carpetas de evento
- Tras cada evento, **copiar la carpeta del evento** (`Nombre_DD.MM.AA` con `originales/layout/gifs/videos/confesiones`) a:
  - Disco externo / NAS, y/o
  - Almacenamiento en la nube de confianza.
- Los **originales** son lo más valioso: priorizar su respaldo.
- Regla **3-2-1** recomendada: 3 copias, 2 soportes distintos, 1 fuera del sitio.

### En servidor (CapRover)
- **PostgreSQL `decabox-bbdd`**: `pg_dump` periódico (cron/CapRover) a almacenamiento seguro; verificar restauración de vez en cuando.
- **Medios** (volumen `/data/media` o bucket MinIO): copia/replicación periódica.
- Guardar también la **configuración** (variables de entorno) en un gestor de secretos.

## Limpieza y espacio en disco (Surface)
- La app avisa de **espacio bajo** (RNF-018).
- Tras respaldar, **archivar/eliminar** eventos antiguos del disco de trabajo.
- Los vídeos (confesiones) pesan: vigilarlos especialmente.

## Retención y RGPD
- Aplicar la **política de retención** acordada por evento (galería web disponible X meses, luego archivar/borrar).
- Atender solicitudes de **borrado** (por foto o evento) desde la web/BBDD ([endpoints](../04-backend-api/endpoints-api.md), [privacidad](../01-arquitectura/seguridad-y-privacidad.md)).
- Borrado coordinado: almacén de medios **y** BBDD.

## Actualizaciones
- **App de escritorio:** instalar nuevas versiones (electron-builder; auto-update opcional). Probar en taller antes de un evento, nunca el mismo día.
- **API/BBDD:** desplegar cambios en CapRover con migraciones versionadas; hacer backup antes de migrar.
- **Drivers** de cámara/impresora: mantener actualizados (DNP, Canon).

## Mantenimiento preventivo del hardware
- Limpieza de la impresora según manual DNP; control del consumible y repuestos.
- Revisar cables USB y hub (puntos típicos de fallo).
- Limpiar sensor/óptica de la cámara periódicamente.

## Registro de incidencias
- Anotar incidencias por evento (qué falló, cómo se resolvió) para mejorar la app y la operativa.
- Revisar logs (electron-log) tras incidencias relevantes.

## Checklist periódico
- [ ] Backups de eventos recientes verificados.
- [ ] `pg_dump` y copia de medios al día.
- [ ] Espacio en disco de la Surface holgado antes del próximo evento.
- [ ] App, drivers y API actualizados y probados.
- [ ] Política de retención aplicada a eventos caducados.
