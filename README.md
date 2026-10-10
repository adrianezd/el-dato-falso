# El Dato Falso

Juego de fiesta de trivia para grupos, hecho con HTML, CSS y JavaScript puros (sin frameworks, sin build, sin backend). Se juega pasando un solo móvil entre todos los jugadores, y funciona sin internet tras la primera visita.

**Juega aquí:** https://adrianezd.github.io/el-dato-falso/

## Modos de juego

| Modo | Qué pasa |
| --- | --- |
| 🙈 **Clásico** | Cada jugador recibe un dato distinto sobre el tema; los mentirosos reciben uno falso **sin saberlo**. |
| 😏 **Mentiroso consciente** | Igual, pero el mentiroso sabe que su dato es falso y tiene que defenderlo. |
| ⚡ **Verdadero o falso** | Quiz rápido para todo el grupo: un dato en pantalla, cada uno opina, se revela y suma quien acierta (5 a 30 datos). |

## Funcionalidades

- 45 temas y 585 datos (9 verdaderos y 4 falsos por tema) en 10 categorías: animales, famosos, países, comida, espacio, cuerpo humano, historia, ciencia, deportes e inventos.
- Selección múltiple de categorías y nombres de jugadores (compartidos con los otros juegos).
- Carta que se gira manteniendo pulsado, cronómetro de debate con anillo, sonido y vibración.
- Votación a mano alzada o secreta y marcador entre rondas.
- Pantalla siempre encendida durante la partida y modo sin conexión (service worker).

## Con código de sala

Además de pasarse un móvil, se puede jugar **cada uno con el suyo**. En los ajustes, la pestaña «Con código de sala»:

1. Uno pone su nombre y pulsa **Crear sala**: sale un código de 5 letras (y un botón para compartir el enlace, que ya lleva el código).
2. El resto pone su nombre y el código y pulsa **Unirse**.
3. Quien creó la sala la configura con los ajustes normales del juego (modo, categorías, mentirosos, tiempo…) y también juega. Los jugadores son los que han entrado.
4. En cada ronda, cada uno ve su carta en su móvil manteniendo pulsado, se vota desde cada móvil y al revelar todos ven el resultado.

El modo «Verdadero o falso» no está en la sala, porque es un quiz en un solo móvil.

Los móviles se comunican a través de [ntfy.sh](https://ntfy.sh) (servicio gratuito de mensajes, sin cuentas), un canal por sala, sin que los mensajes se guarden en el servidor. En este modo hace falta internet. La lógica está en `sala.js` y `sala.css`, iguales en los tres juegos de fiesta.

## Puntuación

- El grupo vota a todos los mentirosos → **+1** a cada jugador con dato verdadero.
- Algún mentiroso se libra → **+2** a cada mentiroso.
- Verdadero o falso → **+1** por cada acierto.

## Transparencia sobre los datos

Los temas y los datos (verdaderos y falsos) son contenido de trivia general redactado para este proyecto. Los datos verdaderos están basados en hechos de conocimiento público; los datos falsos son invención propia, diseñados para sonar creíbles dentro del juego. Proyecto original, no afiliado a ninguna marca comercial.
