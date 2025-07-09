# 🚀 Astro Microfrontend Boilerplate

Un boilerplate moderno che integra Astro, Next.js, Vue e React utilizzando Web Components per creare microfrontend.

## 🧱 Struttura

```
astro-boilerplate/
├── next-app/          # Applicazione Next.js
│   └── public/        # File statici per i microfrontend
│       ├── vue-microfrontend.js
│       └── react-microfrontend.js
└── astro-app/         # Applicazione Astro
    └── src/           # Codice sorgente Astro
        ├── pages/
        │   └── index.astro
        └── layouts/
            └── Layout.astro
```

## 🚀 Funzionalità

- **Microfrontend Isolati**: Ogni framework (Vue, React, Next.js) è isolato e può essere aggiornato indipendentemente
- **Comunicazione tra Componenti**: I microfrontend comunicano tra loro tramite Custom Events
- **Caricamento Lazy**: Le dipendenze vengono caricate solo quando necessario
- **Supporto TypeScript**: Configurazione TypeScript pronta all'uso

## 🛠️ Come Iniziare

### Prerequisiti

- Node.js 18+
- npm o yarn

### Installazione

1. Clona il repository:
```bash
git clone https://github.com/tuonome/astro-microfrontend-boilerplate.git
cd astro-microfrontend-boilerplate
```

2. Installa le dipendenze per Next.js:
```bash
cd next-app
npm install
```

3. Installa le dipendenze per Astro:
```bash
cd ../astro-app
npm install
```

### Avvio

1. Avvia Next.js (in un terminale):
```bash
cd next-app
npm run dev
```

2. Avvia Astro (in un altro terminale):
```bash
cd astro-app
npm run dev
```

3. Apri il browser all'indirizzo: `http://localhost:4321`

## 🎯 Utilizzo dei Microfrontend

### Vue Microfrontend
```html
<vue-microfrontend></vue-microfrontend>
```

### React Microfrontend
```html
<react-microfrontend></react-microfrontend>
```

### Next.js Microfrontend
```html
<iframe src="http://localhost:3000" width="100%" height="500px"></iframe>
```

## 🔄 Comunicazione tra Microfrontend

I microfrontend comunicano tra loro tramite Custom Events:

```javascript
// Inviare un evento
window.dispatchEvent(new CustomEvent('count-updated', {
  detail: { count: 42, source: 'vue' }
}));

// Ricevere un evento
window.addEventListener('count-updated', (event) => {
  console.log(event.detail);
});
```

## 🛡️ Best Practices

1. **Isolamento**: Ogni microfrontend è completamente isolato
2. **Versionamento**: Aggiorna i microfrontend indipendentemente
3. **Performance**: Usa il caricamento lazy per le dipendenze
4. **Sicurezza**: Implementa CORS e altre misure di sicurezza

## 📝 Note

- I microfrontend sono implementati come Web Components
- La comunicazione avviene tramite Custom Events
- Ogni framework mantiene il proprio stato
- Il caricamento è ottimizzato per le performance

## 📄 Licenza

MIT
