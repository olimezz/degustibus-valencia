/**
 * deGustibus - Ristorante y Bar (Valencia)
 * Main Interactive Engine & Multi-Language System (ES / IT / EN)
 * 5 Distinct Sections, Editorial Typographic Menu & Unified Brand Design
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
  initMenuCategoryTabs();
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
      header.classList.remove('py-2.5', 'sm:py-3.5');
    } else {
      header.classList.remove('glass-nav-scrolled', 'py-2');
      header.classList.add('py-2.5', 'sm:py-3.5');
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
   3. MULTI-LANGUAGE ENGINE (ES / IT / EN) - 5 SEZIONI
   ========================================================================== */
const i18n = {
  es: {
    // Header & Bars
    scarcity_banner: "El servicio de mediodía está activo <strong>EXCLUSIVAMENTE con reserva previa</strong>.",
    aperitivo_tag_top: "Aperitivo Vie & Sáb: 17:00 – 21:00",
    
    // 5 Sezioni Navigazione
    nav_chi_siamo: "Quiénes Somos",
    nav_menu: "Carta",
    nav_prenotazioni: "Reservas WhatsApp",
    nav_social: "Social",
    nav_recensioni_galleria: "Reseñas y Galería",
    nav_book: "Reservar Mesa",
    live_open_now: "Abierto Ahora",
    live_closed_now: "Cerrado Ahora",

    // Hero
    hero_badge: "Restaurante italiano auténtico en L'Eixample · 4.8★",
    hero_title_prefix: "La auténtica Italia en el corazón de ",
    hero_title_highlight: "L'Eixample",
    hero_title_suffix: ": cierra los ojos y saborea.",
    hero_sub: "Pasta fresca mantecata al momento, pizzas artesanales de masa lenta (72h) y el rito del aperitivo italiano en Valencia.",
    hero_lunch_title: "Aviso importante para el servicio de mediodía:",
    hero_lunch_desc: "El servicio de mediodía está disponible <strong class=\"underline decoration-neutral-800 decoration-2\">EXCLUSIVAMENTE con reserva previa</strong> para garantizar la frescura artesanal de cada plato.",
    hero_cta_book: "Reservar por WhatsApp",
    hero_cta_menu: "Ver la Carta Completa",
    trust_1: "Recetas 100% tradicionales",
    trust_2: "Masa de pizza lenta 72h",
    trust_3: "Cocinero italiano al frente (Piero)",

    // Sezione 1: Chi Siamo
    about_tag: "Viaje de sabores por Italia",
    about_title: "Quiénes Somos: La cocina italiana tradicional sin concesiones.",
    about_sub: "En Carrer de Borriana, 25 (L'Eixample), deGustibus nace del amor por la cocina de la nonna italiana: ingredientes honestos, pastas hechas al minuto y trato familiar con el chef Piero.",
    about_p1_t: "01. Mantecatura Expresa",
    about_p1_d: "Cada ración se liga al momento en la sartén para lograr una emulsión cremosa y sedosa sin natas ni artificios.",
    about_p2_t: "02. Fermentación Lenta 72h",
    about_p2_d: "Masa de pizza artesanal con 72 horas de maduración para una digestibilidad y ligereza incomparables.",
    about_p3_t: "03. Materias Primas Seleccionadas",
    about_p3_d: "Guanciale curado, Pecorino Romano, trufa fragante, tomate San Marzano y quesos tradicionales italianos.",
    about_p4_t: "04. Convivialidad y Vinilos",
    about_p4_d: "Un bistrot íntimo con lámparas de diseño cálidas, música en tocadiscos y la hospitalidad más genuina de Italia.",
    about_quote: "\"No hemos inventado la pasta italiana. Simplemente elegimos respetarla como nos enseñaron en casa, trayendo a Valencia los sabores sinceros de una auténtica trattoria.\"",
    about_chef: "— Piero y la brigada de deGustibus · Carrer de Borriana, 25",

    // Sezione 2: Menu
    menu_tag: "Carta Oficial",
    menu_title: "Nuestra Carta Gastronómica",
    menu_sub: "Consulta los platos y bebidas elaborados al momento. Cada producto muestra nombre, precio exacto e indicación de alérgenos.",
    menu_cat_1: "1. Entrante, Primeros Platos y Menú Infantil",
    menu_cat_2: "2. Pizza y Postres Caseros",
    menu_cat_3: "3. Cafetería, Licores y Cocktail",
    menu_cat_4: "4. Bebidas",
    menu_cat_all: "Ver Toda la Carta",
    allergen_notice: "<strong>Información de Alérgenos:</strong> Consulta con nuestro personal para cualquier intolerancia alimentaria.",

    // Sezione 3: Prenotazione WhatsApp
    booking_tag: "Reserva Inmediata",
    booking_title: "Reserva tu Mesa por WhatsApp",
    booking_sub: "Envía los datos de tu reserva en 1 clic al +34 629 09 92 95. Te confirmamos disponibilidad al instante.",
    booking_lunch_warn: "⚠️ Recordamos que el servicio de mediodía está activo <strong>exclusivamente con reserva previa</strong>.",
    btn_submit_wa: "Enviar Solicitud por WhatsApp",
    btn_call_direct: "Llamar al +34 629 09 92 95",

    // Sezione 4: Social
    social_tag: "Canales Oficiales",
    social_title: "Síguenos en Instagram & TikTok",
    social_sub: "Mantecaturas en directo, ambiente de sala con música vinilo y detrás de los fogones con el chef Piero.",
    btn_open_ig: "Instagram @degustibus.valencia",
    btn_open_tiktok: "TikTok @degustibusvalencia",

    // Sezione 5: Recensioni & Galleria
    reviews_tag: "Opiniones Reales & Galería",
    reviews_title: "Recensioni & Galleria",
    reviews_sub: "Reseñas reales de clientes verificados en Google y TripAdvisor, junto a fotos auténticas de nuestro local y platos en L'Eixample.",
    rev_rating: "4.8 / 5 en Google Reviews & TripAdvisor",
    gallery_tag: "Fotografías Reales del Restaurante",
    gallery_sub: "Imágenes reales de nuestros platos caseros y del ambiente cálido en Carrer de Borriana, 25.",

    // Footer
    footer_desc: "\"Viaje de sabores por Italia\": restaurante y bar italiano en Carrer de Borriana, 25 (L'Eixample, Valencia). Autenticidad, masa lenta y trato cercano.",
    footer_hours_title: "Horarios de Servicio",
    footer_contact_title: "Contacto y Ubicación",

    // WhatsApp Message
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
    
    // 5 Sezioni Navigazione
    nav_chi_siamo: "Chi Siamo",
    nav_menu: "Menu",
    nav_prenotazioni: "Prenotazione WhatsApp",
    nav_social: "Social",
    nav_recensioni_galleria: "Recensioni & Galleria",
    nav_book: "Prenota Tavolo",
    live_open_now: "Aperto Adesso",
    live_closed_now: "Chiuso al momento",

    // Hero
    hero_badge: "Ristorante italiano autentico a L'Eixample · 4.8★",
    hero_title_prefix: "L'Italia autentica nel cuore de ",
    hero_title_highlight: "L'Eixample",
    hero_title_suffix: ": chiudi gli occhi e gusta.",
    hero_sub: "Pasta fresca mantecata al momento, pizze artigianali a lenta lievitazione (72h) e il rito dell'autentico aperitivo italiano a Valencia.",
    hero_lunch_title: "Avviso importante per il servizio di mezzogiorno:",
    hero_lunch_desc: "Il servizio di mezzogiorno è attivo <strong class=\"underline decoration-neutral-800 decoration-2\">ESCLUSIVAMENTE previa prenotazione</strong> per garantire la freschezza e la cura artigianale di ogni pietanza.",
    hero_cta_book: "Prenota su WhatsApp",
    hero_cta_menu: "Scopri il Menù Completo",
    trust_1: "Ricette originali al 100%",
    trust_2: "Impasto pizza a lenta maturazione 72h",
    trust_3: "Cuoco italiano al timone (Piero)",

    // Sezione 1: Chi Siamo
    about_tag: "Viaje de sabores por Italia",
    about_title: "Chi Siamo: La vera cucina italiana tradizionale senza compromessi.",
    about_sub: "In Carrer de Borriana, 25 (L'Eixample), deGustibus nasce dalla passione per la cucina casalinga della nonna: ingredienti sinceri, paste spadellate al minuto e l'accoglienza calorosa dello chef Piero.",
    about_p1_t: "01. Mantecatura Espressa",
    about_p1_d: "Ogni singola porzione viene spadellata a vista con l'acqua ricca di amido per un'emulsione setosa e vellutata al palato senza panna né scorciatoie.",
    about_p2_t: "02. Lenta Lievitazione 72 Ore",
    about_p2_d: "Impasto artigianale a lunga maturazione per pizze incredibilmente leggere, croccanti e digeribili.",
    about_p3_t: "03. Materie Prime Selezionate",
    about_p3_d: "Guanciale stagionato, Pecorino Romano, tartufo aromatico, pomodoro San Marzano e formaggi italiani di prima scelta.",
    about_p4_t: "04. Convivialità & Vinili",
    about_p4_d: "Un bistrot raccolto e intimo con lampade calde di design, musica d'atmosfera al giradischi e ospitalità autentica.",
    about_quote: "\"Non abbiamo inventato la pasta italiana. Abbiamo semplicemente scelto di rispettarla come si faceva una volta in famiglia, portando a Valencia i sapori sinceri di una vera osteria di casa.\"",
    about_chef: "— Piero e la brigata di deGustibus · Carrer de Borriana, 25",

    // Sezione 2: Menu
    menu_tag: "Carta Ufficiale",
    menu_title: "Il Nostro Menù Gastronomico",
    menu_sub: "Consulta le pietanze e bevande preparate al momento. Ciascun prodotto riporta esclusivamente nome, prezzo esatto e indicazione allergeni.",
    menu_cat_1: "1. Entrante, Primeros Platos y Menú Infantil",
    menu_cat_2: "2. Pizza y Postres Caseros",
    menu_cat_3: "3. Cafetería, Licores y Cocktail",
    menu_cat_4: "4. Bebidas",
    menu_cat_all: "Tutto il Menù",
    allergen_notice: "<strong>Nota Allergeni:</strong> Il nostro staff è a disposizione per intolleranze alimentari o informazioni sugli ingredienti.",

    // Sezione 3: Prenotazione WhatsApp
    booking_tag: "Prenotazione Immediata",
    booking_title: "Prenota il tuo Tavolo su WhatsApp",
    booking_sub: "Invia i dettagli della tua prenotazione con 1 clic al +34 629 09 92 95. Conferma tempestiva della disponibilità.",
    booking_lunch_warn: "⚠️ Ricordiamo che a mezzogiorno lavoriamo <strong>esclusivamente previa prenotazione</strong>.",
    btn_submit_wa: "Invia Richiesta su WhatsApp",
    btn_call_direct: "Chiama al +34 629 09 92 95",

    // Sezione 4: Social
    social_tag: "Canali Ufficiali",
    social_title: "Seguici su Instagram & TikTok",
    social_sub: "Spadellate in diretta, atmosfera in sala con vinili e dietro le quinte in cucina con lo chef Piero.",
    btn_open_ig: "Instagram @degustibus.valencia",
    btn_open_tiktok: "TikTok @degustibusvalencia",

    // Sezione 5: Recensioni & Galleria
    reviews_tag: "Recensioni Reali & Galleria",
    reviews_title: "Recensioni & Galleria",
    reviews_sub: "Recensioni reali ed estratte da clienti su Google e TripAdvisor, affiancate dalle foto autentiche del locale e dei piatti a Valencia.",
    rev_rating: "4.8 / 5 su Google Reviews & TripAdvisor",
    gallery_tag: "Galleria Fotografica Reale",
    gallery_sub: "Foto 100% reali dei piatti serviti e dell'atmosfera in Carrer de Borriana, 25.",

    // Footer
    footer_desc: "\"Viaje de sabores por Italia\": ristorante e bar italiano a Carrer de Borriana, 25 (L'Eixample, Valencia). Cucina artigianale, lievitazione lenta e calorosa ospitalità.",
    footer_hours_title: "Orari di Servizio",
    footer_contact_title: "Contatti e Posizione",

    // WhatsApp Message
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
    
    // 5 Sezioni Navigazione
    nav_chi_siamo: "About Us",
    nav_menu: "Menu",
    nav_prenotazioni: "WhatsApp Booking",
    nav_social: "Social",
    nav_recensioni_galleria: "Reviews & Gallery",
    nav_book: "Book a Table",
    live_open_now: "Open Now",
    live_closed_now: "Currently Closed",

    // Hero
    hero_badge: "Authentic Italian Bistro in L'Eixample · 4.8★",
    hero_title_prefix: "Authentic Italy in the heart of ",
    hero_title_highlight: "L'Eixample",
    hero_title_suffix: ": close your eyes and savor.",
    hero_sub: "Fresh pasta tossed live to order, 72-hour slow fermented pizzas, and genuine Italian hospitality in Valencia.",
    hero_lunch_title: "Important note for daytime lunch service:",
    hero_lunch_desc: "Lunch service is open <strong class=\"underline decoration-neutral-800 decoration-2\">EXCLUSIVELY upon advance booking</strong> to ensure unmatched freshness and handcrafted care.",
    hero_cta_book: "Book via WhatsApp",
    hero_cta_menu: "Explore Full Menu",
    trust_1: "100% Traditional Recipes",
    trust_2: "72h Slow Fermented Dough",
    trust_3: "Italian Chef at the Helm (Piero)",

    // Sezione 1: Chi Siamo
    about_tag: "A culinary journey through Italy",
    about_title: "About Us: Traditional Italian Cuisine Without Compromises.",
    about_sub: "Located on Carrer de Borriana, 25 (L'Eixample), deGustibus was founded on heartfelt Italian trattoria traditions: honest ingredients, made-to-order dishes and warm hospitality with chef Piero.",
    about_p1_t: "01. Live Skillet Emulsion",
    about_p1_d: "Each pasta portion is tossed live in the skillet with starch-rich pasta water for a silky, rich emulsion without commercial creams.",
    about_p2_t: "02. 72-Hour Slow Fermentation",
    about_p2_d: "Handcrafted dough aged 72 hours for incomparable lightness, crisp crust and easy digestion.",
    about_p3_t: "03. Selected Italian Ingredients",
    about_p3_d: "Cured Guanciale, black-rind Pecorino Romano, aromatic truffle, San Marzano tomatoes, and artisanal cheeses.",
    about_p4_t: "04. Convivial Ambience & Vinyls",
    about_p4_d: "An intimate bistro with warm designer lamps, turntable vinyl music, and genuine Italian welcoming spirit.",
    about_quote: "\"We did not invent Italian pasta. We simply chose to honor it without shortcuts, bringing to Valencia the authentic flavors of an Italian family trattoria.\"",
    about_chef: "— Piero & the deGustibus Brigade · Carrer de Borriana, 25",

    // Sezione 2: Menu
    menu_tag: "Official Menu",
    menu_title: "Our Gastronomic Menu",
    menu_sub: "Explore dishes and drinks crafted to order. Each item presents exclusively product name, exact price, and dedicated allergen information.",
    menu_cat_1: "1. Entrante, Primeros Platos y Menú Infantil",
    menu_cat_2: "2. Pizza y Postres Caseros",
    menu_cat_3: "3. Cafetería, Licores y Cocktail",
    menu_cat_4: "4. Bebidas",
    menu_cat_all: "View Full Menu",
    allergen_notice: "<strong>Allergen Notice:</strong> Please inform our team of any dietary requirements or food intolerances.",

    // Sezione 3: Prenotazione WhatsApp
    booking_tag: "Instant Reservation",
    booking_title: "Book Your Table on WhatsApp",
    booking_sub: "Send your reservation details in 1 click to +34 629 09 92 95. Quick availability confirmation.",
    booking_lunch_warn: "⚠️ Please note lunch service is active <strong>strictly upon reservation</strong>.",
    btn_submit_wa: "Send WhatsApp Reservation",
    btn_call_direct: "Call +34 629 09 92 95",

    // Sezione 4: Social
    social_tag: "Official Socials",
    social_title: "Follow Us on Instagram & TikTok",
    social_sub: "Daily pasta tossing, specials, vinyl dining atmosphere and kitchen moments with chef Piero.",
    btn_open_ig: "Instagram @degustibus.valencia",
    btn_open_tiktok: "TikTok @degustibusvalencia",

    // Sezione 5: Recensioni & Galleria
    reviews_tag: "Real Reviews & Gallery",
    reviews_title: "Reviews & Gallery",
    reviews_sub: "Genuine reviews from verified guests on Google and TripAdvisor, paired with authentic photographs of our venue and dishes.",
    rev_rating: "4.8 / 5 on Google Reviews & TripAdvisor",
    gallery_tag: "Real Restaurant Gallery",
    gallery_sub: "Authentic photographs of our handcrafted dishes and cozy atmosphere at Carrer de Borriana 25.",

    // Footer
    footer_desc: "\"Viaje de sabores por Italia\": Italian restaurant and bar on Carrer de Borriana, 25 (L'Eixample, Valencia). Artisanal pasta, slow-rise dough, and warm hospitality.",
    footer_hours_title: "Opening Hours",
    footer_contact_title: "Contact & Location",

    // WhatsApp Message
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
      initOpeningHoursStatus();
    });
  });
}

