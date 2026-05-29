# Visión y objetivos

## El problema

DecaBox presta servicio de **fotomatón** en bodas, bautizos, comuniones, eventos de empresa y
fiestas. Hoy el flujo en evento depende de **dslrbooth** (software de terceros): captura con cámara
réflex, montaje en plantilla e impresión. Esto funciona, pero:

- No está integrado con la web ni con la marca DecaBox.
- La personalización (plantillas, filtros, atrezzo virtual, fondos) está limitada a lo que ofrece el producto de terceros.
- La subida online, el QR para compartir y el envío por email no forman parte de un mismo flujo controlado.
- La web (`PROYECTOS\DECABOX`) tiene los tipos de evento **hardcodeados** y no hay BBDD para gestionar eventos ni galerías.

## La solución

Construir **una app de escritorio propia** (Windows/Surface) que cubra todo el ciclo del fotomatón
en evento, conectada a una **API + BBDD** que también alimenta la web DecaBox:

1. **Editor de plantillas** a tamaño de papel (10x15 cm; también 5x15) para importar o crear diseños.
2. **Captura** con cuenta atrás, de 1 a 4 fotos (horizontal o vertical), con preview foto a foto y montaje final.
3. **Impresión** en impresora DNP con nº de copias configurable, corte 5x15/10x15 y reimpresión bajo demanda.
4. **Filtros** (normal, B/N, sepia/beige, …), **atrezzo virtual** y **fondos virtuales** (croma + IA).
5. **GIF automático** cuando hay 2+ fotos y **vídeo-confesiones** con micrófono.
6. **Organización automática** en carpetas por evento (nombre + fecha) con subcarpetas estándar.
7. **Compartir**: subida a la web DecaBox (cuando hay conexión) + **QR** por foto y **envío por email**.

## Objetivos

| # | Objetivo | Métrica de éxito |
|---|----------|------------------|
| O1 | Sustituir dslrbooth por app propia | Un evento real completo operado solo con la app |
| O2 | Reducir fricción en directo | De "pulsar" a foto impresa en < 30 s |
| O3 | Fiabilidad sin red | 0 pérdidas de fotos sin conexión; sync posterior 100% |
| O4 | Marca propia integrada | Fotos visibles en galería web DecaBox por evento |
| O5 | Personalización por evento | Plantilla, filtro, fondo y copias configurables por boda |

## No-objetivos (de esta primera entrega)

- App móvil nativa (iOS/Android). El compartir del invitado se hace desde su propio móvil vía QR.
- Auto-publicación en el Instagram del invitado (no lo permite la API; ver [límites](../06-integraciones/instagram-limitaciones.md)).
- Edición de vídeo avanzada más allá de GIF y clip de confesión.

## Personas

- **Operador (Daian / equipo DecaBox):** monta el equipo, configura el evento, supervisa y resuelve incidencias.
- **Invitado:** usa la pantalla táctil, se hace fotos, elige atrezzo/fondo, recibe copia impresa y comparte por QR/email.
- **Administrador web:** gestiona eventos y galerías desde la web/BBDD.

## Principios de diseño

1. **Offline-first.** El wifi en bodas es poco fiable; nada del flujo en directo puede depender de la red.
2. **A prueba de invitados.** UI táctil, grande, con pasos guiados y sin estados que confundan.
3. **El original no se pierde.** Toda captura RAW/JPG se guarda antes de cualquier proceso.
4. **Configurable por evento, simple en directo.** El operador prepara; el invitado solo toca lo justo.
5. **Reaprovechar el ecosistema DecaBox.** Mismo stack que la web (React/TS) y mismo CapRover.

## Enlaces

- [Requisitos funcionales](requisitos-funcionales.md) · [Casos de uso](casos-de-uso.md) · [Roadmap](../07-roadmap/fases-y-mvp.md)
