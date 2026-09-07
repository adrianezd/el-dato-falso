'use strict';
/* =========================================================================
   EL DATO FALSO — temas con datos verdaderos y datos falsos
   Cada tema tiene 4 datos verdaderos y varios datos falsos (pero
   creíbles) que se usan para sustituir uno de los verdaderos en la
   tarjeta de los "mentirosos". Contenido de trivia general, redactado
   para este proyecto.
   ========================================================================= */

var TOPIC_CATEGORIES = {
  animales: {
    label: 'Animales',
    topics: [
      {
        nombre: 'El pulpo', emoji: '🐙',
        verdaderos: [
          'Tiene tres corazones.',
          'Tiene la sangre de color azul.',
          'Puede cambiar de color y textura de piel para camuflarse.',
          'Tiene ocho brazos cubiertos de ventosas.'
        ],
        falsos: [
          'Puede vivir más de 30 años.',
          'Tiene un caparazón duro que lo protege.',
          'Es el animal marino más grande que existe.'
        ]
      },
      {
        nombre: 'El camaleón', emoji: '🦎',
        verdaderos: [
          'Puede mover los dos ojos de forma independiente.',
          'Cambia de color también según su estado de ánimo y la temperatura, no solo para camuflarse.',
          'Tiene una lengua que puede ser más larga que su propio cuerpo.',
          'Sus patas están adaptadas para agarrarse con fuerza a las ramas.'
        ],
        falsos: [
          'Es venenoso para el ser humano.',
          'Vive principalmente en el fondo del mar.',
          'No tiene párpados.'
        ]
      },
      {
        nombre: 'La jirafa', emoji: '🦒',
        verdaderos: [
          'Es el animal terrestre más alto del mundo.',
          'Tiene el mismo número de vértebras en el cuello que un humano: siete.',
          'Duerme muy pocas horas al día.',
          'Su lengua puede medir hasta 50 centímetros.'
        ],
        falsos: [
          'Puede saltar más alto que un canguro.',
          'Es el animal terrestre más rápido del mundo.',
          'Cambia de color según su estado de ánimo.'
        ]
      },
      {
        nombre: 'El colibrí', emoji: '🐦',
        verdaderos: [
          'Es la única ave capaz de volar hacia atrás.',
          'Puede batir las alas más de 50 veces por segundo.',
          'Es una de las aves más pequeñas del mundo.',
          'Su corazón puede latir más de 1000 veces por minuto durante el vuelo.'
        ],
        falsos: [
          'Migra a lomos de aves más grandes.',
          'Puede permanecer bajo el agua varios minutos.',
          'Tiene el pico más largo del mundo en proporción a su cuerpo.'
        ]
      }
    ]
  },
  famosos: {
    label: 'Famosos',
    topics: [
      {
        nombre: 'Leonardo da Vinci', emoji: '🎨',
        verdaderos: [
          'Pintó la Mona Lisa.',
          'Fue también inventor e ingeniero, y diseñó máquinas voladoras.',
          'Nació en Italia, en el año 1452.',
          'Escribía muchas de sus notas al revés, de derecha a izquierda.'
        ],
        falsos: [
          'Nunca terminó ningún cuadro en toda su vida.',
          'Fue el primer ser humano en usar un microscopio.',
          'Ganó un premio real por sus esculturas en mármol.'
        ]
      },
      {
        nombre: 'Albert Einstein', emoji: '🧠',
        verdaderos: [
          'Desarrolló la teoría de la relatividad.',
          'Ganó el Premio Nobel de Física en 1921.',
          'Nació en Alemania.',
          'Nunca tuvo carné de conducir.'
        ],
        falsos: [
          'Suspendió matemáticas en el colegio.',
          'Trabajó toda su vida como profesor universitario en Estados Unidos.',
          'Inventó la bombilla eléctrica.'
        ]
      },
      {
        nombre: 'Marie Curie', emoji: '⚗️',
        verdaderos: [
          'Fue la primera persona en ganar dos premios Nobel en disciplinas distintas.',
          'Descubrió los elementos polonio y radio.',
          'Nació en Polonia.',
          'Murió por los efectos de la radiación, tras años investigándola.'
        ],
        falsos: [
          'Nunca salió de su país natal.',
          'Fue la primera mujer en pilotar un avión.',
          'Ganó el Premio Nobel de Literatura.'
        ]
      },
      {
        nombre: 'Cristiano Ronaldo', emoji: '⚽',
        verdaderos: [
          'Ha jugado en el Manchester United, el Real Madrid y la Juventus.',
          'Es el máximo goleador histórico de la selección de Portugal.',
          'Nació en la isla de Madeira.',
          'Ha ganado varios Balones de Oro.'
        ],
        falsos: [
          'Nunca ha jugado un Mundial con Portugal.',
          'Empezó su carrera profesional en un club brasileño.',
          'Es zurdo.'
        ]
      }
    ]
  },
  paises: {
    label: 'Países',
    topics: [
      {
        nombre: 'Japón', emoji: '🇯🇵',
        verdaderos: [
          'Está formado por miles de islas.',
          'Su capital es Tokio.',
          'Tiene una de las redes de metro más usadas del mundo.',
          'El monte Fuji es su montaña más alta.'
        ],
        falsos: [
          'Nunca ha sido gobernado por un emperador.',
          'Limita por tierra con China.',
          'Su bandera tiene tres franjas de colores.'
        ]
      },
      {
        nombre: 'Egipto', emoji: '🇪🇬',
        verdaderos: [
          'Las pirámides de Guiza están en su territorio.',
          'El río Nilo lo atraviesa de sur a norte.',
          'Su capital es El Cairo.',
          'Gran parte de su territorio es desierto.'
        ],
        falsos: [
          'Está situado en el continente asiático.',
          'Nunca ha tenido faraones mujeres.',
          'Su idioma oficial es el francés.'
        ]
      },
      {
        nombre: 'Australia', emoji: '🇦🇺',
        verdaderos: [
          'Es a la vez un país y un continente.',
          'Los canguros son un animal característico del país.',
          'Su capital es Canberra, no Sídney.',
          'Tiene la Gran Barrera de Coral, el mayor arrecife del mundo.'
        ],
        falsos: [
          'Su capital es Sídney.',
          'No tiene ningún desierto en su territorio.',
          'Limita por tierra con Nueva Zelanda.'
        ]
      },
      {
        nombre: 'Brasil', emoji: '🇧🇷',
        verdaderos: [
          'Es el país más grande de Sudamérica.',
          'Su idioma oficial es el portugués.',
          'Gran parte de la selva amazónica está en su territorio.',
          'Es el país que más veces ha ganado el Mundial de fútbol.'
        ],
        falsos: [
          'Su idioma oficial es el español.',
          'Su capital es Río de Janeiro.',
          'Nunca ha ganado un Mundial de fútbol.'
        ]
      }
    ]
  },
  comida: {
    label: 'Comida',
    topics: [
      {
        nombre: 'La pizza', emoji: '🍕',
        verdaderos: [
          'Se originó en Nápoles, Italia.',
          'La pizza margarita lleva tomate, mozzarella y albahaca.',
          'Se cocina tradicionalmente en un horno de leña.',
          'Es uno de los platos más consumidos del mundo.'
        ],
        falsos: [
          'Se inventó en Estados Unidos.',
          'Su receta original nunca lleva queso.',
          'Se sirve siempre fría.'
        ]
      },
      {
        nombre: 'El chocolate', emoji: '🍫',
        verdaderos: [
          'Se elabora a partir de las semillas del cacao.',
          'Los aztecas y los mayas ya lo consumían, aunque como bebida amarga.',
          'El chocolate negro tiene más cacao que el chocolate con leche.',
          'Puede ser tóxico para perros y otros animales.'
        ],
        falsos: [
          'Se descubrió en Europa.',
          'No contiene ningún tipo de azúcar de forma natural.',
          'Es originario de Asia.'
        ]
      },
      {
        nombre: 'El sushi', emoji: '🍣',
        verdaderos: [
          'Es de origen japonés.',
          'No siempre lleva pescado crudo: existen variedades vegetarianas.',
          'El arroz se prepara con vinagre, azúcar y sal.',
          'El wasabi que se sirve fuera de Japón suele ser un sustituto, no wasabi real.'
        ],
        falsos: [
          'Se inventó en China.',
          'Siempre se sirve caliente.',
          'Su ingrediente principal es la pasta.'
        ]
      },
      {
        nombre: 'La miel', emoji: '🍯',
        verdaderos: [
          'La producen las abejas a partir del néctar de las flores.',
          'Puede conservarse muchísimo tiempo sin estropearse si se guarda bien.',
          'No es apta para bebés menores de un año.',
          'Su sabor varía según las flores de las que proceda.'
        ],
        falsos: [
          'Es un producto sintético fabricado en laboratorio.',
          'Caduca a los pocos días de fabricarse.',
          'La producen las hormigas, no las abejas.'
        ]
      }
    ]
  }
};

var TOPIC_CATEGORY_KEYS = Object.keys(TOPIC_CATEGORIES);
var TOPIC_MEZCLA_KEY = 'mezcla';
