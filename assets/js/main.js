/**
 * deGustibus - Ristorante y Bar (Valencia)
 * Main Interactive Engine & Multi-Language System (ES / IT / EN)
 */

const DEFAULT_PHONE_DISPLAY = "+34 629 09 92 95";
const DEFAULT_PHONE_RAW = "34629099295";

let currentLang = 'es'; // Idioma predeterminado: Español

document.addEventListener('DOMContentLoaded', () => {
  // Check stored language preference or default to 'es'
  const savedLang = localStorage.getItem('degustibus_lang');
  if (savedLang && ['es', 'it', 'en'].includes(savedLang)) {
    currentLang = savedLang;
  }

  initStickyHeader();
  initMobileMenu();
  initLanguageSwitcher();
  initOpeningHoursStatus();
  initMenuTabsAndFilters();
  initReservationSystem();

  // Apply initial translations
  applyTranslations(currentLang);
  updateLanguageSwitcherUI(currentLang);
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL EFFECTS
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('glass-nav-scrolled', 'py-2');
      header.classList.remove('py-4');
    } else {
      header.classList.remove('glass-nav-scrolled', 'py-2');
      header.classList.add('py-4');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenuDrawer');
  const mobileClose = document.getElementById('mobileMenuClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileToggle || !mobileMenu) return;

  const openDrawer = () => {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    document.body.classList.add('overflow-hidden');
  };

  const closeDrawer = () => {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    document.body.classList.remove('overflow-hidden');
  };

  mobileToggle.addEventListener('click', openDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. MULTI-LANGUAGE ENGINE (ES / IT / EN)
   ========================================================================== */
const i18n = {
  es: {
    // Header & Bars
    scarcity_banner: "El servicio de mediodía está activo <strong>EXCLUSIVAMENTE con reserva previa</strong>.",
    aperitivo_tag_top: "Aperitivo Vie & Sáb: 17:00 – 21:00",
    nav_philosophy: "Filosofía",
    nav_menu: "La Carta",
    nav_aperitivo: "El Aperitivo",
    nav_ambience: "El Local",
    nav_hours: "Horarios y Mapa",
    nav_book: "Reservar Mesa",
    live_open_now: "Abierto Ahora",
    live_closed_now: "Cerrado Ahora",
    call_now: "Llamar Ahora",
    
    // Hero
    hero_badge: "Elegido por cientos de amantes de la cocina italiana · 4.9★",
    hero_title_prefix: "La auténtica Italia en el corazón de ",
    hero_title_highlight: "L'Eixample",
    hero_title_suffix: ": cierra los ojos y saborea.",
    hero_sub: "Pasta fresca mantecada al momento, sabores regionales sinceros y el rito del auténtico aperitivo italiano en Valencia.",
    hero_lunch_title: "Aviso importante para el servicio de mediodía:",
    hero_lunch_desc: "El servicio de mediodía está disponible <strong class=\"underline decoration-tomato decoration-2\">EXCLUSIVAMENTE con reserva previa</strong> para garantizar la frescura y el cuidado artesanal de cada plato.",
    hero_cta_book: "Reserva tu mesa",
    hero_cta_menu: "Descubre la Carta",
    trust_1: "Recetas 100% auténticas",
    trust_2: "Solo productos DOP italianos",
    trust_3: "Cocinado al minuto",
    hero_dish_tag: "Especialidad",
    hero_dish_title: "Spaghetti alla Carbonara Tradicional",
    hero_dish_desc: "Guanciale de Norcia crujiente, Pecorino Romano DOP y yemas frescas",
    hero_dish_nocream: "Sin nata",
    hero_dish_trad: "100% Tradición",
    hero_spritz_title: "El Rito del Spritz",
    hero_spritz_sub: "Vie & Sáb 17:00-21:00 con platillos gourmet incluidos",

    // Philosophy
    philo_tag: "Viaje de sabores por Italia",
    philo_title: "La cocina italiana no admite atajos.<br><span class=\"font-serif italic font-normal text-tomato\">Es un viaje sagrado por las regiones.</span>",
    philo_desc: "¿Cuántas veces has pedido \"pasta italiana\" fuera de Italia y te has encontrado con nata pesada, pasta pasada de cocción o salsas industriales? <strong>En deGustibus hicimos una promesa de honor.</strong>",
    philo_1_tag: "01. Mantecatura Expresa",
    philo_1_title: "Salteado al Instante",
    philo_1_desc: "Nada de precocciones ni salsas recalentadas. Cada ración se liga al momento con el agua rica en almidón para lograr una emulsión cremosa y sedosa.",
    philo_2_tag: "02. Trefilado al Bronce",
    philo_2_title: "Cocción Rigurosamente al Dente",
    philo_2_desc: "Elegimos sémola de trigo duro y trefilas de bronce que aportan la porosidad perfecta para abrazar la salsa sin que resbale al fondo del plato.",
    philo_3_tag: "03. Materias Primas DOP",
    philo_3_title: "Origen 100% Certificado",
    philo_3_desc: "Guanciale curado de Norcia, Pecorino Romano DOP de corteza negra, tomate San Marzano del Agro Sarnese y burrata fresca pugliese directa de Italia.",
    philo_4_tag: "04. El Sentido de la Mesa",
    philo_4_title: "Convivialidad Auténtica",
    philo_4_desc: "Un restaurante y bar donde te sientes en casa: luces cálidas, copas sinceras, música acogedora y la hospitalidad espontánea italiana.",
    philo_quote: "\"No hemos inventado la pasta italiana. Simplemente elegimos respetarla sin atajos, trayendo a Valencia la misma emoción que sentirías en una trattoria de Roma o en las colinas de Bolonia.\"",
    philo_chef: "— El Equipo de deGustibus · Carrer de Borriana, 25",

    // Menu
    menu_tag: "Carta Gastronómica",
    menu_title: "Sabores de Italia, sin concesiones.",
    menu_sub: "Explora nuestras recetas icónicas. Cada plato se elabora al momento con ingredientes frescos y pastas de elaboración artesanal.",
    menu_cta_book: "Reserva Mesa para Saborear",
    tab_all: "Todos los Platos",
    tab_primi: "🍝 Primeros Tradicionales",
    tab_antipasti: "🧀 Entrantes y Tablas",
    tab_dolci: "🍰 Postres Artesanales",
    tab_bar: "🍸 Bar, Spritz y Vinos",
    filter_all: "Ver Todo",
    filter_iconic: "⭐ Los Más Queridos (Firma)",
    filter_veg: "🌱 Opciones Vegetarianas",
    filter_dop: "🇮🇹 100% DOP Garantizado",
    dish_order: "Reservar",
    dish_taste: "Reserva para probar",
    menu_allergy_title: "¿Tienes alergias, intolerancias o prefieres pasta sin gluten?",
    menu_allergy_sub: "Avísanos al reservar: adaptamos los platos con el máximo esmero.",
    menu_pdf_wa: "Pide la carta completa en PDF por WhatsApp",

    // Aperitivo
    ape_tag: "Rito del Fin de Semana · L'Eixample",
    ape_title: "Viernes y Sábado de 17:00 a 21:00.<br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-tomato to-rose-400\">El auténtico Aperitivo Italiano en Valencia.</span>",
    ape_desc_1: "En Milán o Venecia el aperitivo no es un simple trago rápido: es el momento en el que te reúnes con amigos, el tiempo se detiene, las copas brindan y la barra se llena de sabores auténticos.",
    ape_desc_2: "Cada viernes y sábado, pide tu Spritz, Negroni de autor o una copa de vino italiano y recibirás nuestro <strong>acompañamiento de cicchetti gourmet</strong>: focaccias recién horneadas, mini-bruschettas calientes, lascas de Grana y bocados preparados al momento.",
    ape_f1_t: "Spritz y Cócteles Clásicos",
    ape_f1_d: "Aperol, Campari, Negroni, Americano",
    ape_f2_t: "Cicchetti Calientes Incluidos",
    ape_f2_d: "Focaccias, quesos y bruschettas del chef",
    ape_f3_t: "Vinos y Burbujas DOCG",
    ape_f3_d: "Prosecco de Valdobbiadene y grandes tintos",
    ape_f4_t: "Ambiente Convivial",
    ape_f4_d: "Luces cálidas, música lounge y buena energía",
    ape_cta_book: "Reservar para el Aperitivo",
    ape_cta_wa: "Consultar por WhatsApp",
    ape_limited_badge: "Plazas Limitadas el Finde",
    ape_limited_desc: "Las mesas para el aperitivo se llenan con rapidez. Te aconsejamos reservar tu sitio con antelación.",

    // Ambience
    amb_tag: "La Experiencia y El Diseño",
    amb_title: "Un rincón íntimo de Roma y Milán en Valencia.",
    amb_desc: "Paredes claras, lámparas de mesa de diseño con luz cálida, acogedores muebles de madera y una galería fotográfica en blanco y negro que celebra la gran belleza de Italia. Un ambiente cuidado y sin rigideces.",
    amb_c1_t: "Luces tenues y mesas de madera",
    amb_c1_d: "Ideal para cenas en pareja, almuerzos de negocios o encuentros con amigos.",
    amb_c2_t: "Sartenes humeantes al minuto",
    amb_c2_d: "El inconfundible aroma del guanciale crujiente y la salsa fresca.",
    amb_c3_t: "El placer de compartir",
    amb_c3_d: "Sin prisas: en deGustibus cada comida es un momento sagrado.",
    ig_title: "Sigue nuestro viaje diario en Instagram",
    ig_sub: "Vídeos de salteados, platos del día y el detrás de escena:",
    ig_btn: "Ver Instagram",

    // Booking Section
    book_tag: "Reserva Inmediata",
    book_title: "Reserva tu sitio en la mesa.",
    book_desc: "Rellena los datos: el sistema generará un mensaje de WhatsApp preformateado para nuestro equipo, que te confirmará en pocos minutos.",
    book_lunch_warn: "Recordamos que a mediodía atendemos <strong>únicamente bajo reserva previa</strong> para garantizar la máxima frescura.",
    book_phone_call: "¿Prefieres hablar directamente?",
    book_call_now: "Llamar al restaurante ahora",
    lbl_name: "Nombre y Apellidos *",
    lbl_guests: "Número de Personas *",
    lbl_meal: "Momento / Servicio *",
    lbl_occasion: "Ocasión",
    lbl_date: "Fecha Deseada *",
    lbl_time: "Hora Deseada *",
    lbl_notes: "Alergias / Peticiones Especiales",
    opt_lunch: "Almuerzo (Solo con reserva previa)",
    opt_dinner: "Cena (Mar - Sáb)",
    opt_ape: "Aperitivo (Vie - Sáb 17-21)",
    opt_sun: "Comida del Domingo (13:00 - 17:00)",
    btn_submit_wa: "Enviar Solicitud de Reserva por WhatsApp",
    book_footer_note: "Recibirás respuesta inmediata de nuestro equipo. Sin pagos por adelantado.",

    // Hours & Map
    hours_tag: "Información y Ubicación",
    hours_title: "Horarios de Apertura y Servicio",
    hours_sub: "Estamos en Valencia, en el elegante corazón de <strong>L'Eixample</strong>, a pocos pasos de Gran Vía Marqués del Turia y Ruzafa.",
    day_mon: "Lunes",
    day_mon_stat: "Cerrado (Descanso semanal)",
    day_tue_thu: "Martes – Jueves",
    day_fri_sat: "Viernes y Sábado",
    day_sun: "Domingo",
    lunch_rule: "<strong>Regla del Mediodía:</strong> El servicio diurno está activo <em>únicamente con reserva previa</em> para asegurar una elaboración perfecta al momento.",
    faq_title: "Preguntas Frecuentes",

    // Pre-Footer
    prefooter_tag: "Te esperamos en L'Eixample",
    prefooter_title: "¿Te apetece auténtica pasta italiana hoy?",
    prefooter_desc: "No dejes tu velada al azar. Reserva tu mesa en segundos o escríbenos directamente por WhatsApp.",
    prefooter_cta_book: "Reserva tu Mesa Ahora",
    prefooter_cta_wa: "WhatsApp Inmediato",

    // WhatsApp Message Template
    wa_prefix: "🇪🇸 *Solicitud de Reserva de Mesa - deGustibus (Valencia)*",
    wa_name: "👤 *Nombre*:",
    wa_guests: "👥 *Comensales*:",
    wa_date: "📅 *Fecha*:",
    wa_time: "⏰ *Hora*:",
    wa_service: "🍽️ *Servicio*:",
    wa_occasion: "🎉 *Ocasión*:",
    wa_notes: "📝 *Notas / Alergias*:",
    wa_closing: "📍 *Carrer de Borriana, 25 (L'Eixample)*\nQuedo a la espera de su confirmación. ¡Muchas gracias!"
  },

  it: {
    // Header & Bars
    scarcity_banner: "Il servizio di mezzogiorno è attivo <strong>ESCLUSIVAMENTE previa prenotazione</strong>.",
    aperitivo_tag_top: "Aperitivo Ven & Sab: 17:00 – 21:00",
    nav_philosophy: "Filosofia",
    nav_menu: "Il Menù",
    nav_aperitivo: "L'Aperitivo",
    nav_ambience: "Il Locale",
    nav_hours: "Orari & Mappa",
    nav_book: "Prenota Tavolo",
    live_open_now: "Aperto Adesso",
    live_closed_now: "Chiuso al momento",
    call_now: "Chiama Ora",

    // Hero
    hero_badge: "Oltre centinaia di buongustai a Valencia · 4.9★",
    hero_title_prefix: "L'Italia autentica nel cuore de ",
    hero_title_highlight: "L'Eixample",
    hero_title_suffix: ": chiudi gli occhi e gusta.",
    hero_sub: "Pasta fresca mantecata al momento, sapori regionali sinceri e il rito dell'autentico aperitivo italiano a Valencia.",
    hero_lunch_title: "Avviso importante per il servizio di mezzogiorno:",
    hero_lunch_desc: "Il servizio di mezzogiorno è attivo <strong class=\"underline decoration-tomato decoration-2\">ESCLUSIVAMENTE previa prenotazione</strong> per garantire la freschezza e la cura artigianale di ogni pietanza.",
    hero_cta_book: "Prenota il tuo tavolo",
    hero_cta_menu: "Scopri il Menù",
    trust_1: "Ricette originali al 100%",
    trust_2: "Solo prodotti DOP italiani",
    trust_3: "Cotture espresse al minuto",
    hero_dish_tag: "Specialità",
    hero_dish_title: "Spaghetti alla Carbonara Tradizionale",
    hero_dish_desc: "Guanciale di Norcia croccante, Pecorino Romano DOP & tuorli freschi",
    hero_dish_nocream: "Nessuna panna",
    hero_dish_trad: "100% Tradizione",
    hero_spritz_title: "Il Rito dello Spritz",
    hero_spritz_sub: "Ven & Sab 17:00-21:00 con piattini gourmet inclusi",

    // Philosophy
    philo_tag: "Viaje de sabores por Italia",
    philo_title: "La cucina italiana non è un compromesso.<br><span class=\"font-serif italic font-normal text-tomato\">È un viaggio sacro nelle regioni.</span>",
    philo_desc: "Quante volte ti è capitato di ordinare una \"pasta italiana\" all'estero per poi ritrovarti panna pesante, pasta stracotta o sughi pronti? <strong>Da deGustibus abbiamo fatto una promessa d'onore.</strong>",
    philo_1_tag: "01. Mantecatura Espressa",
    philo_1_title: "Spadellata all'Istante",
    philo_1_desc: "Niente precotture o salse riscaldate al microonde. Ogni singola porzione viene creata a vista con l'acqua ricca di amido per emulsionare creme setose al palato.",
    philo_2_tag: "02. Trafilatura al Bronzo",
    philo_2_title: "Cottura Rigorosamente al Dente",
    philo_2_desc: "Selezioniamo solo semola di grano duro e trafile artigianali al bronzo che regalano la porosità perfetta per aggrappare il sugo senza farlo scivolare.",
    philo_3_tag: "03. Materie Prime DOP",
    philo_3_title: "Origine 100% Certificata",
    philo_3_desc: "Guanciale stagionato di Norcia, Pecorino Romano DOP a buccia nera, pomodori San Marzano dell'Agro Sarnese e burrata fresca pugliese spedita settimanalmente.",
    philo_4_tag: "04. Il Senso della Tavola",
    philo_4_title: "Convivialità Autentica",
    philo_4_desc: "Un bar e ristorante dove il servizio ti fa sentire a casa: luci calde, calici sinceri, musica accogliente e il calore spontaneo dell'ospitalità italiana.",
    philo_quote: "\"Non abbiamo inventato la pasta italiana. Abbiamo semplicemente scelto di rispettarla senza scorciatoie, portando a Valencia la stessa emozione che proveresti in una trattoria a Roma o sui colli bolognesi.\"",
    philo_chef: "— La Brigata di deGustibus · Carrer de Borriana, 25",

    // Menu
    menu_tag: "Carta Gastronomica",
    menu_title: "Sapori d'Italia, senza compromessi.",
    menu_sub: "Esplora le nostre ricette iconiche. Ogni piatto è preparato espresso con ingredienti freschi e trafile artigianali.",
    menu_cta_book: "Prenota un Tavolo per Gustare",
    tab_all: "Tutti i Piatti",
    tab_primi: "🍝 Primi della Tradizione",
    tab_antipasti: "🧀 Antipasti & Taglieri",
    tab_dolci: "🍰 Dolci Artigianali",
    tab_bar: "🍸 Bar, Spritz & Vini",
    filter_all: "Mostra Tutto",
    filter_iconic: "⭐ I Più Amati (Signature)",
    filter_veg: "🌱 Opzioni Vegetariane",
    filter_dop: "🇮🇹 100% DOP Garantito",
    dish_order: "Prenota",
    dish_taste: "Prenota per provare",
    menu_allergy_title: "Hai allergie, intolleranze o desideri la pasta senza glutine?",
    menu_allergy_sub: "Avvisaci al momento della prenotazione: adatteremo i piatti con la massima cura.",
    menu_pdf_wa: "Chiedi il menù completo in PDF su WhatsApp",

    // Aperitivo
    ape_tag: "Rito del Fine Settimana · L'Eixample",
    ape_title: "Venerdì & Sabato dalle 17:00 alle 21:00.<br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-tomato to-rose-400\">Il vero Aperitivo Italiano a Valencia.</span>",
    ape_desc_1: "A Milano o a Venezia l'aperitivo non è semplicemente un drink veloce: è il momento in cui ci si siede con gli amici, il tempo rallenta, i bicchieri tintinnano e il bancone si riempie di sapori autentici.",
    ape_desc_2: "Ogni venerdì e sabato, ordina il tuo Spritz, Negroni d'autore o un calice di vino italiano e riceverai il nostro <strong>accompagnamento di cicchetti gourmet</strong>: focacce appena sfornate, mini-bruschette calde, scaglie di Grana e stuzzicherie preparate al momento dalla cucina.",
    ape_f1_t: "Spritz & Cocktail Classici",
    ape_f1_d: "Aperol, Campari, Negroni, Americano",
    ape_f2_t: "Cicchetti Caldi Inclusi",
    ape_f2_d: "Focacce, formaggi e bruschette dello chef",
    ape_f3_t: "Vini & Bollicine DOCG",
    ape_f3_d: "Prosecco di Valdobbiadene e grandi rossi",
    ape_f4_t: "Atmosfera Conviviale",
    ape_f4_d: "Luci calde, musica lounge e buone vibrazioni",
    ape_cta_book: "Prenota per l'Aperitivo",
    ape_cta_wa: "Chiedi su WhatsApp",
    ape_limited_badge: "Posti Limitati nel Weekend",
    ape_limited_desc: "I tavoli per l'orario aperitivo si riempiono rapidamente. Ti consigliamo vivamente di riservare il tuo posto con anticipo.",

    // Ambience
    amb_tag: "L'Esperienza & Il Design",
    amb_title: "Un angolo intimo di Roma e Milano a Valencia.",
    amb_desc: "Pareti chiare, lampade da tavolo di design a luce calda, caldi arredi in legno e una galleria fotografica a parete in bianco e nero che racconta la grande bellezza d'Italia. Un'atmosfera curata, ma senza alcuna rigidità.",
    amb_c1_t: "Luci soffuse & tavoli in legno",
    amb_c1_d: "Perfetto per cene a due, cene d'affari o ritrovi tra amici cari.",
    amb_c2_t: "Padelle fumanti ed espresse",
    amb_c2_d: "Il profumo inconfondibile del guanciale croccante e del sugo fresco.",
    amb_c3_t: "Il piacere dello stare insieme",
    amb_c3_d: "Nessuna fretta: al deGustibus ogni pasto è un momento sacro.",
    ig_title: "Segui il nostro viaggio quotidiano su Instagram",
    ig_sub: "Video delle mantecature, piatti del giorno e dietro le quinte:",
    ig_btn: "Apri Instagram",

    // Booking Section
    book_tag: "Prenotazione Immediata",
    book_title: "Riserva il tuo posto a tavola.",
    book_desc: "Compila i dettagli: il sistema genererà un messaggio WhatsApp già precompilato per il nostro staff, che confermerà la disponibilità in pochi minuti.",
    book_lunch_warn: "Ricordiamo che a pranzo lavoriamo <strong>esclusivamente previa prenotazione</strong> per garantire la freschezza assoluta delle cotture.",
    book_phone_call: "Preferisci parlare a voce?",
    book_call_now: "Chiama subito il locale",
    lbl_name: "Nome & Cognome *",
    lbl_guests: "Numero di Persone *",
    lbl_meal: "Momento / Servizio *",
    lbl_occasion: "Occasione",
    lbl_date: "Data Desiderata *",
    lbl_time: "Orario Desiderato *",
    lbl_notes: "Esigenze Particolari / Allergie / Intolleranze",
    opt_lunch: "Pranzo (Solo su prenotazione)",
    opt_dinner: "Cena (Mar - Sab)",
    opt_ape: "Aperitivo (Ven - Sab 17-21)",
    opt_sun: "Pranzo Domenicale (13:00 - 17:00)",
    btn_submit_wa: "Invia Richiesta di Prenotazione su WhatsApp",
    book_footer_note: "Riceverai un riscontro a stretto giro per confermare il tavolo. Nessun pagamento anticipato.",

    // Hours & Map
    hours_tag: "Informazioni & Pianificazione",
    hours_title: "Orari di Apertura & Servizio",
    hours_sub: "Siamo a Valencia, nel cuore elegante de <strong>L'Eixample</strong>, a pochi passi da Gran Vía Marqués del Turia e Ruzafa.",
    day_mon: "Lunedì",
    day_mon_stat: "Chiuso (Riposo settimanale)",
    day_tue_thu: "Martedì – Giovedì",
    day_fri_sat: "Venerdì & Sabato",
    day_sun: "Domenica",
    lunch_rule: "<strong>Regla del Pranzo:</strong> Il servizio di mezzogiorno è rigorosamente attivo <em>esclusivamente previa prenotazione</em> per garantire un'esperienza impeccabile.",
    faq_title: "Domande Frequenti",

    // Pre-Footer
    prefooter_tag: "Ti aspettiamo a L'Eixample",
    prefooter_title: "Hai voglia di vera pasta italiana stasera?",
    prefooter_desc: "Non lasciare al caso la tua serata. Prenota adesso il tuo tavolo in pochi secondi o scrivici direttamente su WhatsApp.",
    prefooter_cta_book: "Prenota il Tuo Tavolo Ora",
    prefooter_cta_wa: "WhatsApp Immediato",

    // WhatsApp Message Template
    wa_prefix: "🇮🇹 *Richiesta Prenotazione Tavolo - deGustibus (Valencia)*",
    wa_name: "👤 *Nome*:",
    wa_guests: "👥 *Numero Ospiti*:",
    wa_date: "📅 *Data*:",
    wa_time: "⏰ *Orario*:",
    wa_service: "🍽️ *Momento*:",
    wa_occasion: "🎉 *Occasione*:",
    wa_notes: "📝 *Note / Allergie*:",
    wa_closing: "📍 *Carrer de Borriana, 25 (L'Eixample)*\nAttendo gentile conferma della disponibilità. Grazie mille!"
  },

  en: {
    // Header & Bars
    scarcity_banner: "Lunch service is available <strong>EXCLUSIVELY upon advance reservation</strong>.",
    aperitivo_tag_top: "Aperitivo Fri & Sat: 5:00 PM – 9:00 PM",
    nav_philosophy: "Philosophy",
    nav_menu: "The Menu",
    nav_aperitivo: "Aperitivo",
    nav_ambience: "The Restaurant",
    nav_hours: "Hours & Location",
    nav_book: "Book a Table",
    live_open_now: "Open Now",
    live_closed_now: "Currently Closed",
    call_now: "Call Now",

    // Hero
    hero_badge: "Loved by hundreds of foodies in Valencia · 4.9★",
    hero_title_prefix: "Authentic Italy in the heart of ",
    hero_title_highlight: "L'Eixample",
    hero_title_suffix: ": close your eyes and savor.",
    hero_sub: "Fresh pasta tossed live to order, sincere regional recipes, and the authentic Italian aperitivo ritual in Valencia.",
    hero_lunch_title: "Important note for daytime lunch service:",
    hero_lunch_desc: "Lunch service is open <strong class=\"underline decoration-tomato decoration-2\">EXCLUSIVELY upon advance booking</strong> to ensure unmatched freshness and handcrafted care.",
    hero_cta_book: "Book your table",
    hero_cta_menu: "Discover the Menu",
    trust_1: "100% Traditional Recipes",
    trust_2: "Certified Italian PDO Products",
    trust_3: "Cooked fresh to order",
    hero_dish_tag: "Signature Dish",
    hero_dish_title: "Traditional Spaghetti alla Carbonara",
    hero_dish_desc: "Crispy Norcia Guanciale, Pecorino Romano PDO & organic fresh yolks",
    hero_dish_nocream: "No heavy cream",
    hero_dish_trad: "100% Tradition",
    hero_spritz_title: "The Spritz Ritual",
    hero_spritz_sub: "Fri & Sat 5-9 PM with gourmet cicchetti platters included",

    // Philosophy
    philo_tag: "A culinary journey through Italy",
    philo_title: "Italian cuisine knows no compromise.<br><span class=\"font-serif italic font-normal text-tomato\">It is a sacred journey across regions.</span>",
    philo_desc: "How many times have you ordered \"Italian pasta\" abroad only to be served heavy cream, overcooked pasta, or industrial jars? <strong>At deGustibus, we made a chef's pledge of honor.</strong>",
    philo_1_tag: "01. Live Emulsion Mantecatura",
    philo_1_title: "Tossed Fresh in the Pan",
    philo_1_desc: "No pre-cooking or microwaved sauces. Each portion is emulsified live with starch-rich pasta water into a velvety, natural sauce.",
    philo_2_tag: "02. Bronze-Die Extruded Pasta",
    philo_2_title: "Strictly Al Dente",
    philo_2_desc: "We exclusively source premium durum wheat pasta extruded through bronze dies, yielding a rough surface that hugs the sauce.",
    philo_3_tag: "03. Certified PDO Ingredients",
    philo_3_title: "100% Certified Origin",
    philo_3_desc: "Cured Guanciale from Norcia, black-rind Pecorino Romano PDO, San Marzano tomatoes from Agro Sarnese, and fresh Burrata from Puglia.",
    philo_4_tag: "04. The Convivial Table",
    philo_4_title: "Heartfelt Hospitality",
    philo_4_desc: "A warm neighborhood Italian bistro: soft table lamps, honest wines, soulful soundtrack, and genuine warmth.",
    philo_quote: "\"We did not invent Italian pasta. We simply chose to honor it without shortcuts, bringing to Valencia the very emotion of a trattoria in Rome or Bologna.\"",
    philo_chef: "— The deGustibus Kitchen Brigade · Carrer de Borriana, 25",

    // Menu
    menu_tag: "Gastronomic Menu",
    menu_title: "Flavors of Italy, without compromises.",
    menu_sub: "Discover our iconic recipes. Every dish is cooked fresh to order with authentic regional ingredients.",
    menu_cta_book: "Reserve a Table to Taste",
    tab_all: "All Dishes",
    tab_primi: "🍝 Traditional Pastas",
    tab_antipasti: "🧀 Appetizers & Boards",
    tab_dolci: "🍰 Handcrafted Desserts",
    tab_bar: "🍸 Bar, Spritz & Wines",
    filter_all: "Show All",
    filter_iconic: "⭐ Iconic Signatures",
    filter_veg: "🌱 Vegetarian Choices",
    filter_dop: "🇮🇹 100% Certified PDO",
    dish_order: "Book Table",
    dish_taste: "Book to taste",
    menu_allergy_title: "Have allergies, intolerances, or gluten-free requests?",
    menu_allergy_sub: "Simply let us know in your booking notes: we adapt dishes with dedicated care.",
    menu_pdf_wa: "Request full PDF wine list & menu on WhatsApp",

    // Aperitivo
    ape_tag: "Weekend Ritual · L'Eixample",
    ape_title: "Friday & Saturday from 5:00 PM to 9:00 PM.<br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-tomato to-rose-400\">The Real Italian Aperitivo in Valencia.</span>",
    ape_desc_1: "In Milan and Venice, aperitivo is never just a quick drink: it's when friends gather, glasses clink, and the bar counter fills with warm, appetizing delicacies.",
    ape_desc_2: "Every Friday and Saturday, order your Spritz, craft Negroni, or glass of Italian wine and enjoy our <strong>complimentary gourmet cicchetti platter</strong>: freshly baked focaccias, warm bruschettas, and chef's bites.",
    ape_f1_t: "Classic Italian Cocktails",
    ape_f1_d: "Aperol & Campari Spritz, Negroni, Americano",
    ape_f2_t: "Warm Cicchetti Included",
    ape_f2_d: "Focaccia, artisanal cheeses and chef's bruschetta",
    ape_f3_t: "DOCG Wines & Bubbles",
    ape_f3_d: "Valdobbiadene Prosecco and great regional reds",
    ape_f4_t: "Convivial Vibe",
    ape_f4_d: "Warm lighting, chilled music, and great company",
    ape_cta_book: "Book for Aperitivo",
    ape_cta_wa: "Ask via WhatsApp",
    ape_limited_badge: "Limited Weekend Seating",
    ape_limited_desc: "Aperitivo tables fill up quickly. We highly recommend booking your table in advance.",

    // Ambience
    amb_tag: "Atmosphere & Design",
    amb_title: "An intimate corner of Rome and Milan in Valencia.",
    amb_desc: "Clean bright walls, warm designer table lamps, wooden furnishings, and a curated black & white photo gallery celebrating Italian beauty. Refined yet relaxed.",
    amb_c1_t: "Soft lights & wooden tables",
    amb_c1_d: "Perfect for date nights, business lunches, or cheerful gatherings.",
    amb_c2_t: "Steaming pans cooked live",
    amb_c2_d: "The aroma of sizzling guanciale and fresh savory sauces.",
    amb_c3_t: "The joy of gathering",
    amb_c3_d: "Never rushed: at deGustibus every meal is a sacred pause.",
    ig_title: "Follow our daily culinary journey on Instagram",
    ig_sub: "Live pasta tossing, daily specials and kitchen stories:",
    ig_btn: "Open Instagram",

    // Booking Section
    book_tag: "Direct Reservation",
    book_title: "Reserve your seat at the table.",
    book_desc: "Fill in the details: our system generates a pre-formatted WhatsApp message for our floor staff to confirm your booking within minutes.",
    book_lunch_warn: "Please note that lunch service is open <strong>strictly upon reservation</strong> to ensure maximum freshness.",
    book_phone_call: "Prefer to speak with us?",
    book_call_now: "Call the restaurant now",
    lbl_name: "Full Name *",
    lbl_guests: "Number of Guests *",
    lbl_meal: "Meal / Service *",
    lbl_occasion: "Occasion",
    lbl_date: "Preferred Date *",
    lbl_time: "Preferred Time *",
    lbl_notes: "Dietary Needs / Special Requests",
    opt_lunch: "Lunch (By reservation only)",
    opt_dinner: "Dinner (Tue - Sat)",
    opt_ape: "Aperitivo (Fri - Sat 5-9 PM)",
    opt_sun: "Sunday Lunch (1:00 PM - 5:00 PM)",
    btn_submit_wa: "Send Reservation Request via WhatsApp",
    book_footer_note: "Our team will reply promptly to confirm your table. No upfront fee.",

    // Hours & Map
    hours_tag: "Location & Schedule",
    hours_title: "Opening Hours & Information",
    hours_sub: "Located in the heart of Valencia's elegant <strong>L'Eixample</strong>, steps away from Gran Vía Marqués del Turia and Ruzafa.",
    day_mon: "Monday",
    day_mon_stat: "Closed (Weekly Rest)",
    day_tue_thu: "Tuesday – Thursday",
    day_fri_sat: "Friday & Saturday",
    day_sun: "Sunday",
    lunch_rule: "<strong>Lunch Policy:</strong> Midday lunch is exclusively active <em>upon advance booking</em> to ensure made-from-scratch perfection.",
    faq_title: "Frequently Asked Questions",

    // Pre-Footer
    prefooter_tag: "We look forward to welcoming you",
    prefooter_title: "Craving authentic Italian pasta tonight?",
    prefooter_desc: "Don't leave your evening to chance. Reserve your table in seconds or chat with us on WhatsApp.",
    prefooter_cta_book: "Reserve Your Table Now",
    prefooter_cta_wa: "Direct WhatsApp",

    // WhatsApp Message Template
    wa_prefix: "🇬🇧 *Table Reservation Request - deGustibus (Valencia)*",
    wa_name: "👤 *Name*:",
    wa_guests: "👥 *Guests*:",
    wa_date: "📅 *Date*:",
    wa_time: "⏰ *Time*:",
    wa_service: "🍽️ *Service*:",
    wa_occasion: "🎉 *Occasion*:",
    wa_notes: "📝 *Notes / Dietary*:",
    wa_closing: "📍 *Carrer de Borriana, 25 (L'Eixample)*\nLooking forward to your confirmation. Thank you!"
  }
};

function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-switcher-btn');

  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      if (!lang || !i18n[lang]) return;
      
      currentLang = lang;
      localStorage.setItem('degustibus_lang', lang);
      
      applyTranslations(lang);
      updateLanguageSwitcherUI(lang);
      initOpeningHoursStatus(); // Re-render status texts in new language
    });
  });
}

