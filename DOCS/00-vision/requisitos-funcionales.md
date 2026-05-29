# Requisitos funcionales

Lista trazable. Cada requisito enlaza conceptualmente con casos de uso, docs de detalle y fases del
[roadmap](../07-roadmap/fases-y-mvp.md). Prioridad: **M** (MVP/imprescindible), **S** (siguiente), **C** (mejora).

## Gestión de eventos

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-001 | Crear un evento con nombre y fecha; la app genera la carpeta `Nombre_DD.MM.AA` con subcarpetas estándar. | M |
| RF-002 | Listar, abrir y reanudar eventos existentes. | M |
| RF-003 | Asociar a cada evento su configuración (plantilla activa, filtro, fondo, copias, corte). | M |
| RF-004 | Cerrar/archivar un evento y consultar sus estadísticas (nº sesiones, fotos, impresiones). | S |

Detalle: [estructura de carpetas](../02-app-escritorio/estructura-carpetas-evento.md).

## Editor de plantillas

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-010 | Lienzo a 10x15 cm y 5x15 cm a 300 DPI, orientación horizontal o vertical. | M |
| RF-011 | Importar una plantilla PNG existente (las 8 familias actuales) como fondo de diseño. | M |
| RF-012 | Definir 1–4 huecos de foto con posición, tamaño y orientación (H/V) por hueco. | M |
| RF-013 | Añadir capas de texto (fuente, tamaño, color) p. ej. nombres + fecha. | M |
| RF-014 | Añadir imágenes/logos como capas (PNG con transparencia). | M |
| RF-015 | Guardar la plantilla como archivo reutilizable y previsualizarla. | M |
| RF-016 | Botón "Visualizar" que lleva directamente a la pantalla de captura con esa plantilla. | M |

Detalle: [editor de plantillas](../02-app-escritorio/editor-plantillas.md).

## Captura de fotos

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-020 | Mostrar live view de la cámara antes del disparo. | M |
| RF-021 | Cuenta atrás 3-2-1 visible antes de cada foto. | M |
| RF-022 | Capturar 1, 2, 3 o 4 fotos según la plantilla, en horizontal o vertical. | M |
| RF-023 | Mostrar cada foto una a una tras capturarla. | M |
| RF-024 | Mostrar el montaje final (todas en la plantilla) antes de imprimir. | M |
| RF-025 | Guardar siempre el original sin procesar antes de aplicar filtros/fondos. | M |

Detalle: [flujo de captura](../02-app-escritorio/flujo-captura.md).

## Impresión

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-030 | Imprimir el layout automáticamente tras la sesión. | M |
| RF-031 | Configurar el nº de copias por defecto en ajustes. | M |
| RF-032 | Reimprimir bajo demanda durante el evento, eligiendo copias adicionales. | M |
| RF-033 | Configurar el corte de la impresora DNP: 10x15 entero o 2 tiras 5x15. | M |
| RF-034 | Ver la galería de layouts del evento y elegir cuál reimprimir. | M |
| RF-035 | Mostrar estado de la impresora (papel restante, error, cola). | S |

Detalle: [impresora DNP](../03-hardware/impresora-dnp.md), [reimpresión y galería](../02-app-escritorio/reimpresion-y-galeria.md).

## Filtros, atrezzo y fondos

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-040 | Elegir filtro en ajustes: normal, B/N, sepia/beige y otros propuestos. | M |
| RF-041 | Aplicar atrezzo virtual seleccionable por el invitado (overlays). | S |
| RF-042 | Elegir fondo virtual de una colección guardada. | S |
| RF-043 | Sustituir fondo por croma verde (chroma key). | S |
| RF-044 | Sustituir fondo por IA sin croma (segmentación). | C |

Detalle: [filtros](../02-app-escritorio/filtros-imagen.md), [atrezzo](../02-app-escritorio/atrezzo-virtual.md), [fondos](../02-app-escritorio/fondos-virtuales.md).

## GIF y vídeo

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-050 | Generar GIF automáticamente cuando la plantilla tiene 2+ fotos. | M |
| RF-051 | Guardar el GIF en la subcarpeta `gifs/` del evento. | M |
| RF-052 | Módulo de vídeo-confesiones: grabar vídeo + audio de micrófono. | S |
| RF-053 | Revisar/repetir/guardar la confesión antes de archivarla en `confesiones/`. | S |

Detalle: [GIF y vídeo](../02-app-escritorio/gif-y-video.md), [vídeo-confesiones](../02-app-escritorio/video-confesiones.md).

## Compartir y conectividad

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-060 | Si hay conexión, subir automáticamente fotos/gifs a la web DecaBox. | M |
| RF-061 | Si no hay conexión, encolar y sincronizar al recuperarla, sin perder nada. | M |
| RF-062 | Generar QR por foto/sesión para que el invitado abra y comparta su imagen. | M |
| RF-063 | Enviar foto/gif por email al correo que indique el invitado. | M |
| RF-064 | Documentar la opción Instagram y su alternativa real por QR. | M |

Detalle: [sync](../01-arquitectura/flujo-offline-online-sync.md), [QR](../06-integraciones/compartir-qr.md), [email](../06-integraciones/email-resend.md).

## Ajustes y operación

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-070 | Pantalla de ajustes: copias, filtro, fondo, corte, atrezzo, idioma. | M |
| RF-071 | Selección/cambio de cámara e impresora conectadas. | M |
| RF-072 | Modo operador protegido (PIN) separado del modo invitado. | S |

## Web y BBDD

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-080 | La web DecaBox lee los tipos de evento desde BBDD en lugar de `translations.ts`. | S |
| RF-081 | Mantener los 3 idiomas (es/fr/eu) en la migración a BBDD. | S |
| RF-082 | Galería pública por evento accesible desde la web. | S |
| RF-083 | API que recibe las subidas del fotomatón y las asocia al evento. | M |

Detalle: [migración](../05-web-decabox/migracion-contenido-bbdd.md), [API](../04-backend-api/endpoints-api.md).
