/**
 * deGustibus - Data Service & Real-Time Sync Layer
 * Gestisce l'interazione trasparente con Firebase Firestore o il LocalStorage di fallback.
 */

class RestaurantDB {
  constructor() {
    this.isCloud = false;
    this.auth = null;
    this.firestore = null;
    this.storage = null;
    this.init();
  }

  init() {
    const app = window.initFirebaseApp ? window.initFirebaseApp() : null;
    if (app && typeof firebase !== 'undefined') {
      try {
        this.auth = typeof firebase.auth === 'function' ? firebase.auth() : null;
        this.firestore = typeof firebase.firestore === 'function' ? firebase.firestore() : null;
        this.storage = typeof firebase.storage === 'function' ? firebase.storage() : null;
        this.isCloud = !!this.firestore;
        console.log("RestaurantDB: connesso a Firebase Cloud (isCloud: " + this.isCloud + ")");
      } catch (err) {
        console.warn("RestaurantDB: errore connessione Firebase, fallback a locale:", err);
        this.isCloud = false;
      }
    } else {
      this.isCloud = false;
      console.log("RestaurantDB: operante in modalità Locale (LocalStorage)");
      this.ensureLocalSeed();
    }
  }

  // Assicura che in modalità locale esistano i dati iniziali
  ensureLocalSeed() {
    if (!localStorage.getItem('degustibus_dishes')) {
      const initial = window.INITIAL_RESTAURANT_DATA || { dishes: [], settings: {} };
      localStorage.setItem('degustibus_dishes', JSON.stringify(initial.dishes || []));
      localStorage.setItem('degustibus_settings', JSON.stringify(initial.settings || {}));
    }
  }

  // --- AUTENTICAZIONE ---

  // Controllo dello stato di login
  onAuthStateChanged(callback) {
    if (this.isCloud && this.auth) {
      return this.auth.onAuthStateChanged(callback);
    } else {
      // In modalità locale controlla la sessione locale
      const session = localStorage.getItem('degustibus_admin_session');
      const user = session ? JSON.parse(session) : null;
      callback(user);
      return () => {};
    }
  }

  // Login
  async login(email, password) {
    if (this.isCloud && this.auth) {
      return await this.auth.signInWithEmailAndPassword(email, password);
    } else {
      // Login locale demo (accetta credenziali staff predefinite)
      if ((email === "admin@degustibus.es" || email === "admin") && (password === "degustibus2026" || password === "admin")) {
        const dummyUser = { email: "admin@degustibus.es", uid: "local-admin-1", displayName: "Amministratore deGustibus" };
        localStorage.setItem('degustibus_admin_session', JSON.stringify(dummyUser));
        return { user: dummyUser };
      }
      throw new Error("Credenziali non valide. In modalità demo usa: admin@degustibus.es / degustibus2026");
    }
  }

  // Registrazione nuovo utente staff/admin
  async register(email, password) {
    if (this.isCloud && this.auth) {
      return await this.auth.createUserWithEmailAndPassword(email, password);
    } else {
      const dummyUser = { email: email, uid: "local-admin-new", displayName: "Amministratore deGustibus" };
      localStorage.setItem('degustibus_admin_session', JSON.stringify(dummyUser));
      return { user: dummyUser };
    }
  }

  // Logout
  async logout() {
    if (this.isCloud && this.auth) {
      return await this.auth.signOut();
    } else {
      localStorage.removeItem('degustibus_admin_session');
      return true;
    }
  }

  // --- PIATTI & MENU ---

  // Ascolto in tempo reale dei piatti
  subscribeToDishes(callback) {
    if (this.isCloud && this.firestore) {
      return this.firestore.collection('dishes').onSnapshot((snapshot) => {
        const dishes = [];
        snapshot.forEach(doc => {
          dishes.push({ id: doc.id, ...doc.data() });
        });
        
        // Se il database è vuoto ma abbiamo dati locali, avvisa
        if (dishes.length === 0) {
          const fallback = window.INITIAL_RESTAURANT_DATA ? window.INITIAL_RESTAURANT_DATA.dishes : [];
          callback(fallback, true); // true = needs seed
        } else {
          callback(dishes, false);
        }
      }, (error) => {
        console.error("Errore realtime dishes:", error);
        callback(this.getLocalDishes(), false);
      });
    } else {
      // Modalità locale: invia i piatti e ascolta l'evento storage
      const sendLocal = () => callback(this.getLocalDishes(), false);
      sendLocal();
      window.addEventListener('storage', sendLocal);
      window.addEventListener('degustibus_local_change', sendLocal);
      return () => {
        window.removeEventListener('storage', sendLocal);
        window.removeEventListener('degustibus_local_change', sendLocal);
      };
    }
  }

  getLocalDishes() {
    try {
      const data = localStorage.getItem('degustibus_dishes');
      return data ? JSON.parse(data) : (window.INITIAL_RESTAURANT_DATA ? window.INITIAL_RESTAURANT_DATA.dishes : []);
    } catch (e) {
      return window.INITIAL_RESTAURANT_DATA ? window.INITIAL_RESTAURANT_DATA.dishes : [];
    }
  }

