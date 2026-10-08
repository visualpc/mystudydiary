# MEMORY.md

## Estado actual
- V1 funcionando: formulario (fecha/tema/minutos), racha actual, lista de sesiones, localStorage.
- Añadida la "mejor racha" (🏆) junto a la racha actual.
- Añadido "⏱️ Esta semana: X min" en la tarjeta de la racha.
- Añadido "Este mes: X días" (días distintos con sesión en el mes actual) en la tarjeta de la racha.
- Rediseño visual: la página es una hoja de cuaderno (rayas, margen rojo, guiones entre secciones); el número de racha en serif con trazo de marcador amarillo. Los 3 datos van en columna, una línea cada uno.

## Decisiones importantes
- Mejor racha se RECALCULA siempre desde las sesiones; no se persiste. Si se borran sesiones, puede bajar. (Usuario aceptó esta opción.)
- Los días del mes también se recalculean siempre desde las sesiones; no se guardan aparte.
- Días del mes: varias sesiones el mismo día cuentan una vez y las fechas futuras se ignoran (consistente con racha/minutos de semana). Solo se muestra el número, sin emoji ni nombre de mes (decisión del usuario).
- Diseño "hoja de cuaderno": sin dependencias ni fuentes externas (Georgia y la sans del sistema; todo local para funcionar con doble clic). Los datos secundarios van en columna: tres frases en fila no caben en 510 px.
- Las fechas futuras no cuentan ni para la racha, ni para la mejor racha, ni para los minutos de la semana.
- La semana empieza en lunes (convención española) y los minutos se muestran a secas, sin pasar a horas, para que sea simple.
- Formato de datos real: clave localStorage `diarioEstudio`, objetos `{ fecha, tema, minutos }`. AGENTS.md decía otra cosa por error; se corrigió a favor del código (no hubo migración de datos).

## Errores a evitar
- No usar `toISOString()` ni `new Date("AAAA-MM-DD")`: interpretan UTC y desplazan el día. Usar siempre fecha local.
- No introducir frameworks, npm ni módulos ES: debe funcionar con doble clic en `index.html`.
- Al verificar maquetas con capturas: Brave headless impone un ancho mínimo de 500 px y la lectura de imágenes a veces devuelve imágenes de otro archivo. Fiable: medir con `--dump-dom` + JS (getBoundingClientRect).

## Pendientes (posible futuro, no pedido)
- Borrar sesiones, estadísticas por tema. Solo si el usuario lo pide.
