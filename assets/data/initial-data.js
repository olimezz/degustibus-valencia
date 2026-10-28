/**
 * deGustibus - Dati Iniziali Ufficiali del Ristorante
 * Utilizzati per:
 * 1. Popolamento automatico iniziale di Firebase Firestore
 * 2. Fallback offline se il database non è connesso
 */
window.INITIAL_RESTAURANT_DATA = {
  // Impostazioni generali, contatti, orari e banner
  settings: {
    restaurantName: "deGustibus",
    tagline: "Ristorante y Bar Italiano · València",
    address: "Carrer de Borriana, 25, L'Eixample, 46005 València (España)",
    phone: "+34 629 09 92 95",
    whatsapp: "34629099295",
    instagram: "degustibus.valencia",
    hoursText: "Mar - Sáb: 13:00 - 16:00 (Solo Reserva) y 19:30 - 23:30 · Dom - Lun: Cerrado",
    lunchNote: "El servicio de mediodía está disponible EXCLUSIVAMENTE con reserva previa.",
    banner: {
      active: false,
      text: "¡Bienvenidos a deGustibus! Esta semana recomendamos la auténtica Carbonara 'Original' y nuestra selección de pizzas 72h.",
      type: "info" // 'info', 'warning', 'promo'
    }
  },

  // Categorie ufficiali
  categories: [
    { id: "entrantes", name: "Entrantes y Tablas", icon: "fa-bread-slice", order: 1 },
    { id: "primeros", name: "Primeros Platos", icon: "fa-plate-wheat", order: 2 },
    { id: "infantil", name: "Menú Infantil", icon: "fa-child-reaching", order: 3 },
    { id: "pizza", name: "Pizza", icon: "fa-pizza-slice", order: 4 },
    { id: "postres", name: "Postres Caseros", icon: "fa-cake-candles", order: 5 },
    { id: "cafeteria", name: "Cafetería", icon: "fa-mug-hot", order: 6 },
    { id: "licores", name: "Licores y Cócteles", icon: "fa-martini-glass", order: 7 },
    { id: "bebidas", name: "Vinos y Bebidas", icon: "fa-wine-bottle", order: 8 }
  ],

  // Elenco dei 61 piatti attualmente a menu
  dishes: [
    // --- 1. ENTRANTES & TABLAS ---
    {
      id: "racion-pan",
      name: "Ración de Pan",
      category: "entrantes",
      subcategory: "entrantes",
      price: 2.00,
      description: "Pan fresco artesanal servido a la mesa.",
      badge: "",
      available: true
    },
    {
      id: "entrante-chef",
      name: "Entrante dello Chef",
      category: "entrantes",
      subcategory: "entrantes",
      price: 13.00,
      description: "Creación y selección especial de la casa según los mejores ingredientes frescos del día.",
      badge: "Especial",
      available: true
    },
    {
      id: "ensalada-caprese",
      name: "Ensalada Caprese",
      category: "entrantes",
      subcategory: "entrantes",
      price: 12.00,
      description: "Tomate fresco selecto, mozzarella italiana fiordilatte, hojas de albahaca fresca y aceite de oliva virgen extra.",
      badge: "",
      available: true
    },
    {
      id: "burrata",
      name: "Burrata",
      category: "entrantes",
      subcategory: "entrantes",
      price: 12.50,
      description: "Auténtica burrata fresca italiana con corazón cremoso stracciatella, aliñada con aceite de oliva virgen extra.",
      badge: "Top Ventas",
      available: true
    },
    {
      id: "ensalada-chef",
      name: "Ensalada del Chef",
      category: "entrantes",
      subcategory: "entrantes",
      price: 11.00,
      description: "Combinación gourmet de hojas frescas seleccionadas con aderezo exclusivo del chef.",
      badge: "",
      available: true
    },
    {
      id: "carpaccio-calabacin",
      name: "Carpaccio de Calabacín",
      category: "entrantes",
      subcategory: "entrantes",
      price: 10.00,
      description: "Finas láminas de calabacín fresco marinado con lascas de queso parmesano y aceite de oliva virgen extra.",
      badge: "Vegetariano",
      available: true
    },
    {
      id: "provolone-fundido",
      name: "Provolone Fundido",
      category: "entrantes",
      subcategory: "entrantes",
      price: 9.50,
      description: "Queso provolone italiano fundido al horno con orégano y especias mediterráneas.",
      badge: "",
      available: true
    },
    {
      id: "tabla-mix",
      name: "Tabla Mix",
      category: "entrantes",
      subcategory: "tablas",
      price: 16.50,
      description: "Surtido selecto combinado de embutidos tradicionales y quesos regionales italianos.",
      badge: "",
      available: true
    },
    {
      id: "tabla-quesos",
      name: "Quesos Italianos",
      category: "entrantes",
      subcategory: "tablas",
      price: 16.00,
      description: "Variedad selecta de quesos típicos de denominación italiana con sus acompañamientos.",
      badge: "",
      available: true
    },
    {
      id: "tabla-fiambres",
      name: "Fiambres Italianos",
      category: "entrantes",
      subcategory: "tablas",
      price: 16.00,
      description: "Selección de los mejores embutidos y fiambres artesanos importados de Italia.",
      badge: "",
      available: true
    },

    // --- 2. PRIMEROS PLATOS ---
    {
      id: "carbonara-trufada",
      name: "Spaghetti alla Carbonara Trufada",
      category: "primeros",
      subcategory: "pasta",
      price: 14.50,
      description: "Spaghetti con auténtico guanciale italiano crujiente, yema de huevo pasteurizada, pecorino y el toque aromático de trufa.",
      badge: "Chef",
      available: true
    },
    {
      id: "gnocchi-trufados",
      name: "Gnocchi con Salsa Trufada",
      category: "primeros",
      subcategory: "pasta",
      price: 13.50,
      description: "Gnocchi de patata artesanal con delicada salsa cremosa de trufa negra aromática.",
      badge: "",
      available: true
    },
    {
      id: "pasta-chef",
      name: "Pasta a Criterio del Chef",
      category: "primeros",
      subcategory: "pasta",
      price: 13.50,
      description: "Sugerencia de pasta del día preparada al momento según la inspiración del chef y mercado fresco.",
      badge: "Del Día",
      available: true
    },
    {
      id: "carbonara-original",
      name: "Spaghetti alla Carbonara \"Original\"",
      category: "primeros",
      subcategory: "pasta",
      price: 13.00,
      description: "Auténtica receta romana tradicional: guanciale curado crujiente, yema de huevo y pecorino romano D.O.P. (sin nata).",
      badge: "Clásico",
      available: true
    },
    {
      id: "amatriciana",
      name: "Mezze Maniche all'Amatriciana",
      category: "primeros",
      subcategory: "pasta",
      price: 12.50,
      description: "Pasta corta Mezze Maniche con salsa de tomate italiano San Marzano, guanciale dorado y abundante pecorino romano.",
      badge: "",
      available: true
    },
    {
      id: "gnocchi-gorgonzola",
      name: "Gnocchi Caseros con Gorgonzola, Rúcola Selvática y Nueces",
      category: "primeros",
      subcategory: "pasta",
      price: 13.00,
      description: "Gnocchi de patata caseros con cremosa salsa de queso gorgonzola italiano, hojas de rúcula salvaje fresca y nueces crujientes.",
      badge: "",
      available: true
    },
    {
      id: "lasana-bolonese",
      name: "Lasaña Boloñese",
      category: "primeros",
      subcategory: "pasta",
      price: 12.50,
      description: "Capas de pasta al huevo casera intercaladas con ragú boloñés cocinado lentamente a fuego bajo, bechamel suave y queso gratinado.",
      badge: "",
      available: true
    },
    {
      id: "lasana-verduras",
      name: "Lasaña de Verduras",
      category: "primeros",
      subcategory: "pasta",
      price: 12.00,
      description: "Lasaña artesanal horneada con selección de verduras frescas de temporada, bechamel casera y mozzarella.",
      badge: "Vegetariana",
      available: true
    },
    {
      id: "carrillada-cerdo",
      name: "Carrillada de Cerdo con Parmentier con su Salsa",
      category: "primeros",
      subcategory: "carne",
      price: 14.50,
      description: "Melosa carrillada de cerdo estofada lentamente en su propio jugo reducida, servida sobre cremoso puré parmentier.",
      badge: "Carne",
      available: true
    },

    // --- 3. MENÚ INFANTIL ---
    {
      id: "menu-infantil",
      name: "Menú Infantil",
      category: "infantil",
      subcategory: "infantil",
      price: 10.90,
      description: "Pasta con Tomate o Pizza Margherita + 1 Bebida + 1 Helado. Pensado especialmente para los más pequeños con ingredientes suaves y naturales.",
      badge: "Fórmula Completa",
      available: true
    },

    // --- 4. PIZZA ---
    {
      id: "pizza-margherita",
      name: "Margherita",
      category: "pizza",
      subcategory: "pizza",
      price: 10.50,
      description: "Tomate italiano San Marzano, mozzarella fiordilatte.",
      badge: "Clásica",
      available: true
    },
    {
      id: "pizza-york",
      name: "York",
      category: "pizza",
      subcategory: "pizza",
      price: 11.50,
      description: "Mozzarella, tomate, jamón york.",
      badge: "",
      available: true
    },
    {
      id: "pizza-seis-quesos",
      name: "Seis Quesos",
      category: "pizza",
      subcategory: "pizza",
      price: 12.50,
      description: "Tomate, mozzarella, parmesano, gorgonzola, fontina, emmental, taleggio.",
      badge: "Especial",
      available: true
    },
    {
      id: "pizza-napoles",
      name: "Nápoles",
      category: "pizza",
      subcategory: "pizza",
      price: 12.50,
      description: "Tomate, mozzarella, anchoas.",
      badge: "",
      available: true
    },
    {
      id: "pizza-diabla",
      name: "Diabla",
      category: "pizza",
      subcategory: "pizza",
      price: 12.50,
      description: "Tomate, mozzarella, chorizo picante italiano (salame piccante).",
      badge: "Picante",
      available: true
    },
    {
      id: "pizza-jamon-crudo",
      name: "Jamón Crudo",
      category: "pizza",
      subcategory: "pizza",
      price: 14.00,
      description: "Tomate, mozzarella, jamón crudo italiano, rúcula y parmesano.",
      badge: "Gourmet",
      available: true
    },
    {
      id: "pizza-vegana",
      name: "Vegana",
      category: "pizza",
      subcategory: "pizza",
      price: 13.00,
      description: "Tomate, berenjena, calabacín, pimiento, cebolla. (Sin lácteos).",
      badge: "Vegana",
      available: true
    },
    {
      id: "pizza-vegetariana",
      name: "Vegetariana",
      category: "pizza",
      subcategory: "pizza",
      price: 13.00,
      description: "Tomate, mozzarella, berenjena, calabacín, pimiento, cebolla.",
      badge: "Vegetariana",
      available: true
    },
    {
      id: "focaccia-degustibus",
      name: "Focaccia deGustibus",
      category: "pizza",
      subcategory: "focaccia",
      price: 14.00,
      description: "Queso stracciatella fresca y mortadella italiana de alta calidad.",
      badge: "Especialidad",
      available: true
    },
    {
      id: "saltimbocca-picante",
      name: "Saltimbocca Napolitano Picante",
      category: "pizza",
      subcategory: "saltimbocca",
      price: 8.00,
      description: "Friarelli napolitanos, chorizo picante y mozzarella fundida en masa de pizza.",
      badge: "Picante",
      available: true
    },
    {
      id: "saltimbocca-clasico",
      name: "Saltimbocca Napolitano",
      category: "pizza",
      subcategory: "saltimbocca",
      price: 7.50,
      description: "Friarelli napolitanos, jamón york y mozzarella fundida.",
      badge: "",
      available: true
    },

    // --- 5. POSTRES CASEROS ---
    {
      id: "postre-ferrero",
      name: "Tarta Ferrero",
      category: "postres",
      subcategory: "postres",
      price: 5.50,
      description: "Tarta casera inspirada en el bombón Ferrero Rocher con crema de avellanas y chocolate.",
      badge: "",
      available: true
    },
    {
      id: "postre-cannolo",
      name: "Cannolo dello Chef",
      category: "postres",
      subcategory: "postres",
      price: 5.50,
      description: "Crujiente barquillo de cannolo relleno de suave ricotta dulce y toques del chef.",
      badge: "Tradición",
      available: true
    },
    {
      id: "postre-tiramisu",
      name: "Tiramisú",
      category: "postres",
      subcategory: "postres",
      price: 5.50,
      description: "Receta artesanal tradicional con bizcochos savoiardi empapados en café espresso y crema de queso mascarpone.",
      badge: "Casero",
      available: true
    },
    {
      id: "postre-pannacotta",
      name: "Panna Cotta con Frutos Rojos",
      category: "postres",
      subcategory: "postres",
      price: 5.00,
      description: "Cremosa panna cotta tradicional italiana servida con coulis artesanal de frutos del bosque.",
      badge: "",
      available: true
    },

    // --- 6. CAFETERÍA ---
    { id: "cafe-expresso", name: "Café Expresso", category: "cafeteria", subcategory: "cafe", price: 1.50, description: "", badge: "", available: true },
    { id: "cafe-cortado", name: "Cortado", category: "cafeteria", subcategory: "cafe", price: 1.60, description: "", badge: "", available: true },
    { id: "cafe-carajillo", name: "Carajillo", category: "cafeteria", subcategory: "cafe", price: 2.50, description: "", badge: "", available: true },
    { id: "cafe-leche", name: "Café con Leche", category: "cafeteria", subcategory: "cafe", price: 1.80, description: "", badge: "", available: true },
    { id: "cafe-cappuchino", name: "Cappuchino", category: "cafeteria", subcategory: "cafe", price: 2.00, description: "", badge: "", available: true },
    { id: "cafe-bonbon", name: "Bon Bon", category: "cafeteria", subcategory: "cafe", price: 2.00, description: "", badge: "", available: true },
    { id: "cafe-americano", name: "Café Americano", category: "cafeteria", subcategory: "cafe", price: 1.80, description: "", badge: "", available: true },
    { id: "infusiones", name: "Infusiones", category: "cafeteria", subcategory: "te", price: 2.00, description: "Té, manzanilla, poleo, té verde.", badge: "", available: true },
    { id: "suplemento-hielo", name: "* Del Tiempo (Extra Hielo)", category: "cafeteria", subcategory: "extra", price: 0.10, description: "Suplemento con hielo servido aparte.", badge: "", available: true },

    // --- 7. LICORES & COCKTAILS ---
    { id: "chupitos", name: "Chupitos", category: "licores", subcategory: "licores", price: 2.00, description: "Limoncello, Grappa, Amaro del Capo, Sambuca, etc.", badge: "", available: true },
    { id: "copa-licor", name: "Copa", category: "licores", subcategory: "licores", price: 4.00, description: "Servida en copa con hielo o sola.", badge: "", available: true },
    { id: "cocktail-gintonic", name: "Gin Tonic", category: "licores", subcategory: "cocktail", price: 7.00, description: "", badge: "", available: true },
    { id: "cocktail-ginlemon", name: "Gin Lemon", category: "licores", subcategory: "cocktail", price: 7.00, description: "", badge: "", available: true },
    { id: "cocktail-roncola", name: "Ron Cola", category: "licores", subcategory: "cocktail", price: 7.00, description: "", badge: "", available: true },
    { id: "cocktail-negroni", name: "Negroni", category: "licores", subcategory: "cocktail", price: 7.00, description: "Gin, Campari, Vermut rojo.", badge: "", available: true },
    { id: "cocktail-aperol", name: "Aperol Spritz", category: "licores", subcategory: "cocktail", price: 6.00, description: "Aperol, Prosecco, Soda.", badge: "", available: true },
    { id: "cocktail-campari", name: "Campari Spritz", category: "licores", subcategory: "cocktail", price: 6.00, description: "Campari, Prosecco, Soda.", badge: "", available: true },
    { id: "cocktail-limoncello", name: "Limoncello Spritz", category: "licores", subcategory: "cocktail", price: 6.00, description: "Limoncello, Prosecco, Soda.", badge: "", available: true },

    // --- 8. BEBIDAS & VINOS ---
    { id: "vino-tinto", name: "Vino Tinto", category: "bebidas", subcategory: "vinos", price: 22.00, description: "Botella entera.", badge: "", available: true },
    { id: "vino-blanco", name: "Vino Blanco", category: "bebidas", subcategory: "vinos", price: 22.00, description: "Botella entera.", badge: "", available: true },
    { id: "vino-blanco-premium", name: "Vino Blanco Premium", category: "bebidas", subcategory: "vinos", price: 28.00, description: "Botella selección especial.", badge: "Top", available: true },
    { id: "vino-copa", name: "Vino en Copa", category: "bebidas", subcategory: "vinos", price: 4.00, description: "Copa servida de la casa.", badge: "", available: true },
    { id: "vermut", name: "Vermut", category: "bebidas", subcategory: "vinos", price: 4.00, description: "Rojo o Blanco.", badge: "", available: true },
    { id: "agua-sin", name: "Agua sin Gas", category: "bebidas", subcategory: "agua", price: 2.00, description: "", badge: "", available: true },
    { id: "agua-con", name: "Agua con Gas", category: "bebidas", subcategory: "agua", price: 2.50, description: "", badge: "", available: true },
    { id: "cerveza-tercio", name: "Cerveza Tercio", category: "bebidas", subcategory: "cerveza", price: 3.00, description: "", badge: "", available: true },
    { id: "refresco-cola", name: "Coca-Cola", category: "bebidas", subcategory: "refrescos", price: 2.50, description: "", badge: "", available: true },
    { id: "refresco-fanta", name: "Fanta", category: "bebidas", subcategory: "refrescos", price: 2.50, description: "", badge: "", available: true },
    { id: "refresco-aquarius", name: "Acuarius", category: "bebidas", subcategory: "refrescos", price: 2.50, description: "", badge: "", available: true },
    { id: "refresco-nestea", name: "Nestea", category: "bebidas", subcategory: "refrescos", price: 2.50, description: "", badge: "", available: true }
  ]
};
