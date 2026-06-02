import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_FIREBASE_URL =
  "https://nic-cage-snacks-default-rtdb.firebaseio.com/.json";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const databaseUrl =
  process.argv[2] ||
  process.env.VITE_FIREBASE_URL ||
  process.env.FIREBASE_DATABASE_URL ||
  DEFAULT_FIREBASE_URL;

if (!databaseUrl) {
  console.error(
    "Ange databas-URL:\n  npm run seed:firebase -- https://<projekt>-default-rtdb.europe-west1.firebasedatabase.app/.json"
  );
  process.exit(1);
}

const endpoint = databaseUrl.endsWith(".json") ? databaseUrl : `${databaseUrl.replace(/\/$/, "")}/.json`;
const products = JSON.parse(readFileSync(resolve(root, "data/seed-products.json"), "utf8"));

const response = await fetch(endpoint, {
  method: "PUT",
  headers: { "Content-Type": "application/json; charset=UTF-8" },
  body: JSON.stringify(products)
});

if (!response.ok) {
  const body = await response.text();
  console.error("Seed misslyckades:", response.status, body);
  process.exit(1);
}

const saved = await response.json();
console.log("Firebase seed klar — 5 produkter sparade:");
saved.forEach((item, index) => {
  console.log(`  ${index}: ${item.name} (lager ${item.stock})`);
});
