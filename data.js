'use strict';

/* =========================================================================
   EL DATO FALSO — temas con datos verdaderos y datos falsos
   Cada tema tiene al menos 9 datos verdaderos y 4 falsos (pero creíbles),
   lo justo para 10 jugadores con hasta 4 mentirosos. En cada ronda se
   reparte UN dato por jugador: los no mentirosos reciben uno verdadero
   distinto cada uno y los mentirosos uno falso. Contenido de trivia
   general redactado para este proyecto.
   ========================================================================= */

const TOPIC_CATEGORIES = {
  animales: {
    label: 'Animales', emoji: '🐾',
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
      },
      {
        nombre: 'El pingüino', emoji: '🐧',
        verdaderos: [
          'No puede volar, pero es un excelente nadador.',
          'Casi todas las especies viven en el hemisferio sur.',
          'En el pingüino emperador es el macho quien incuba el huevo sobre sus patas.',
          'Sus alas se han transformado en aletas.',
          'Su plumaje blanco y negro le ayuda a camuflarse en el agua.',
          'El pingüino emperador es la especie más grande.',
          'Puede beber agua salada gracias a una glándula que elimina la sal.',
          'Algunas especies viven en climas templados, como Sudáfrica o las Galápagos.',
          'Se alimenta sobre todo de peces, krill y calamares.'
        ],
        falsos: [
          'Vive tanto en el Polo Norte como en el Polo Sur.',
          'Es un mamífero marino.',
          'Pone los huevos bajo el agua.',
          'Puede volar distancias cortas para escapar de las focas.'
        ]
      },
      {
        nombre: 'El elefante', emoji: '🐘',
        verdaderos: [
          'Es el animal terrestre más grande del mundo.',
          'Su trompa es una fusión de la nariz y el labio superior.',
          'Sus colmillos son dientes incisivos muy alargados.',
          'Su gestación dura casi dos años.',
          'Usa sus grandes orejas para refrescarse.',
          'Se comunica con sonidos tan graves que los humanos no podemos oírlos.',
          'Puede comer más de 100 kilos de vegetación al día.',
          'Existen elefantes africanos y elefantes asiáticos.',
          'Las manadas suelen estar lideradas por una hembra mayor, la matriarca.'
        ],
        falsos: [
          'Puede saltar despegando las cuatro patas del suelo.',
          'Su esperanza de vida en libertad es de unos 15 años.',
          'Duerme más de 12 horas al día, siempre tumbado.',
          'Solo existe una especie de elefante en el mundo.'
        ]
      }
    ]
  },
  famosos: {
    label: 'Famosos', emoji: '⭐',
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
      },
      {
        nombre: 'Frida Kahlo', emoji: '🎨',
        verdaderos: [
          'Fue una pintora mexicana.',
          'Es famosa sobre todo por sus autorretratos.',
          'Sufrió un grave accidente de autobús en su juventud.',
          'Estuvo casada con el muralista Diego Rivera.',
          'Pintó muchas obras desde la cama, con un caballete adaptado.',
          'Su casa en Coyoacán, la Casa Azul, es hoy un museo.',
          'Sus cejas unidas se convirtieron en un símbolo reconocible en todo el mundo.',
          'Tuvo poliomielitis de niña, lo que le afectó a una pierna.',
          'Su obra mezcla elementos de la cultura popular mexicana.'
        ],
        falsos: [
          'Nació en España y emigró a México de mayor.',
          'Era sobre todo escultora.',
          'Vivió más de 90 años.',
          'Nunca llegó a exponer su obra mientras vivía.'
        ]
      },
      {
        nombre: 'Miguel de Cervantes', emoji: '✒️',
        verdaderos: [
          'Escribió Don Quijote de la Mancha.',
          'Perdió la movilidad de la mano izquierda en la batalla de Lepanto.',
          'Le apodaron «el manco de Lepanto».',
          'Estuvo cautivo en Argel durante unos cinco años.',
          'Trabajó como recaudador de impuestos.',
          'Llegó a pasar una temporada en la cárcel.',
          'El Día del Libro, el 23 de abril, recuerda la fecha de su muerte y la de Shakespeare.',
          'El premio más importante de las letras en español lleva su nombre.',
          'También escribió las Novelas ejemplares.'
        ],
        falsos: [
          'Era portugués.',
          'Perdió la mano derecha en una batalla.',
          'Escribió La Celestina.',
          'Se hizo muy rico gracias al éxito del Quijote.'
        ]
      }
    ]
  },
  paises: {
    label: 'Países', emoji: '🌍',
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
      },
      {
        nombre: 'Italia', emoji: '🇮🇹',
        verdaderos: [
          'Su capital es Roma.',
          'Tiene forma de bota.',
          'Dentro de su territorio hay dos estados independientes: el Vaticano y San Marino.',
          'Tiene volcanes activos como el Etna y el Vesubio.',
          'Venecia está construida sobre más de un centenar de islas.',
          'La pizza moderna nació en Nápoles.',
          'Es uno de los países con más lugares Patrimonio de la Humanidad.',
          'Su famosa torre inclinada está en Pisa.',
          'Sus mayores islas son Sicilia y Cerdeña.'
        ],
        falsos: [
          'Su moneda oficial es la lira.',
          'Es una monarquía con rey.',
          'Su famosa torre inclinada está en Florencia.',
          'Nunca ha ganado un Mundial de fútbol.'
        ]
      },
      {
        nombre: 'México', emoji: '🇲🇽',
        verdaderos: [
          'Su capital es Ciudad de México.',
          'Es el país con más hispanohablantes del mundo.',
          'El cacao y el maíz ya se cultivaban allí antes de la llegada de los europeos.',
          'Celebra el Día de Muertos a principios de noviembre.',
          'Tiene pirámides como las de Teotihuacán y Chichén Itzá.',
          'Su bandera muestra un águila devorando una serpiente.',
          'Tiene frontera con Estados Unidos, Guatemala y Belice.',
          'El tequila se elabora a partir del agave.',
          'Su capital se construyó sobre un antiguo lago.'
        ],
        falsos: [
          'Su capital es Guadalajara.',
          'Su moneda es el euro.',
          'El tequila se elabora con cebada.',
          'No tiene costa en el océano Pacífico.'
        ]
      }
    ]
  },
  comida: {
    label: 'Comida', emoji: '🍕',
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
      },
      {
        nombre: 'El tomate', emoji: '🍅',
        verdaderos: [
          'Botánicamente es un fruto.',
          'Es originario de América.',
          'Llegó a Europa en el siglo XVI, tras los viajes a América.',
          'En Buñol se celebra una fiesta en la que la gente se lanza tomates.',
          'Es un ingrediente básico del gazpacho.',
          'Existen tomates amarillos, verdes y casi negros.',
          'Durante un tiempo en Europa se cultivó como planta ornamental, por desconfianza.',
          'Es de la misma familia que la patata y la berenjena.',
          'Su color rojo se debe en gran parte al licopeno.'
        ],
        falsos: [
          'Es originario de Italia.',
          'Crece bajo tierra, como la patata.',
          'La Tomatina se celebra en Sevilla.',
          'Es una verdura de hoja, como la lechuga.'
        ]
      },
      {
        nombre: 'El café', emoji: '☕',
        verdaderos: [
          'Se obtiene de las semillas tostadas del cafeto.',
          'Contiene cafeína, una sustancia estimulante.',
          'Brasil es el mayor productor del mundo.',
          'Sus semillas crecen dentro de un fruto rojo llamado cereza del café.',
          'Una leyenda cuenta que lo descubrió un pastor etíope al ver a sus cabras muy activas.',
          'Las dos variedades más cultivadas son la arábica y la robusta.',
          'El espresso se prepara haciendo pasar agua caliente a presión.',
          'El café descafeinado conserva una pequeña cantidad de cafeína.',
          'Las cafeterías se popularizaron en Europa a partir del siglo XVII.'
        ],
        falsos: [
          'Se obtiene de las hojas secas de una planta.',
          'El mayor productor del mundo es España.',
          'El descafeinado no tiene absolutamente nada de cafeína.',
          'Sus granos ya son negros cuando se recogen de la planta.'
        ]
      }
    ]
  },
  espacio: {
    label: 'Espacio', emoji: '🚀',
    topics: [
      {
        nombre: 'La Luna', emoji: '🌙',
        verdaderos: [
          'Es el único satélite natural de la Tierra.',
          'Siempre nos muestra la misma cara.',
          'Se aleja de la Tierra unos centímetros cada año.',
          'Doce personas han caminado sobre ella.',
          'El primer paseo lunar fue en 1969, con la misión Apolo 11.',
          'Su gravedad es más o menos una sexta parte de la de la Tierra.',
          'Influye en las mareas de los océanos.',
          'No tiene luz propia: refleja la luz del Sol.',
          'Las huellas de los astronautas siguen allí porque no hay viento que las borre.'
        ],
        falsos: [
          'Tiene una atmósfera respirable.',
          'Es más grande que el planeta Mercurio.',
          'Se acerca a la Tierra un poco cada año.',
          'Su cara oculta nunca recibe la luz del Sol.'
        ]
      },
      {
        nombre: 'El Sol', emoji: '☀️',
        verdaderos: [
          'Es una estrella.',
          'Su luz tarda unos 8 minutos en llegar a la Tierra.',
          'Contiene más del 99 % de la masa del sistema solar.',
          'Está formado sobre todo por hidrógeno y helio.',
          'En su interior cabrían más de un millón de Tierras.',
          'Tiene manchas solares, zonas algo más frías que su entorno.',
          'Su energía se produce por fusión nuclear.',
          'Mirarlo directamente puede dañar los ojos.',
          'Tiene unos 4.600 millones de años.'
        ],
        falsos: [
          'Es la estrella más grande de nuestra galaxia.',
          'Gira alrededor de la Tierra.',
          'Su energía procede de quemar carbón en su interior.',
          'Su luz llega a la Tierra de forma instantánea.'
        ]
      },
      {
        nombre: 'Marte', emoji: '🔴',
        verdaderos: [
          'Se le conoce como el planeta rojo.',
          'Su color se debe al óxido de hierro de su superficie.',
          'Tiene dos lunas: Fobos y Deimos.',
          'Allí está el Monte Olimpo, uno de los mayores volcanes del sistema solar.',
          'Un día en Marte dura algo más que un día en la Tierra.',
          'Tiene casquetes polares de hielo.',
          'Varios robots exploradores han recorrido su superficie.',
          'Su gravedad es menor que la de la Tierra.',
          'Sufre tormentas de polvo que pueden cubrir todo el planeta.'
        ],
        falsos: [
          'Tiene anillos como Saturno.',
          'Es el planeta más cercano al Sol.',
          'Su atmósfera es rica en oxígeno.',
          'Ya han viajado astronautas hasta su superficie.'
        ]
      },
      {
        nombre: 'La Estación Espacial Internacional', emoji: '🛰️',
        verdaderos: [
          'Orbita la Tierra a unos 400 kilómetros de altura.',
          'Da una vuelta a la Tierra en unos 90 minutos.',
          'Sus tripulantes ven unos 16 amaneceres al día.',
          'Está habitada de forma continua desde el año 2000.',
          'Se puede ver desde la Tierra a simple vista.',
          'Se construyó por módulos ensamblados en el espacio.',
          'En ella colaboran varias agencias espaciales, como la estadounidense, la rusa y la europea.',
          'Sus astronautas hacen ejercicio a diario para no perder masa muscular.',
          'Ocupa más o menos lo mismo que un campo de fútbol.'
        ],
        falsos: [
          'Está construida sobre la superficie de la Luna.',
          'Tarda un mes en dar la vuelta a la Tierra.',
          'Solo pueden viajar a ella astronautas estadounidenses.',
          'En su interior hay gravedad artificial, igual que en la Tierra.'
        ]
      }
    ]
  },
  cuerpo: {
    label: 'Cuerpo humano', emoji: '🫀',
    topics: [
      {
        nombre: 'El corazón', emoji: '❤️',
        verdaderos: [
          'Late unas 100.000 veces al día.',
          'Tiene cuatro cavidades: dos aurículas y dos ventrículos.',
          'Tiene más o menos el tamaño de un puño.',
          'Bombea la sangre a todo el cuerpo.',
          'Es un músculo.',
          'Tiene su propio sistema eléctrico, que le hace latir.',
          'Late más rápido cuando hacemos ejercicio.',
          'Está en el pecho, entre los dos pulmones.',
          'El corazón de un bebé late más rápido que el de un adulto.'
        ],
        falsos: [
          'Está situado en el lado derecho del pecho.',
          'Tiene seis cavidades.',
          'Deja de latir unos segundos cada vez que estornudamos.',
          'Pesa alrededor de cinco kilos.'
        ]
      },
      {
        nombre: 'El cerebro', emoji: '🧠',
        verdaderos: [
          'Pesa alrededor de un kilo y 300 gramos en un adulto.',
          'Tiene unos 86.000 millones de neuronas.',
          'Consume aproximadamente el 20 % de la energía del cuerpo.',
          'Está protegido por el cráneo.',
          'Se divide en dos hemisferios.',
          'El hemisferio izquierdo controla sobre todo el lado derecho del cuerpo.',
          'Su tejido no tiene receptores de dolor.',
          'Está formado en buena parte por agua.',
          'Sigue muy activo mientras dormimos.'
        ],
        falsos: [
          'Solo usamos el 10 % del cerebro.',
          'Es el órgano más grande del cuerpo.',
          'Se apaga por completo mientras dormimos.',
          'Está formado principalmente por músculo.'
        ]
      },
      {
        nombre: 'Los huesos', emoji: '🦴',
        verdaderos: [
          'Un adulto tiene 206 huesos.',
          'Un bebé nace con más huesos que un adulto.',
          'El hueso más largo del cuerpo es el fémur.',
          'El hueso más pequeño del cuerpo está en el oído.',
          'Más de la mitad de los huesos están en las manos y los pies.',
          'Los huesos son tejido vivo y se regeneran.',
          'Dentro de muchos huesos está la médula, que fabrica células de la sangre.',
          'El calcio es fundamental para mantenerlos fuertes.',
          'Cada mano tiene 27 huesos.'
        ],
        falsos: [
          'Un adulto tiene más de 500 huesos.',
          'El hueso más largo del cuerpo está en el brazo.',
          'Los huesos son tejido muerto, como el pelo.',
          'El cráneo está formado por un único hueso.'
        ]
      },
      {
        nombre: 'La piel', emoji: '🖐️',
        verdaderos: [
          'Es el órgano más grande del cuerpo.',
          'Se renueva constantemente: las células de la superficie se van desprendiendo.',
          'Ayuda a regular la temperatura gracias al sudor.',
          'La melanina es la que le da color.',
          'Tiene receptores que detectan el tacto, el calor y el dolor.',
          'Las huellas dactilares son únicas en cada persona.',
          'Las pecas son pequeñas acumulaciones de melanina.',
          'La piel más fina del cuerpo está en los párpados.',
          'Las plantas de los pies tienen una de las pieles más gruesas del cuerpo.'
        ],
        falsos: [
          'Los gemelos idénticos tienen las mismas huellas dactilares.',
          'Es el único órgano que nunca se renueva.',
          'Su color depende de la cantidad de sangre que tengamos.',
          'La piel más gruesa del cuerpo está en los párpados.'
        ]
      }
    ]
  },
  historia: {
    label: 'Historia', emoji: '🏛️',
    topics: [
      {
        nombre: 'La antigua Roma', emoji: '🏛️',
        verdaderos: [
          'Construyó calzadas que unían todo el imperio.',
          'Usaba acueductos para llevar agua a las ciudades.',
          'En el Coliseo se celebraban luchas de gladiadores.',
          'Su lengua, el latín, dio origen al español, el italiano y el francés.',
          'Hispania formaba parte del Imperio romano.',
          'El acueducto de Segovia es una obra romana.',
          'Julio César fue asesinado en el año 44 antes de Cristo.',
          'Los meses de julio y agosto deben su nombre a Julio César y a Augusto.',
          'Su primer emperador fue Augusto.'
        ],
        falsos: [
          'Su primer emperador fue Julio César.',
          'Inventó la imprenta.',
          'El Coliseo se construyó en Atenas.',
          'Nunca llegó a la península ibérica.'
        ]
      },
      {
        nombre: 'Los vikingos', emoji: '⛵',
        verdaderos: [
          'Procedían de Escandinavia.',
          'Eran grandes navegantes.',
          'Llegaron a América del Norte siglos antes que Colón.',
          'Sus barcos alargados se conocen como drakkar.',
          'Muchos eran también comerciantes y agricultores.',
          'Escribían con un alfabeto de runas.',
          'La palabra inglesa Thursday (jueves) viene del dios nórdico Thor.',
          'Llegaron a atacar costas de la península ibérica.',
          'Colonizaron Islandia.'
        ],
        falsos: [
          'Llevaban cascos con cuernos en las batallas.',
          'Procedían del sur de Italia.',
          'Nunca salieron de Escandinavia.',
          'Sus barcos funcionaban con motores de vapor.'
        ]
      },
      {
        nombre: 'El Titanic', emoji: '🚢',
        verdaderos: [
          'Se hundió en 1912, en su viaje inaugural.',
          'Chocó contra un iceberg.',
          'Viajaba de Southampton a Nueva York.',
          'No llevaba botes salvavidas suficientes para todos.',
          'Murieron más de 1.500 personas.',
          'Sus restos se encontraron en 1985.',
          'Se hundió en el océano Atlántico Norte.',
          'En su época era uno de los barcos más grandes del mundo.',
          'Su historia inspiró una película muy taquillera en 1997.'
        ],
        falsos: [
          'Se hundió en el océano Pacífico.',
          'Se hundió tras chocar contra otro barco.',
          'Todos los pasajeros consiguieron salvarse.',
          'Sus restos nunca se han encontrado.'
        ]
      }
    ]
  },
  ciencia: {
    label: 'Ciencia y naturaleza', emoji: '🔬',
    topics: [
      {
        nombre: 'Los dinosaurios', emoji: '🦖',
        verdaderos: [
          'Se extinguieron hace unos 66 millones de años.',
          'La teoría más aceptada culpa de su extinción al impacto de un asteroide.',
          'Las aves descienden de los dinosaurios.',
          'Algunos tenían plumas.',
          'Su nombre significa «lagarto terrible».',
          'Ponían huevos.',
          'Los había herbívoros y carnívoros.',
          'El tiranosaurio tenía unos brazos muy cortos.',
          'Los conocemos gracias a sus fósiles.'
        ],
        falsos: [
          'Convivieron con los primeros seres humanos.',
          'Todos eran enormes, más grandes que un autobús.',
          'Los pterodáctilos eran dinosaurios voladores.',
          'Se extinguieron hace unos 10.000 años.'
        ]
      },
      {
        nombre: 'El agua', emoji: '💧',
        verdaderos: [
          'Su fórmula química es H₂O.',
          'Al nivel del mar hierve a 100 °C.',
          'Al congelarse aumenta de volumen.',
          'El hielo flota sobre el agua líquida.',
          'Cubre alrededor del 70 % de la superficie de la Tierra.',
          'La mayor parte del agua del planeta es salada.',
          'Más de la mitad del cuerpo de un adulto es agua.',
          'Puede estar en estado sólido, líquido y gaseoso.',
          'El agua pura no tiene olor ni sabor.'
        ],
        falsos: [
          'Hierve a la misma temperatura en lo alto de una montaña que en la playa.',
          'El hielo se hunde en el agua líquida.',
          'La mayor parte del agua del planeta es dulce.',
          'Su fórmula química es CO₂.'
        ]
      },
      {
        nombre: 'Los volcanes', emoji: '🌋',
        verdaderos: [
          'La roca fundida se llama magma bajo tierra y lava cuando sale.',
          'También hay volcanes bajo el mar.',
          'Las islas Canarias son de origen volcánico.',
          'Hay volcanes en otros planetas del sistema solar.',
          'La ceniza volcánica puede obligar a cancelar vuelos.',
          'El Teide, un volcán, es el pico más alto de España.',
          'Pompeya quedó sepultada por una erupción del Vesubio.',
          'Muchos se concentran en el llamado Cinturón de Fuego del Pacífico.',
          'Los suelos volcánicos suelen ser muy fértiles.'
        ],
        falsos: [
          'Todos los volcanes del mundo están ya extinguidos.',
          'La lava es agua a muy alta temperatura.',
          'En España no hay ningún volcán.',
          'Pompeya fue destruida por un terremoto.'
        ]
      },
      {
        nombre: 'El arcoíris', emoji: '🌈',
        verdaderos: [
          'Se forma cuando la luz del Sol atraviesa gotas de agua.',
          'Para verlo hay que tener el Sol a la espalda.',
          'Tradicionalmente se dice que tiene siete colores.',
          'El rojo aparece en la parte exterior del arco.',
          'A veces aparece un arcoíris doble, con los colores invertidos en el segundo.',
          'Desde un avión se puede ver como un círculo completo.',
          'Isaac Newton estudió cómo la luz blanca se descompone en colores.',
          'También puede formarse con la luz de la Luna.',
          'Dos personas en sitios distintos no ven exactamente el mismo arcoíris.'
        ],
        falsos: [
          'Si caminas lo suficiente puedes llegar a su final.',
          'Solo aparece cuando nieva.',
          'Es el reflejo del mar sobre las nubes.',
          'El violeta aparece en la parte exterior del arco.'
        ]
      }
    ]
  },
  deportes: {
    label: 'Deportes y juegos', emoji: '⚽',
    topics: [
      {
        nombre: 'El fútbol', emoji: '⚽',
        verdaderos: [
          'Cada equipo juega con once jugadores en el campo.',
          'Un partido dura 90 minutos más el tiempo añadido.',
          'El portero puede tocar el balón con las manos dentro de su área.',
          'El Mundial se celebra cada cuatro años.',
          'España ganó el Mundial en 2010.',
          'Sus reglas modernas se fijaron en Inglaterra en el siglo XIX.',
          'Brasil es la selección con más Mundiales ganados.',
          'Una tarjeta roja supone la expulsión del jugador.',
          'El fuera de juego es una de sus normas más discutidas.'
        ],
        falsos: [
          'Cada equipo juega con nueve jugadores en el campo.',
          'El Mundial se celebra cada dos años.',
          'España ha ganado tres Mundiales.',
          'Un partido dura 60 minutos.'
        ]
      },
      {
        nombre: 'Los Juegos Olímpicos', emoji: '🏅',
        verdaderos: [
          'Los antiguos se celebraban en Olimpia, en Grecia.',
          'Los modernos comenzaron en Atenas en 1896.',
          'Sus cinco anillos representan la unión de los continentes.',
          'La llama olímpica se enciende en Olimpia.',
          'Barcelona los organizó en 1992.',
          'Hay Juegos de verano y Juegos de invierno.',
          'Los ganadores reciben medallas de oro, plata y bronce.',
          'Las medallas de oro actuales son, en su mayor parte, de plata bañada en oro.',
          'Se celebran cada cuatro años.'
        ],
        falsos: [
          'Los modernos comenzaron en París en 1950.',
          'Madrid ha organizado unos Juegos de verano.',
          'Las medallas de oro son de oro macizo.',
          'Los anillos olímpicos son siete.'
        ]
      },
      {
        nombre: 'El ajedrez', emoji: '♟️',
        verdaderos: [
          'Se juega en un tablero de 64 casillas.',
          'Cada jugador empieza con 16 piezas.',
          'Las blancas siempre mueven primero.',
          'El caballo es la única pieza que puede saltar por encima de otras.',
          'La partida termina con el jaque mate.',
          'Un peón que llega al final del tablero puede convertirse en otra pieza.',
          'Se cree que tiene su origen en la India.',
          'En el enroque se mueven dos piezas en la misma jugada.',
          'La dama es la pieza más poderosa.'
        ],
        falsos: [
          'Las negras siempre mueven primero.',
          'Cada jugador empieza con 20 piezas.',
          'El alfil puede saltar por encima de otras piezas.',
          'El rey puede moverse dos casillas en cualquier dirección.'
        ]
      }
    ]
  },
  inventos: {
    label: 'Inventos', emoji: '💡',
    topics: [
      {
        nombre: 'El teléfono móvil', emoji: '📱',
        verdaderos: [
          'La primera llamada desde un móvil se hizo en 1973.',
          'Los primeros móviles pesaban alrededor de un kilo.',
          'El primer SMS se envió en 1992.',
          'Funcionan conectándose a antenas repartidas por el territorio.',
          'Las pantallas táctiles se popularizaron en la década de 2000.',
          'Hoy hay más líneas móviles que personas en el mundo.',
          'La mayoría usa baterías de iones de litio.',
          'Son más potentes que los ordenadores que llevaron al ser humano a la Luna.',
          'Su GPS calcula la posición con señales de satélites.'
        ],
        falsos: [
          'El primer SMS se envió en 1960.',
          'Se comunican directamente entre ellos, sin necesidad de antenas.',
          'Los primeros móviles cabían en un bolsillo.',
          'Los primeros móviles ya tenían cámara de fotos.'
        ]
      },
      {
        nombre: 'La imprenta', emoji: '📜',
        verdaderos: [
          'Gutenberg desarrolló la imprenta de tipos móviles hacia 1450.',
          'Uno de los primeros libros que imprimió fue una Biblia.',
          'Antes de ella, los libros se copiaban a mano.',
          'En China ya se usaban técnicas de impresión siglos antes.',
          'Abarató muchísimo los libros.',
          'Ayudó a difundir ideas por toda Europa.',
          'Los tipos móviles eran letras sueltas de metal.',
          'Gutenberg era alemán.',
          'Facilitó la aparición de los periódicos.'
        ],
        falsos: [
          'La inventó Leonardo da Vinci.',
          'Se inventó en el siglo XX.',
          'Gutenberg era español.',
          'Funcionaba con electricidad desde el principio.'
        ]
      },
      {
        nombre: 'Internet', emoji: '🌐',
        verdaderos: [
          'Su origen está en ARPANET, una red militar y universitaria de Estados Unidos.',
          'La World Wide Web la creó Tim Berners-Lee.',
          'La Web nació en el CERN, en Suiza.',
          'El correo electrónico es anterior a la Web.',
          'Gran parte de los datos viajan por cables submarinos.',
          'El símbolo @ se usa en las direcciones de correo electrónico.',
          'Los vídeos ocupan una gran parte del tráfico de internet.',
          'El wifi permite conectarse sin cables.',
          'Cada dispositivo conectado tiene una dirección IP.'
        ],
        falsos: [
          'La World Wide Web la creó Bill Gates.',
          'Internet funciona sobre todo con satélites, sin cables.',
          'Internet y la Web se crearon el mismo día.',
          'El correo electrónico se inventó después de las redes sociales.'
        ]
      }
    ]
  }
};

const TOPIC_CATEGORY_KEYS = Object.keys(TOPIC_CATEGORIES);
