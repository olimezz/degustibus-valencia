/**
 * deGustibus - Configurazione e Connessione Firebase
 * 
 * ISTRUZIONI:
 * 1. Crea un progetto gratuito su https://console.firebase.google.com/
 * 2. Attiva:
 *    - Autenticazione (Email/Password)
 *    - Cloud Firestore (database in modalità test o produzione)
 *    - Cloud Storage (per caricare le foto dei piatti)
 * 3. Copia i parametri della tua Web App Firebase e incollali qui sotto
 *    (oppure inseriscili direttamente dal pannello admin.html).
 */

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "degustibus-valencia.firebaseapp.com",
  projectId: "degustibus-valencia",
  storageBucket: "degustibus-valencia.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Controlla se l'utente ha salvato una configurazione personalizzata nel browser
function getActiveFirebaseConfig() {
  const saved = localStorage.getItem('degustibus_firebase_config');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.warn("Configurazione Firebase salvata non valida:", e);
    }
  }
  return DEFAULT_FIREBASE_CONFIG;
}

window.FIREBASE_CONFIG = getActiveFirebaseConfig();

// Determina se Firebase è effettivamente configurato con chiavi reali
window.isFirebaseConfigured = function() {
  const cfg = window.FIREBASE_CONFIG;
  return cfg && 
         cfg.apiKey && 
         cfg.apiKey !== "YOUR_API_KEY" && 
         cfg.projectId && 
         cfg.projectId !== "YOUR_PROJECT_ID";
};

// Inizializzazione Firebase se disponibile
window.initFirebaseApp = function() {
  if (typeof firebase === 'undefined') {
    console.warn("SDK Firebase non caricato.");
    return null;
  }

  if (!window.isFirebaseConfigured()) {
    console.info("ℹ️ Firebase non configurato: il gestionale funzionerà in Modalità Locale (Demo/Offline).");
    return null;
  }

  try {
    if (!firebase.apps.length) {
      const app = firebase.initializeApp(window.FIREBASE_CONFIG);
      console.log("🔥 Firebase inizializzato con successo!");
      return app;
    }
    return firebase.app();
  } catch (error) {
    console.error("Errore durante l'inizializzazione di Firebase:", error);
    return null;
  }
};
