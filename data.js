'use strict';
/* =========================================================================
   EL DATO FALSO — temas con datos verdaderos y datos falsos
   Cada tema tiene varios datos verdaderos y varios datos falsos (pero
   creíbles). En cada ronda se reparte UN dato por jugador: los no
   mentirosos reciben un dato verdadero distinto cada uno, los mentirosos
   reciben un dato falso distinto cada uno, sin saberlo. Contenido de
   trivia general, redactado para este proyecto.
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
          'Tiene ocho brazos cubiertos de ventosas.',
          'Puede regenerar un brazo perdido.',
          'No tiene huesos en absoluto, lo que le permite colarse por espacios muy estrechos.',
          'Puede expulsar un chorro de tinta para escapar de sus depredadores.',
          'Cada uno de sus brazos tiene su propio sistema nervioso, casi independiente del cerebro.',
          'Su esperanza de vida suele ser de solo 1 o 2 años.'
        ],
        falsos: [
          'Puede vivir más de 30 años.',
          'Tiene un caparazón duro que lo protege.',
          'Es el animal marino más grande que existe.',
          'Tiene solo un corazón, igual que los mamíferos.'
        ]
      },
      {
        nombre: 'El camaleón', emoji: '🦎',
        verdaderos: [
          'Puede mover los dos ojos de forma independiente.',
          'Cambia de color también según su estado de ánimo y la temperatura, no solo para camuflarse.',
          'Tiene una lengua que puede ser más larga que su propio cuerpo.',
          'Sus patas están adaptadas para agarrarse con fuerza a las ramas.',
          'Su lengua puede alcanzar a su presa en una fracción de segundo.',
          'Tiene una cola prensil que usa como un quinto punto de apoyo.',
          'La mayoría de las especies de camaleón son originarias de Madagascar y África.',
          'Sus ojos pueden girar casi 360 grados para vigilar los alrededores sin mover la cabeza.',
          'Según la especie, puede poner huevos o parir crías vivas.'
        ],
        falsos: [
          'Es venenoso para el ser humano.',
          'Vive principalmente en el fondo del mar.',
          'No tiene párpados.',
          'Cambia de color únicamente para camuflarse, nunca por otro motivo.'
        ]
      },
      {
        nombre: 'La jirafa', emoji: '🦒',
        verdaderos: [
          'Es el animal terrestre más alto del mundo.',
          'Tiene el mismo número de vértebras en el cuello que un humano: siete.',
          'Duerme muy pocas horas al día.',
          'Su lengua puede medir hasta 50 centímetros.',
          'Su lengua es de color oscuro, casi negro-azulado, para protegerse del sol.',
          'Los machos pelean golpeando el cuello contra el de otros machos, una lucha llamada "necking".',
          'Puede llegar a medir más de 5 metros de altura.',
          'Sus manchas son únicas en cada individuo, como una huella dactilar.',
          'Puede pasar días sin beber agua, obteniendo casi toda la humedad de las plantas que come.'
        ],
        falsos: [
          'Puede saltar más alto que un canguro.',
          'Es el animal terrestre más rápido del mundo.',
          'Cambia de color según su estado de ánimo.',
          'Tiene más vértebras en el cuello que cualquier otro mamífero.'
        ]
      },
      {
        nombre: 'El colibrí', emoji: '🐦',
        verdaderos: [
          'Es la única ave capaz de volar hacia atrás.',
          'Puede batir las alas más de 50 veces por segundo.',
          'Es una de las aves más pequeñas del mundo.',
          'Su corazón puede latir más de 1000 veces por minuto durante el vuelo.',
          'Puede entrar en un estado de letargo nocturno para ahorrar energía.',
          'Se alimenta principalmente de néctar, aunque también come pequeños insectos.',
          'Necesita comer varias veces su peso en néctar cada día para mantener su metabolismo.',
          'Es capaz de volar en cualquier dirección, incluso boca abajo durante breves instantes.',
          'Solo existe de forma natural en el continente americano.'
        ],
        falsos: [
          'Migra a lomos de aves más grandes.',
          'Puede permanecer bajo el agua varios minutos.',
          'Tiene el pico más largo del mundo en proporción a su cuerpo.',
          'Puede vivir más de 40 años en libertad.'
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
          'Escribía muchas de sus notas al revés, de derecha a izquierda.',
          'También pintó "La última cena".',
          'Fue hijo ilegítimo de un notario, algo poco común para triunfar en su época.',
          'Estudió anatomía humana disecando cadáveres para mejorar sus dibujos.',
          'Murió en Francia, bajo la protección del rey Francisco I.',
          'Dejó miles de páginas de apuntes y bocetos, muchos nunca publicados en vida.'
        ],
        falsos: [
          'Nunca terminó ningún cuadro en toda su vida.',
          'Fue el primer ser humano en usar un microscopio.',
          'Ganó un premio real por sus esculturas en mármol.',
          'Fue el inventor original del papel.'
        ]
      },
      {
        nombre: 'Albert Einstein', emoji: '🧠',
        verdaderos: [
          'Desarrolló la teoría de la relatividad.',
          'Ganó el Premio Nobel de Física en 1921.',
          'Nació en Alemania.',
          'Nunca tuvo carné de conducir.',
          'Recibió el Nobel principalmente por su explicación del efecto fotoeléctrico, no por la relatividad.',
          'Trabajó varios años en una oficina de patentes en Suiza.',
          'Rechazó la oferta de ser presidente de Israel.',
          'Tenía nacionalidad suiza además de la alemana y, más tarde, la estadounidense.',
          'Su cerebro fue extraído y estudiado tras su muerte sin autorización de su familia.'
        ],
        falsos: [
          'Suspendió matemáticas en el colegio.',
          'Trabajó toda su vida como profesor universitario en Estados Unidos.',
          'Inventó la bombilla eléctrica.',
          'Ganó dos premios Nobel a lo largo de su vida.'
        ]
      },
      {
        nombre: 'Marie Curie', emoji: '⚗️',
        verdaderos: [
          'Fue la primera persona en ganar dos premios Nobel en disciplinas distintas.',
          'Descubrió los elementos polonio y radio.',
          'Nació en Polonia.',
          'Murió por los efectos de la radiación, tras años investigándola.',
          'Fue la primera mujer en dar clase en la Universidad de París (la Sorbona).',
          'Durante la Primera Guerra Mundial impulsó unidades móviles de rayos X para el frente.',
          'Su hija, Irène Joliot-Curie, también ganó un premio Nobel.',
          'Sus cuadernos de laboratorio siguen siendo radiactivos hoy en día.',
          'Se doctoró en Física en una época en la que casi ninguna mujer llegaba a la universidad.'
        ],
        falsos: [
          'Nunca salió de su país natal.',
          'Fue la primera mujer en pilotar un avión.',
          'Ganó el Premio Nobel de Literatura.',
          'Descubrió el elemento uranio.'
        ]
      },
      {
        nombre: 'Cristiano Ronaldo', emoji: '⚽',
        verdaderos: [
          'Ha jugado en el Manchester United, el Real Madrid y la Juventus.',
          'Es el máximo goleador histórico de la selección de Portugal.',
          'Nació en la isla de Madeira.',
          'Ha ganado varios Balones de Oro.',
          'Es el máximo goleador histórico de la Champions League.',
          'Ganó la Eurocopa con Portugal en 2016.',
          'Empezó su carrera profesional en el Sporting de Lisboa.',
          'Es uno de los futbolistas con más partidos internacionales disputados con su selección.',
          'Tiene una estatua suya en el aeropuerto de Madeira, que lleva su nombre.'
        ],
        falsos: [
          'Nunca ha jugado un Mundial con Portugal.',
          'Empezó su carrera profesional en un club brasileño.',
          'Es zurdo.',
          'Nunca ha jugado en la liga inglesa.'
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
          'El monte Fuji es su montaña más alta.',
          'Es uno de los países con mayor esperanza de vida del mundo.',
          'Tiene una de las redes de trenes de alta velocidad más antiguas, el Shinkansen.',
          'Es un país con mucha actividad sísmica, con terremotos frecuentes.',
          'Su población lleva décadas envejeciendo y reduciéndose.',
          'Nunca ha sido colonizado por una potencia extranjera.'
        ],
        falsos: [
          'Nunca ha sido gobernado por un emperador.',
          'Limita por tierra con China.',
          'Su bandera tiene tres franjas de colores.',
          'Su idioma oficial es el chino.'
        ]
      },
      {
        nombre: 'Egipto', emoji: '🇪🇬',
        verdaderos: [
          'Las pirámides de Guiza están en su territorio.',
          'El río Nilo lo atraviesa de sur a norte.',
          'Su capital es El Cairo.',
          'Gran parte de su territorio es desierto.',
          'El canal de Suez, una de las rutas marítimas más importantes del mundo, está en su territorio.',
          'Tuvo faraonas mujeres, como Hatshepsut y Cleopatra.',
          'Su territorio se extiende por dos continentes, África y Asia, por la península del Sinaí.',
          'La escritura jeroglífica egipcia se descifró gracias a la piedra de Rosetta.',
          'Es uno de los países más poblados de África.'
        ],
        falsos: [
          'Está situado en el continente asiático.',
          'Nunca ha tenido faraones mujeres.',
          'Su idioma oficial es el francés.',
          'Las pirámides de Guiza las construyeron los romanos.'
        ]
      },
      {
        nombre: 'Australia', emoji: '🇦🇺',
        verdaderos: [
          'Es a la vez un país y un continente.',
          'Los canguros son un animal característico del país.',
          'Su capital es Canberra, no Sídney.',
          'Tiene la Gran Barrera de Coral, el mayor arrecife del mundo.',
          'Gran parte de su fauna, como los canguros y los koalas, no se encuentra de forma natural en ningún otro continente.',
          'Fue colonia penitenciaria británica antes de convertirse en un país independiente.',
          'Su territorio incluye un desierto enorme conocido como el Outback.',
          'Es uno de los países con menor densidad de población del mundo.',
          'Su idioma oficial de facto es el inglés.'
        ],
        falsos: [
          'Su capital es Sídney.',
          'No tiene ningún desierto en su territorio.',
          'Limita por tierra con Nueva Zelanda.',
          'Nunca ha tenido colonos europeos antes del siglo XX.'
        ]
      },
      {
        nombre: 'Brasil', emoji: '🇧🇷',
        verdaderos: [
          'Es el país más grande de Sudamérica.',
          'Su idioma oficial es el portugués.',
          'Gran parte de la selva amazónica está en su territorio.',
          'Es el país que más veces ha ganado el Mundial de fútbol.',
          'Su capital no es Río de Janeiro ni São Paulo, sino Brasilia.',
          'Es el único país de Sudamérica cuyo idioma oficial no es el español.',
          'Tiene frontera con casi todos los países de Sudamérica, salvo Chile y Ecuador.',
          'El Carnaval de Río es una de las fiestas populares más conocidas del mundo.',
          'Es uno de los mayores productores de café del planeta.'
        ],
        falsos: [
          'Su idioma oficial es el español.',
          'Su capital es Río de Janeiro.',
          'Nunca ha ganado un Mundial de fútbol.',
          'Limita con todos los países de Sudamérica sin excepción.'
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
          'Es uno de los platos más consumidos del mundo.',
          'La pizza margarita se llama así en honor a una reina de Italia.',
          'El arte del "pizzaiuolo" napolitano fue declarado por la UNESCO Patrimonio Cultural Inmaterial de la Humanidad.',
          'La masa tradicional solo lleva harina, agua, sal y levadura.',
          'En Estados Unidos existen estilos muy distintos al napolitano, como la pizza de Chicago o de Nueva York.',
          'El día internacional de la pizza se celebra cada 9 de febrero.'
        ],
        falsos: [
          'Se inventó en Estados Unidos.',
          'Su receta original nunca lleva queso.',
          'Se sirve siempre fría.',
          'La pizza hawaiana, con piña, se inventó en Hawái.'
        ]
      },
      {
        nombre: 'El chocolate', emoji: '🍫',
        verdaderos: [
          'Se elabora a partir de las semillas del cacao.',
          'Los aztecas y los mayas ya lo consumían, aunque como bebida amarga.',
          'El chocolate negro tiene más cacao que el chocolate con leche.',
          'Puede ser tóxico para perros y otros animales.',
          'Es originario de América Central y del Sur.',
          'El chocolate blanco no contiene sólidos de cacao, solo manteca de cacao.',
          'Los aztecas llegaron a usar los granos de cacao como una forma de moneda.',
          'Suiza y Bélgica son famosos históricamente por su producción de chocolate de calidad.',
          'Puede derretirse a temperatura corporal, por eso se deshace en la boca.'
        ],
        falsos: [
          'Se descubrió en Europa.',
          'No contiene ningún tipo de azúcar de forma natural.',
          'Es originario de Asia.',
          'El chocolate blanco tiene más cacao que el negro.'
        ]
      },
      {
        nombre: 'El sushi', emoji: '🍣',
        verdaderos: [
          'Es de origen japonés.',
          'No siempre lleva pescado crudo: existen variedades vegetarianas.',
          'El arroz se prepara con vinagre, azúcar y sal.',
          'El wasabi que se sirve fuera de Japón suele ser un sustituto, no wasabi real.',
          'La palabra "sushi" se refiere en realidad al arroz avinagrado, no al pescado.',
          'El nigiri es un tipo de sushi hecho con una bola de arroz y una lámina de pescado encima.',
          'El maki es el sushi enrollado en una lámina de alga nori.',
          'Antiguamente, el pescado se fermentaba con arroz como método de conservación, origen del sushi actual.',
          'Comer sushi con las manos también se considera correcto según la etiqueta tradicional japonesa.'
        ],
        falsos: [
          'Se inventó en China.',
          'Siempre se sirve caliente.',
          'Su ingrediente principal es la pasta.',
          'El wasabi real y el sustituto verde que se sirve normalmente son exactamente la misma planta.'
        ]
      },
      {
        nombre: 'La miel', emoji: '🍯',
        verdaderos: [
          'La producen las abejas a partir del néctar de las flores.',
          'Puede conservarse muchísimo tiempo sin estropearse si se guarda bien.',
          'No es apta para bebés menores de un año.',
          'Su sabor varía según las flores de las que proceda.',
          'Se han encontrado tarros de miel de miles de años en tumbas egipcias todavía en buen estado.',
          'Es más dulce que el azúcar común a igual cantidad.',
          'Cristaliza con el tiempo, pero eso no significa que esté en mal estado.',
          'Las abejas la producen como reserva de alimento para el resto de la colmena.',
          'Puede clasificarse por su origen floral, como la miel de romero o la de azahar.'
        ],
        falsos: [
          'Es un producto sintético fabricado en laboratorio.',
          'Caduca a los pocos días de fabricarse.',
          'La producen las hormigas, no las abejas.',
          'Todas las especies de abejas del mundo producen miel.'
        ]
      }
    ]
  }
};

var TOPIC_CATEGORY_KEYS = Object.keys(TOPIC_CATEGORIES);
var TOPIC_MEZCLA_KEY = 'mezcla';
