# Javascript 2 miniproject 3 — Elli & Dany

**Nic Cage favorite snacks** — skolprojekt i Javascript 2 (MP3) av Eleonora Nocentini & Danyeal Mateen.

Webbshop med produkter från Firebase Realtime Database, kundvagn i `localStorage` och kassa som uppdaterar lagret.

## Live (Netlify)

<https://js2-mp3-elli-dany.netlify.app>

## Tidigare version

Originalet från första inlämningen finns i `legacy/original-2023/` och via git-taggen `v1.0-original-school`.

```bash
npm run legacy:original   # http://localhost:5174
```

Se [VERSIONS.md](./VERSIONS.md).

## Utveckling

```bash
npm install
npm run dev
```

- Shop: `/`
- Kundvagn: `/cart.html`

## Build

```bash
npm run build
npm run preview
```

## Automatisk deploy (Netlify)

Vid push till `main` körs [`.github/workflows/netlify-deploy.yml`](.github/workflows/netlify-deploy.yml).

Engångsinställning i GitHub → **Settings → Secrets and variables → Actions**:

| Secret | Värde |
|--------|--------|
| `NETLIFY_SITE_ID` | `3a45362a-d407-423d-8737-287d74a95c91` |
| `NETLIFY_AUTH_TOKEN` | Skapa under [Netlify → User settings → Applications](https://app.netlify.com/user/applications) |
| `VITE_FIREBASE_URL` | (valfritt) Ny databas-URL om du byter Firebase-projekt |

Alternativt: koppla repot direkt i [Netlify → js2-mp3-elli-dany → Link repository](https://app.netlify.com/projects/js2-mp3-elli-dany/link).

## Firebase

Appen använder **Firebase Realtime Database** via REST (samma URL som i originalet), inte Firebase SDK.

- URL i kod: `src/lib/constants.js` (miljövariabel `VITE_FIREBASE_URL` om satt)
- Originalet pekade på `della-311b1-default-rtdb` — den databasen är **inaktiverad** hos Firebase just nu, så shoppen visar anslutningsfel tills du:
  1. **Återaktiverar** databasen i [Firebase Console](https://console.firebase.google.com/), eller
  2. Skapar ett **nytt** Realtime Database-projekt, lägger in produktdata (samma struktur som tidigare) och sätter `VITE_FIREBASE_URL` i Netlify + GitHub secrets.

Jag har **inte** skapat ett nytt Firebase-projekt åt dig — det kräver ditt Google-/skolkonto.

## Medverkande

**Elli** (Eleonora Nocentini) & **Dany** (Danyeal Mateen)
