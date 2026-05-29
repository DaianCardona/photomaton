# Riesgos

Riesgos técnicos y de proyecto, con su mitigación. Prioridad por impacto × probabilidad.

| # | Riesgo | Impacto | Prob. | Mitigación |
|---|--------|---------|-------|------------|
| R1 | **EDSDK/Canon**: integración nativa compleja en Electron (hilos, modelo, licencia) | Alto | Media | Addon N-API aislado; confirmar modelo de cámara; fallback gphoto2 y webcam; *spike* temprano en Fase 1 |
| R2 | **Corte DNP 5x15/10x15** no controlable cómodamente desde Electron | Alto | Media | Usar presets del driver DNP; evaluar SDK/hot-folder DNP; validar con la impresora real cuanto antes |
| R3 | **Live view con latencia** alta (RNF-002) | Medio | Media | Optimizar transporte IPC (buffers), reducir resolución del preview, medir en la Surface |
| R4 | **IA de fondo** demasiado pesada para la Surface | Medio | Media | Priorizar croma; medir IA antes de activarla; permitir desactivar; usar modelos ligeros (MediaPipe) |
| R5 | **Wifi inestable en eventos** | Medio | Alta | Offline-first ya es principio rector; cola persistente; QR con URL determinista |
| R6 | **Sync A/V en confesiones** (desfase audio/vídeo) | Medio | Media | ffmpeg con PTS coherentes; pruebas de sync labial; mover confesiones a subfase |
| R7 | **Pérdida de fotos** por cierre/cuelgue | Alto | Baja | Escribir original a disco antes de procesar; transacciones SQLite; recuperación al reabrir |
| R8 | **Rendimiento de impresión** en cola (varias seguidas) | Medio | Media | Cola de impresión con estado; control de saturación |
| R9 | **Cambio de despliegue web** (static export → Next servidor) rompe SEO/deploy | Medio | Baja | Mantener metadatos/schemas; ISR conserva SEO; decisión confirmada antes de migrar |
| R10 | **Cuerpo de cámara EOS sin confirmar** (lo aportado, Speedlite 270EX II, es un flash, no cámara) | Alto | Media | Confirmar el modelo del cuerpo Canon EOS antes de Fase 1; validar EDSDK/live view con él. Impresora **DNP DS-RX1 ya confirmada** |
| R11 | **RGPD**: galerías públicas o emails mal gestionados | Alto | Baja | Códigos no adivinables, no indexables, caducidad, borrado, consentimiento en pantalla |
| R12 | **Coste de mantener API+BBDD+almacén** en CapRover | Bajo | Media | Empezar con volumen (sin MinIO); backups simples; escalar solo si hace falta |
| R13 | **Alcance MVP muy amplio** (el usuario quiere todo) | Medio | Alta | Fasear (ver [fases](fases-y-mvp.md)); Fase 1 sólida antes de añadir capas |

## Decisiones que reducen riesgo (ya tomadas)
- Electron (reaprovecha skills) → menos riesgo en UI/editor; concentra el riesgo en hardware (R1/R2), que se ataca con *spikes* tempranos.
- Croma como vía principal de fondo → IA opcional (R4).
- Offline-first → neutraliza R5/R7.

## Próximas validaciones críticas
1. Confirmar **modelo del cuerpo de cámara Canon EOS** (el Speedlite 270EX II es flash, no cámara) (R10).
2. *Spike* EDSDK live view + disparo en la Surface con ese cuerpo (R1, R3).
3. *Spike* impresión **DNP DS-RX1** con corte real 5x15/10x15 (R2). Impresora ya confirmada.
