# Gutendex Bokapplikasjon

En moderne React-applikasjon som bruker Gutendex API for å vise, søke og administrere en digital boksamling.

## Funksjoner

### Hovedfunksjoner
- **Søkefunksjon**: Søk etter bøker i Gutendex-databasen med sanntidsresultater
- **Kategorier**: Bla gjennom 13 forskjellige bokkategorier:
  - Fiction, Mystery, Thriller, Romance, Fantasy
  - Morality, Society, Power, Justice, Adventure
  - Tragedy, War, Philosophy
- **Paginering**: Naviger gjennom store resultatsett med neste/forrige-knapper
- **Bokdetaljer**: Detaljert visning av hver bok med:
  - Coverbilde
  - Forfatterinformasjon
  - Nedlastningsstatistikk
  - Kategorier og emner
  - Språk
  - Lenker til digitale formater (HTML, EPUB, Plain Text)
- **Favoritter**: Lagre og administrer favorittbøker med localStorage
- **Responsiv design**: Fungerer perfekt på desktop, tablet og mobil

## Teknologier

- **React 18.3** - UI-bibliotek
- **React Router 6.22** - Routing med `createBrowserRouter`
- **Vite 5.2** - Build-verktøy og utviklingsserver
- **Gutendex API** - Bokdata fra Project Gutenberg

## Kom i gang

### Installasjon

1. Klon prosjektet
2. Installer avhengigheter:
   ```bash
   npm install
   ```

### Kjør utviklingsserver

```bash
npm run dev
```

Applikasjonen vil være tilgjengelig på `http://localhost:5173/`

### Bygg for produksjon

```bash
npm run build
```

### Forhåndsvis produksjonsbygg

```bash
npm run preview
```

## Prosjektstruktur

```
Gutendex/
├── src/
│   ├── components/         # Gjenbrukbare komponenter
│   │   ├── Header.jsx      # Navigasjon og søk
│   │   ├── BookCard.jsx    # Bokvisningskort
│   │   ├── BookGrid.jsx    # Grid-layout for bøker
│   │   └── Pagination.jsx  # Paginering
│   ├── pages/              # Side-komponenter
│   │   ├── Home.jsx        # Hjemmeside
│   │   ├── SearchPage.jsx  # Søkeresultater
│   │   ├── CategoryPage.jsx # Kategoriside
│   │   ├── BookDetails.jsx  # Bokdetaljer
│   │   └── Favorites.jsx    # Favoritter
│   ├── services/           # API-tjenester
│   │   └── api.js          # Gutendex API-kall
│   ├── utils/              # Hjelpefunksjoner
│   │   └── favorites.js    # Favorittadministrasjon
│   ├── App.jsx             # Hovedapp med routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styling
├── index.html
├── package.json
└── vite.config.js
```

## API-integrasjon

Applikasjonen bruker [Gutendex API](https://gutendex.com/) for å hente bokdata:

- **Søk**: `GET /books?search={query}`
- **Kategorier**: `GET /books?topic={category}`
- **Paginering**: `GET /books?page={number}`
- **Detaljer**: `GET /books/{id}`

## Funksjoner i detalj

### Routing
Bruker `createBrowserRouter` fra react-router-dom med følgende ruter:
- `/` - Hjemmeside med populære bøker
- `/search?q={query}` - Søkeresultater
- `/category/{category}` - Kategoriside
- `/book/{id}` - Bokdetaljer
- `/favorites` - Favorittbøker

### State Management
- Lokal React state for komponentdata
- localStorage for persistering av favoritter
- Loading og error states for alle API-kall

### Responsive Design
- Mobile-first tilnærming
- Flexbox og CSS Grid
- Hamburger-meny for mobil
- Tilpassede layouts for forskjellige skjermstørrelser

## Fremtidige forbedringer

- [ ] Sorteringsalternativer (populære, nyeste, alfabetisk)
- [ ] Avansert filtrering (språk, forfatter, publiseringsår)
- [ ] Leseliste-funksjonalitet
- [ ] Delingsalternativer for sosiale medier
- [ ] Bokmerker for nedlastede bøker
- [ ] Mørk modus

## Lisens

Dette prosjektet er laget som en læringsoppgave for Kodehode.

## Ressurser

- [Gutendex API Dokumentasjon](https://gutendex.com/)
- [React Dokumentasjon](https://react.dev/)
- [React Router Dokumentasjon](https://reactrouter.com/)
- [Vite Dokumentasjon](https://vitejs.dev/)