function updateLanguageSwitcherUI(lang) {
  document.querySelectorAll('.lang-switcher-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.className = "lang-switcher-btn px-2.5 py-1 rounded-full text-xs font-bold transition-all bg-tomato text-white shadow-sm";
    } else {
      btn.className = "lang-switcher-btn px-2.5 py-1 rounded-full text-xs transition-all text-neutral-400 hover:text-white";
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

function applyTranslations(lang) {
  const dict = i18n[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update form placeholders & select options
  updateFormTexts(lang);
}

function updateFormTexts(lang) {
  const dict = i18n[lang];
  if (!dict) return;

  const mealSelect = document.getElementById('bookingMealType');
  if (mealSelect) {
    if (mealSelect.options[0]) mealSelect.options[0].text = dict.opt_dinner;
    if (mealSelect.options[1]) mealSelect.options[1].text = dict.opt_lunch;
    if (mealSelect.options[2]) mealSelect.options[2].text = dict.opt_ape;
    if (mealSelect.options[3]) mealSelect.options[3].text = dict.opt_sun;
  }

  const modalMeal = document.getElementById('modalMeal');
  if (modalMeal) {
    if (modalMeal.options[0]) modalMeal.options[0].text = dict.opt_dinner;
    if (modalMeal.options[1]) modalMeal.options[1].text = dict.opt_ape;
    if (modalMeal.options[2]) modalMeal.options[2].text = dict.opt_lunch;
  }
}

/* ==========================================================================
   4. REAL-TIME RESTAURANT STATUS CALCULATOR
   ========================================================================== */
function initOpeningHoursStatus() {
  const statusBadges = document.querySelectorAll('.live-status-badge');
  if (statusBadges.length === 0) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours + minutes / 60;

  let isOpen = false;
  let statusText = '';
  let subText = '';

  const dict = i18n[currentLang] || i18n.es;

  if (day === 1) { // Monday
    isOpen = false;
    statusText = currentLang === 'es' ? 'Hoy Cerrado (Día de descanso)' : (currentLang === 'it' ? 'Oggi Chiuso (Turno di riposo)' : 'Closed Today (Weekly Rest)');
    subText = currentLang === 'es' ? 'Abrimos el martes a las 13:00 (con reserva)' : (currentLang === 'it' ? 'Riapriamo Martedì alle 13:00 (su prenotazione)' : 'Reopening Tuesday at 1:00 PM (by booking)');
  } else if (day >= 2 && day <= 4) { // Tue - Thu
    if (currentTime >= 13.0 && currentTime < 16.0) {
      isOpen = true;
      statusText = currentLang === 'es' ? 'Abierto Ahora para el Almuerzo' : (currentLang === 'it' ? 'Aperto Adesso per il Pranzo' : 'Open Now for Lunch');
      subText = currentLang === 'es' ? 'Cierre a las 16:00 · Reapertura a las 19:00' : (currentLang === 'it' ? 'Chiudiamo alle 16:00 · Riapertura alle 19:00' : 'Closes at 4:00 PM · Dinner at 7:00 PM');
    } else if (currentTime >= 19.0 && currentTime < 23.0) {
      isOpen = true;
      statusText = currentLang === 'es' ? 'Abierto Ahora para la Cena' : (currentLang === 'it' ? 'Aperto Adesso per la Cena' : 'Open Now for Dinner');
      subText = currentLang === 'es' ? 'Cocina abierta hasta las 23:00' : (currentLang === 'it' ? 'Chiusura cucina ore 23:00' : 'Kitchen open until 11:00 PM');
    } else if (currentTime < 13.0) {
      isOpen = false;
      statusText = dict.live_closed_now;
      subText = currentLang === 'es' ? 'Abrimos hoy a las 13:00 (solo con reserva previa)' : (currentLang === 'it' ? 'Apriamo oggi a pranzo alle 13:00 (su prenotazione)' : 'Opening today at 1:00 PM (reservation required)');
    } else if (currentTime >= 16.0 && currentTime < 19.0) {
      isOpen = false;
      statusText = currentLang === 'es' ? 'Pausa de tarde' : (currentLang === 'it' ? 'Pausa pomeridiana' : 'Afternoon Break');
      subText = currentLang === 'es' ? 'Reabrimos para la cena a las 19:00' : (currentLang === 'it' ? 'Riapriamo per cena alle 19:00' : 'Reopening for dinner at 7:00 PM');
    } else {
      isOpen = false;
      statusText = dict.live_closed_now;
      subText = currentLang === 'es' ? 'Reabrimos mañana a las 13:00' : (currentLang === 'it' ? 'Riapriamo domani alle 13:00' : 'Reopening tomorrow at 1:00 PM');
    }
  } else if (day === 5 || day === 6) { // Fri - Sat
    if (currentTime >= 13.0 && currentTime < 16.0) {
      isOpen = true;
      statusText = currentLang === 'es' ? 'Abierto Ahora para el Almuerzo' : (currentLang === 'it' ? 'Aperto Adesso per il Pranzo' : 'Open Now for Lunch');
      subText = currentLang === 'es' ? '¡A las 17:00 empieza el Aperitivo Italiano!' : (currentLang === 'it' ? 'Alle 17:00 inizia il Vero Aperitivo Italiano!' : 'Italian Aperitivo starts at 5:00 PM!');
    } else if (currentTime >= 17.0 && currentTime < 21.0) {
      isOpen = true;
      statusText = currentLang === 'es' ? '🍸 ¡Aperitivo Time en curso!' : (currentLang === 'it' ? '🍸 Aperitivo Time in corso!' : '🍸 Aperitivo Time Live!');
      subText = currentLang === 'es' ? 'Spritz, copas y cicchetti incluidos hasta medianoche' : (currentLang === 'it' ? 'Spritz, calici & cicchetti autentici fino a mezzanotte' : 'Spritz, wines & cicchetti served until midnight');
    } else if (currentTime >= 19.0 && currentTime < 24.0) {
      isOpen = true;
      statusText = currentLang === 'es' ? 'Abierto para Cena y Copas' : (currentLang === 'it' ? 'Aperto per Cena & Drink' : 'Open for Dinner & Drinks');
      subText = currentLang === 'es' ? 'Abierto hasta las 00:00' : (currentLang === 'it' ? 'Aperto fino alle 00:00' : 'Open until 12:00 AM');
    } else if (currentTime < 13.0) {
      isOpen = false;
      statusText = dict.live_closed_now;
      subText = currentLang === 'es' ? 'Hoy: 13-16 | Aperitivo 17-21 | Cena hasta las 00:00' : (currentLang === 'it' ? 'Oggi: 13-16 | Aperitivo 17-21 | Cena fino alle 00:00' : 'Today: 1-4 PM | Aperitivo 5-9 PM | Dinner till midnight');
    } else {
      isOpen = false;
      statusText = dict.live_closed_now;
      subText = currentLang === 'es' ? 'Reabrimos mañana' : (currentLang === 'it' ? 'Riapriamo domani' : 'Reopening tomorrow');
    }
  } else if (day === 0) { // Sunday
    if (currentTime >= 13.0 && currentTime < 17.0) {
      isOpen = true;
      statusText = currentLang === 'es' ? 'Abierto para el Almuerzo del Domingo' : (currentLang === 'it' ? 'Aperto per il Pranzo Domenicale' : 'Open for Sunday Lunch');
      subText = currentLang === 'es' ? 'Abierto hasta las 17:00 (Noche cerrado)' : (currentLang === 'it' ? 'Aperto fino alle 17:00 (Domenica sera chiuso)' : 'Open until 5:00 PM (Sunday evening closed)');
    } else {
      isOpen = false;
      statusText = currentLang === 'es' ? 'Cerrado Domingo noche' : (currentLang === 'it' ? 'Chiuso Domenica sera' : 'Closed Sunday evening');
      subText = currentLang === 'es' ? 'Reabrimos el martes a las 13:00' : (currentLang === 'it' ? 'Riapriamo Martedì alle 13:00' : 'Reopening Tuesday at 1:00 PM');
    }
  }

  statusBadges.forEach(badge => {
    const dot = badge.querySelector('.status-dot');
    const textEl = badge.querySelector('.status-text');
    const subTextEl = badge.querySelector('.status-subtext');

    if (dot) {
      dot.className = `status-dot ${isOpen ? 'status-dot-open' : 'status-dot-closed'}`;
    }
    if (textEl) {
      textEl.textContent = statusText;
    }
    if (subTextEl) {
      subTextEl.textContent = subText;
    }
  });
}

/* ==========================================================================
   5. INTERACTIVE MENU TABS & FILTERING
   ========================================================================== */
function initMenuTabsAndFilters() {
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const dietaryChips = document.querySelectorAll('.dietary-filter-chip');
  const menuItems = document.querySelectorAll('.menu-dish-card');

  let activeCategory = 'all';
  let activeFilter = 'all';

  function applyFilters() {
    menuItems.forEach(card => {
      const category = card.getAttribute('data-category');
      const tags = card.getAttribute('data-tags') || '';

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesFilter = (activeFilter === 'all' || tags.includes(activeFilter));

      if (matchesCategory && matchesFilter) {
        card.classList.remove('hidden');
        card.classList.add('flex');
      } else {
        card.classList.add('hidden');
        card.classList.remove('flex');
      }
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active', 'bg-charcoal', 'text-white');
        b.classList.add('bg-white', 'text-gray-700');
      });
      btn.classList.add('active', 'bg-charcoal', 'text-white');
      btn.classList.remove('bg-white', 'text-gray-700');

      activeCategory = btn.getAttribute('data-tab');
      applyFilters();
    });
  });

  dietaryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dietaryChips.forEach(c => {
        c.classList.remove('ring-2', 'ring-tomato', 'bg-red-50', 'text-red-700');
        c.classList.add('bg-stone-100', 'text-stone-600');
      });
      chip.classList.add('ring-2', 'ring-tomato', 'bg-red-50', 'text-red-700');
      chip.classList.remove('bg-stone-100', 'text-stone-600');

      activeFilter = chip.getAttribute('data-filter');
      applyFilters();
    });
  });
}

