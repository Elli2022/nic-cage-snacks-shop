# Firebase — Nic Cage snacks

## Projekt

- **Firebase-projekt:** `js2-mp3-elli-dany`
- **Realtime Database-URL:** `https://js2-mp3-elli-dany-default-rtdb.firebaseio.com`

## Produkter (samma som Dany/originalet)

| Index | Produkt |
|------|---------|
| 0 | Candy Skittles |
| 1 | Chips Estrella |
| 2 | Cookies Marabou |
| 3 | Gum Stimorol |
| 4 | Soda Pepsi |

Seed-data: [`data/seed-products.json`](../data/seed-products.json)

## Fyll databasen (efter att regler tillåter läs/skriv)

```bash
npm run seed:firebase
```

## Regler för skolprojekt (test)

I [Firebase Console → Realtime Database → Rules](https://console.firebase.google.com/project/js2-mp3-elli-dany/database/js2-mp3-elli-dany-default-rtdb/rules):

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Klicka **Publish**. Om databasen skapades i *locked mode*, välj **Start in test mode** vid skapande eller publicera reglerna ovan.

## Deploy

Sätt `VITE_FIREBASE_URL` i Netlify (Site settings → Environment variables) till samma URL som ovan.
