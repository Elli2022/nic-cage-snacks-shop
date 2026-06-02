# Firebase — Nic Cage snacks

## Översikt

| Version | Firebase-projekt | Databas-URL |
|--------|------------------|-------------|
| **v3** (modern, Netlify) | `nic-cage-snacks` | `https://nic-cage-snacks-default-rtdb.firebaseio.com/.json` |
| **v1** (original i `legacy/original-2023/`) | `nic-cage-mp3-elli-dany` | `https://nic-cage-mp3-elli-dany-default-rtdb.firebaseio.com/.json` |

Den gamla skol-databasen **`della-311b1`** är inaktiverad. Projektet **`js2-mp3-elli-dany`** är ersatt av **`nic-cage-snacks`**.

## Produkter

| Index | Produkt |
|------|---------|
| 0 | Candy Skittles |
| 1 | Chips Estrella |
| 2 | Cookies Marabou |
| 3 | Gum Stimorol |
| 4 | Soda Pepsi |

Seed-data: [`data/seed-products.json`](../data/seed-products.json)

## Fyll databasen

```bash
npm run seed:firebase          # v3 (modern)
npm run seed:firebase:legacy   # v1 (original)
```

## Regler (skolprojekt / test)

```bash
npm run firebase:rules         # v3
npm run firebase:rules:legacy  # v1
```

## Miljövariabel (v3)

Sätt `VITE_FIREBASE_URL` i Netlify/GitHub om du byter databas.