/* ==========================================================================
   6. RESERVATION SYSTEM & WHATSAPP MESSAGE GENERATOR
   ========================================================================== */
function initReservationSystem() {
  const bookingForm = document.getElementById('reservationForm');
  const modal = document.getElementById('reservationModal');
  const openModalBtns = document.querySelectorAll('.trigger-booking-modal');
  const closeModalBtns = document.querySelectorAll('.close-booking-modal');
  const mealTypeSelect = document.getElementById('bookingMealType');
  const scarcityAlert = document.getElementById('bookingLunchAlert');

  // Trigger modal open
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.remove('hidden-modal');
        document.body.classList.add('overflow-hidden');
      }
    });
  });

  // Trigger modal close
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) {
        modal.classList.add('hidden-modal');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });

  // Close modal on click backdrop
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden-modal');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden-modal')) {
      modal.classList.add('hidden-modal');
      document.body.classList.remove('overflow-hidden');
    }
  });

  // Lunch warning toggle
  if (mealTypeSelect && scarcityAlert) {
    mealTypeSelect.addEventListener('change', () => {
      if (mealTypeSelect.value === 'pranzo') {
        scarcityAlert.classList.remove('hidden');
      } else {
        scarcityAlert.classList.add('hidden');
      }
    });
  }

  // Handle Form Submission (WhatsApp Redirect)
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookingName')?.value.trim() || 'Cliente';
      const guests = document.getElementById('bookingGuests')?.value || '2';
      const date = document.getElementById('bookingDate')?.value || '';
      const time = document.getElementById('bookingTime')?.value || '';
      const meal = document.getElementById('bookingMealType')?.value || 'cena';
      const occasion = document.getElementById('bookingOccasion')?.value || 'Nessuna specifica / Ninguna';
      const notes = document.getElementById('bookingNotes')?.value.trim() || 'Ninguna / Nessuna';

      const dict = i18n[currentLang] || i18n.es;

      let mealLabel = dict.opt_dinner;
      if (meal === 'pranzo') mealLabel = dict.opt_lunch;
      if (meal === 'aperitivo') mealLabel = dict.opt_ape;
      if (meal === 'domenica') mealLabel = dict.opt_sun;

      const message = 
