# 🚀 Guida di Configurazione Firebase per deGustibus

Il gestionale (`admin.html`) è già pronto e funzionante:
- **Subito attivo in Modalità Demo Locale**: puoi testarlo immediatamente aprendo `admin.html` nel browser usando:
  - **Email**: `admin@degustibus.es`
  - **Password**: `degustibus2026`
- **Per collegarlo al Cloud in Tempo Reale** (in modo che le modifiche effettuate dal ristoratore si riflettano istantaneamente sugli smartphone di tutti i clienti ai tavoli), segui questi 4 semplici passaggi (richiedono meno di 5 minuti).

---

### Passo 1: Crea il progetto Firebase gratuito
1. Vai su [console.firebase.google.com](https://console.firebase.google.com/) ed esegui l'accesso con un account Google.
2. Clicca su **"Aggiungi progetto"** (o "Add Project").
3. Inserisci il nome del progetto (es. `degustibus-valencia`) e procedi. (Puoi disabilitare Google Analytics se desideri un setup più rapido).

---

### Passo 2: Attiva l'Autenticazione (Email / Password)
1. Dal menu laterale a sinistra, clicca su **Build** > **Authentication**.
2. Clicca su **"Inizia"** (Get Started).
3. Nella scheda **Sign-in method**, seleziona **Email/Password**.
4. Abilita la prima spunta (Email/Password) e clicca su **Salva**.
5. Vai nella scheda **Users** e clicca su **"Aggiungi utente"** per creare l'account del ristoratore:
   - Inserisci l'email scelta (es. `admin@degustibus.es`) e una password sicura.

---

### Passo 3: Attiva Cloud Firestore & Storage
1. Dal menu a sinistra, clicca su **Build** > **Firestore Database**.
2. Clicca su **"Crea database"**.
3. Scegli la località (es. `eur3` / `europe-west` per la massima velocità in Spagna/Europa).
4. Avvia in **modalità test** (Test mode) per poter iniziare subito.
5. *(Opzionale)* Clicca su **Build** > **Storage** e premi **Inizia** se desideri caricare foto scattate con lo smartphone.

---

### Passo 4: Ottieni le credenziali e collegale
1. Clicca sull'icona dell'ingranaggio ⚙️ accanto a **Panoramica progetto** > **Impostazioni progetto**.
2. Nella scheda *Generale*, scorri fino alla sezione **Le tue app** e clicca sull'icona Web (`</>`).
3. Registra l'app (es. `deGustibus Web`) e copia l'oggetto `firebaseConfig` che contiene:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "degustibus-valencia.firebaseapp.com",
     projectId: "degustibus-valencia",
     storageBucket: "degustibus-valencia.appspot.com",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
4. **Due modi semplicissimi per collegarlo:**
   - **Metodo A (Senza toccare codice)**: Apri `admin.html` nel browser, accedi con le credenziali demo, clicca sul link **`[Config]`** in alto accanto al titolo e incolla i valori nei campi.
   - **Metodo B**: Incolla i valori nel file `assets/js/firebase-config.js`.

---

### Passo 5: Popola il database con 1 Click!
Appena effettuato l'accesso all'admin con Firebase collegato, vedrai un banner giallo in cima:
> *"Il tuo database è attualmente vuoto. Vuoi caricare subito tutti i 61 piatti originali di deGustibus con 1 click?"*

Clicca su **"Carica i 61 Piatti Adesso"** e l'intero menù (antipasti, primi, pizze, dolci, bevande) verrà salvato automaticamente su Firestore!
