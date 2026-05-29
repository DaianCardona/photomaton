# Requisitos de hardware

Equipo necesario para operar el fotomatón con la app, con foco en la **Microsoft Surface** del usuario.

## Equipo de cómputo (Surface)

| Recurso | Mínimo | Recomendado | Motivo |
|---------|--------|-------------|--------|
| SO | Windows 10 x64 | Windows 11 x64 | RNF-011 |
| CPU | 4 núcleos | 6+ núcleos | Procesado imagen/vídeo, IA |
| RAM | 8 GB | 16 GB | sharp/ffmpeg, live view, IA de fondo |
| Disco | SSD 256 GB | SSD 512 GB+ | Eventos pesan (originales+vídeo) |
| GPU | integrada | con aceleración | IA de fondo / vídeo en tiempo real |
| Pantalla | táctil | táctil ≥ 12" | Modo invitado táctil |
| Puertos USB | 2 libres | hub alimentado | Cámara + impresora + micro a la vez |

> La **IA sin croma** (RF-044) es lo más exigente; si la Surface es modesta, priorizar croma y medir la IA antes de activarla (ver [riesgos](../07-roadmap/riesgos.md)).

## Periféricos

| Dispositivo | Detalle |
|-------------|---------|
| **Cámara Canon** | Cuerpo réflex/mirrorless EOS con soporte EDSDK; USB. **Modelo del cuerpo por confirmar** (el Speedlite 270EX II es el flash). Ver [cámara](camara-canon.md). |
| **Flash Canon Speedlite 270EX II** | Iluminación montada sobre la cámara (confirmado). No interviene en la conexión USB. |
| **Impresora DNP DS-RX1** | Confirmada. Consumible 10x15 (4x6); corte a 5x15 (2x6). Ver [impresora](impresora-dnp.md). |
| **Micrófono** | USB, para confesiones. Ver [micrófono](microfono-audio.md). |
| **Hub USB alimentado** | Recomendado para alimentar varios dispositivos con estabilidad. |
| **Croma verde** | Tela/fondo verde + iluminación uniforme (para fondo virtual por croma). |
| **Iluminación** | Foco/aro de luz para calidad y croma uniforme. |
| **Soporte/cabina** | Estructura del fotomatón, soporte de Surface y cámara. |

## Energía y montaje

- **Alimentación estable**: regleta con protección; evitar que la Surface entre en suspensión durante el evento (la app lo previene por software, RNF-019, pero conviene tenerla enchufada).
- **Cableado USB**: cables de calidad y longitud justa; el tethering de cámara es sensible a cables largos/malos.
- **Ventilación**: el procesado continuo calienta; no tapar rejillas.

## Checklist de hardware pre-evento

- [ ] Surface cargada y enchufada.
- [ ] Cámara conectada, batería/adaptador, tarjeta con espacio.
- [ ] Impresora con papel/consumible suficiente para la duración.
- [ ] Micrófono conectado (si hay confesiones).
- [ ] Croma e iluminación montados (si fondo virtual).
- [ ] Espacio en disco suficiente para el evento.

Ver también [guía de uso en evento](../08-operativa/guia-uso-evento.md).