  // Salva o aggiorna un piatto
  async saveDish(dish) {
    if (!dish.id) {
      dish.id = 'dish-' + Date.now();
    }
    dish.updatedAt = new Date().toISOString();

    if (this.isCloud && this.firestore) {
      const docRef = this.firestore.collection('dishes').doc(dish.id);
      await docRef.set(dish, { merge: true });
      return dish;
    } else {
      const dishes = this.getLocalDishes();
      const index = dishes.findIndex(d => d.id === dish.id);
      if (index >= 0) {
        dishes[index] = { ...dishes[index], ...dish };
      } else {
        dishes.unshift(dish);
      }
      localStorage.setItem('degustibus_dishes', JSON.stringify(dishes));
      window.dispatchEvent(new Event('degustibus_local_change'));
      return dish;
    }
  }

  // Cambia disponibilità (In Menu / Esaurito)
  async toggleDishAvailability(dishId, isAvailable) {
    if (this.isCloud && this.firestore) {
      await this.firestore.collection('dishes').doc(dishId).set({
        available: isAvailable,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } else {
      const dishes = this.getLocalDishes();
      const dish = dishes.find(d => d.id === dishId);
      if (dish) {
        dish.available = isAvailable;
        dish.updatedAt = new Date().toISOString();
        localStorage.setItem('degustibus_dishes', JSON.stringify(dishes));
        window.dispatchEvent(new Event('degustibus_local_change'));
      }
    }
  }

  // Elimina un piatto
  async deleteDish(dishId) {
    if (this.isCloud && this.firestore) {
      await this.firestore.collection('dishes').doc(dishId).delete();
    } else {
      let dishes = this.getLocalDishes();
      dishes = dishes.filter(d => d.id !== dishId);
      localStorage.setItem('degustibus_dishes', JSON.stringify(dishes));
      window.dispatchEvent(new Event('degustibus_local_change'));
    }
  }

  // Popolamento iniziale su Cloud (Seed)
  async seedInitialDishes(progressCallback) {
    const initialDishes = window.INITIAL_RESTAURANT_DATA ? window.INITIAL_RESTAURANT_DATA.dishes : [];
    const initialSettings = window.INITIAL_RESTAURANT_DATA ? window.INITIAL_RESTAURANT_DATA.settings : {};

    if (this.isCloud && this.firestore) {
      const batch = this.firestore.batch();
      let count = 0;

      // Salva le impostazioni
      const settingsRef = this.firestore.collection('settings').doc('general');
      batch.set(settingsRef, initialSettings);

      // Salva i piatti
      for (const dish of initialDishes) {
        const dishRef = this.firestore.collection('dishes').doc(dish.id);
        batch.set(dishRef, dish);
        count++;
        if (progressCallback) progressCallback(count, initialDishes.length);
      }

      await batch.commit();
      console.log(`Caricati ${count} piatti su Firestore!`);
      return count;
    } else {
      localStorage.setItem('degustibus_dishes', JSON.stringify(initialDishes));
      localStorage.setItem('degustibus_settings', JSON.stringify(initialSettings));
      window.dispatchEvent(new Event('degustibus_local_change'));
      return initialDishes.length;
    }
  }

  // --- IMPOSTAZIONI, ORARI & BANNER ---

  subscribeToSettings(callback) {
    if (this.isCloud && this.firestore) {
      return this.firestore.collection('settings').doc('general').onSnapshot((doc) => {
        if (doc.exists) {
          callback(doc.data());
        } else {
          callback(this.getLocalSettings());
        }
      }, (err) => {
        console.error("Errore realtime settings:", err);
        callback(this.getLocalSettings());
      });
    } else {
      const send = () => callback(this.getLocalSettings());
      send();
      window.addEventListener('storage', send);
      window.addEventListener('degustibus_local_change', send);
      return () => {
        window.removeEventListener('storage', send);
        window.removeEventListener('degustibus_local_change', send);
      };
    }
  }

  getLocalSettings() {
    try {
      const s = localStorage.getItem('degustibus_settings');
      return s ? JSON.parse(s) : (window.INITIAL_RESTAURANT_DATA ? window.INITIAL_RESTAURANT_DATA.settings : {});
    } catch (e) {
      return window.INITIAL_RESTAURANT_DATA ? window.INITIAL_RESTAURANT_DATA.settings : {};
    }
  }

  async saveSettings(settings) {
    if (this.isCloud && this.firestore) {
      await this.firestore.collection('settings').doc('general').set(settings, { merge: true });
    } else {
      localStorage.setItem('degustibus_settings', JSON.stringify(settings));
      window.dispatchEvent(new Event('degustibus_local_change'));
    }
    return settings;
  }

  // --- CARICAMENTO IMMAGINI (FIREBASE STORAGE / BASE64 FALLBACK) ---

  async uploadImage(file, path = 'dishes') {
    if (this.isCloud && this.storage) {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `${path}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const ref = this.storage.ref().child(fileName);
      const snapshot = await ref.put(file);
      const downloadUrl = await snapshot.ref.getDownloadURL();
      return downloadUrl;
    } else {
      // In modalità locale converte in Base64 (dataURL) compresso per salvataggio immediato
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  }
}

// Istanza globale del servizio database
window.restaurantDB = new RestaurantDB();
