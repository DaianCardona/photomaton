# Requisitos no funcionales

| ID | Categoría | Requisito | Criterio |
|----|-----------|-----------|----------|
| RNF-001 | Rendimiento | De disparo a foto impresa | < 30 s en condiciones normales |
| RNF-002 | Rendimiento | Latencia del live view | < 150 ms percibidos, ≥ 24 fps |
| RNF-003 | Rendimiento | Generación de GIF (4 fotos) | < 5 s tras la sesión |
| RNF-004 | Rendimiento | Arranque de la app | < 10 s hasta pantalla de inicio |
| RNF-005 | Fiabilidad | Operación sin conexión a internet | 100% del flujo en directo funciona offline |
| RNF-006 | Fiabilidad | Integridad de originales | Toda captura se persiste a disco antes de procesar; 0 pérdidas |
| RNF-007 | Fiabilidad | Recuperación tras corte de luz/cierre | Reapertura del evento sin perder sesiones ya guardadas |
| RNF-008 | Fiabilidad | Sincronización | Reintentos con backoff; la cola sobrevive a reinicios |
| RNF-009 | Usabilidad | UI táctil para invitados | Botones grandes, pasos guiados, sin teclado salvo email |
| RNF-010 | Usabilidad | Idiomas de la interfaz | Español mínimo; preparada para fr/eu como la web |
| RNF-011 | Compatibilidad | Plataforma | Windows 10/11 x64; validado en Microsoft Surface |
| RNF-012 | Compatibilidad | Cámara | Canon vía EDSDK; *fallback* gphoto2 |
| RNF-013 | Compatibilidad | Impresora | DNP DS-RX1 / DS620 / QW410 con corte 5x15/10x15 |
| RNF-014 | Seguridad | Modo operador | Protegido por PIN; ajustes no accesibles al invitado |
| RNF-015 | Privacidad | RGPD | Consentimiento, retención y borrado gestionables (ver doc privacidad) |
| RNF-016 | Mantenibilidad | Mismo stack que la web | TypeScript/React; código y convenciones compartidas |
| RNF-017 | Observabilidad | Logs locales | Registro de sesiones, impresiones y errores por evento |
| RNF-018 | Almacenamiento | Gestión de disco | Aviso de espacio bajo; medios organizados por evento |
| RNF-019 | Energía | Tolerancia a suspensión | La app evita que el equipo suspenda durante un evento activo |
| RNF-020 | Despliegue | Instalable | Instalador `.exe`/MSI firmable; actualizaciones controladas |

## Notas

- **RNF-002/RNF-001** dependen del rendimiento del EDSDK y del puerto USB; ver [cámara Canon](../03-hardware/camara-canon.md).
- **RNF-005/RNF-006** son el principio rector: el evento manda sobre la nube. La nube es "best effort".
- **RNF-013**: el corte es una capacidad concreta del driver/firmware DNP; ver [impresora DNP](../03-hardware/impresora-dnp.md).
- La IA de fondo (RF-044) puede entrar en tensión con RNF-001/002 en equipos modestos; se documenta como opcional y se mide antes de activarla por defecto. Ver [fondos virtuales](../02-app-escritorio/fondos-virtuales.md).