`${dict.wa_prefix}

${dict.wa_name} ${name}
${dict.wa_guests} ${guests}
${dict.wa_date} ${date}
${dict.wa_time} ${time}
${dict.wa_service} ${mealLabel}
${dict.wa_occasion} ${occasion}
${dict.wa_notes} ${notes}

${dict.wa_closing}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${DEFAULT_PHONE_RAW}?text=${encodedMessage}`;

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalContent = submitBtn.innerHTML;
        const redirectingText = currentLang === 'es' ? 'Redirigiendo a WhatsApp...' : (currentLang === 'it' ? 'Reindirizzamento su WhatsApp...' : 'Opening WhatsApp...');
        submitBtn.innerHTML = `<span>${redirectingText}</span> <i class="fa-brands fa-whatsapp text-xl animate-bounce"></i>`;
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
          submitBtn.innerHTML = originalContent;
          if (modal) {
            modal.classList.add('hidden-modal');
            document.body.classList.remove('overflow-hidden');
          }
        }, 500);
      } else {
        window.open(whatsappUrl, '_blank');
      }
    });
  }
}

// Global modal direct trigger function
window.triggerModalWhatsApp = function() {
  const name = document.getElementById('modalName')?.value.trim() || 'Cliente';
  const guests = document.getElementById('modalGuests')?.value || '2';
  const date = document.getElementById('modalDate')?.value || '';
  const time = document.getElementById('modalTime')?.value || '';
  const meal = document.getElementById('modalMeal')?.value || 'Cena';

  const dict = i18n[currentLang] || i18n.es;

  const msg = `${dict.wa_prefix}\n\n${dict.wa_name} ${name}\n${dict.wa_guests} ${guests}\n${dict.wa_date} ${date}\n${dict.wa_time} ${time}\n${dict.wa_service} ${meal}\n\n${dict.wa_closing}`;

  const url = `https://wa.me/${DEFAULT_PHONE_RAW}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  document.getElementById('reservationModal')?.classList.add('hidden-modal');
  document.body.classList.remove('overflow-hidden');
};