function updateLanguageSwitcherUI(lang) {
  document.querySelectorAll('.lang-switcher-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.className = "lang-switcher-btn px-2.5 py-1 rounded-full text-xs font-bold transition-all bg-neutral-900 text-white shadow-sm border border-neutral-700";
    } else {
      btn.className = "lang-switcher-btn px-2.5 py-1 rounded-full text-xs transition-all text-neutral-400 hover:text-white border border-transparent";
    }
  });

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
}

/* ==========================================================================
   4. REAL-TIME RESTAURANT OPEN/CLOSED CALCULATOR
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
      subText = currentLang === 'es' ? 'Spritz y bocados incluidos · Cena hasta medianoche' : (currentLang === 'it' ? 'Spritz & bocconi autentici · Cena fino a mezzanotte' : 'Spritz & bites served · Dinner till midnight');
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
   5. MENU CATEGORY TABS (Minimal & Unified Brand Palette)
   ========================================================================== */
function initMenuCategoryTabs() {
  const tabs = document.querySelectorAll('.menu-category-btn');
  const sections = document.querySelectorAll('.menu-category-section');

  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCat = tab.getAttribute('data-category');

      tabs.forEach(t => {
        t.classList.remove('active');
      });
      tab.classList.add('active');

      sections.forEach(sec => {
        const secCat = sec.getAttribute('data-section-cat');
        if (targetCat === 'all' || secCat === targetCat) {
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. WHATSAPP RESERVATION SYSTEM
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
      if (mealTypeSelect.value === 'pranzo' || mealTypeSelect.value === 'almuerzo') {
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

      const message = 
`${dict.wa_prefix}

${dict.wa_name} ${name}
${dict.wa_guests} ${guests}
${dict.wa_date} ${date}
${dict.wa_time} ${time}
${dict.wa_service} ${meal}
${dict.wa_occasion} ${occasion}
${dict.wa_notes} ${notes}

${dict.wa_closing}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${DEFAULT_PHONE_RAW}?text=${encodedMessage}`;

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalContent = submitBtn.innerHTML;
        const redirectingText = currentLang === 'es' ? 'Abriendo WhatsApp...' : (currentLang === 'it' ? 'Apertura WhatsApp...' : 'Opening WhatsApp...');
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
