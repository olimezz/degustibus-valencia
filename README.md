# deGustibus - Ristorante y Bar (L'Eixample, València)
> Sitio Web Oficial de Alta Conversión · Arquitectura UI/UX & Copywriting Persuasivo

---

## 📌 Datos de Contacto y Configuración Oficial
* **Restaurante**: deGustibus (Ristorante y Bar)
* **Tagline**: *"Viaje de sabores por Italia"*
* **Dirección**: Carrer de Borriana, 25, L'Eixample, 46005 València (España)
* **Teléfono Oficial**: `+34 629 09 92 95` (Enlace directo: `tel:+34629099295`)
* **WhatsApp Oficial**: `34629099295` (Enlace directo: `https://wa.me/34629099295`)
* **Instagram**: [@degustibus.valencia](https://www.instagram.com/degustibus.valencia)

---

## 🌍 Sistema Multilingüe Integrado (ES / IT / EN)
El sitio está configurado en **Español (ES)** como idioma principal por defecto, respetando la localización en Valencia, y cuenta con un conmutador rápido de 1 clic en la barra superior, cabecera y menú móvil:
* 🇪🇸 **Español (Predeterminado)**: Optimizado para el público local de Valencia y residentes de L'Eixample.
* 🇮🇹 **Italiano**: Para la comunidad italiana, expatriados y amantes de la gastronomía regional original.
* 🇬🇧 **English**: Para turistas gourmet internacionales y visitantes de Valencia.

El sistema almacena la preferencia en `localStorage`, traduciendo instantáneamente todos los titulares, textos de cartas, estados de apertura y formateando los mensajes de WhatsApp en el idioma seleccionado.

---

## 🚀 Puntos de Conversión Implementados
1. **Regla de Mediodía (Escasez Virtuosa)**:
   - Aviso prominente: *"El servicio de mediodía está activo EXCLUSIVAMENTE con reserva previa"*, que transmite frescura absoluta y elaboración al minuto.
2. **Generador de Reservas WhatsApp**:
   - Formulario interactivo que recopila comensales, fecha, hora, tipo de servicio y notas, generando el mensaje listo para enviar en 1 clic.
3. **Calculador de Horario en Vivo (Live Status)**:
   - Detecta automáticamente el día y la hora de Valencia, mostrando si el restaurante está abierto para comer, en pausa de tarde, en pleno *Aperitivo Time* o en servicio de cena.
4. **Especial Aperitivo Italiano (Viernes y Sábados 17:00 – 21:00)**:
   - Módulo destacado dedicado a la fórmula Spritz + selección de cicchetti calientes incluidos.
5. **Barra Flotante Móvil**:
   - Botones fijos inferiores en smartphones para WhatsApp, Llamada directa y Apertura del modal de reserva.

---

## 📁 Estructura del Proyecto
```
degustibus-valencia/
│
├── index.html                   # Documento principal accesible y responsive
├── README.md                    # Documentación y datos de contacto
└── assets/
    ├── css/
    │   └── style.css            # Design System, variables de marca y animaciones
    ├── js/
    │   └── main.js              # Motor i18n (ES/IT/EN), horarios y WhatsApp
    └── images/
        └── degustibus-logo.jpg  # Logotipo oficial
```
