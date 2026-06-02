# Nic Cage Snacks Shop

**Nic Cage favorite snacks** — a Firebase-backed web shop by Eleonora Nocentini & Danyeal Mateen.

Products load from Firebase Realtime Database; the cart uses `localStorage`, and checkout updates inventory.

## Live (Netlify)

<https://nic-cage-snacks.netlify.app>

**Repository:** [Elli2022/nic-cage-snacks-shop](https://github.com/Elli2022/nic-cage-snacks-shop)

## Previous version

The first submission lives in `legacy/original-2023/` and git tag `v1.0-original-school`.

```bash
npm run legacy:original   # http://localhost:5174
```

See [VERSIONS.md](./VERSIONS.md).

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
| `VITE_FIREBASE_URL` | `https://nic-cage-snacks-default-rtdb.firebaseio.com/.json` |

Alternativt: koppla repot direkt i [Netlify → nic-cage-snacks → Link repository](https://app.netlify.com/projects/nic-cage-snacks/link).

## Firebase

REST mot Realtime Database (ingen Firebase SDK).

| Version | Projekt | Kommando |
|--------|---------|----------|
| v3 (nu) | `nic-cage-snacks` | `npm run seed:firebase` |
| v1 (original) | `nic-cage-mp3-elli-dany` | `npm run seed:firebase:legacy` |

Se [docs/FIREBASE.md](./docs/FIREBASE.md). Den gamla `della-311b1`-databasen är inaktiverad; originalet i `legacy/original-2023/` använder den nya legacy-databasen.

## Medverkande

**Elli** (Eleonora Nocentini) & **Dany** (Danyeal Mateen)
