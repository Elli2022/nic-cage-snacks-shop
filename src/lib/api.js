import { FIREBASE_URL } from "./constants.js";

export async function fetchProducts() {
  const response = await fetch(FIREBASE_URL);
  if (!response.ok) {
    throw new Error("Kunde inte hämta produkter");
  }
  return response.json();
}

export async function saveProducts(products) {
  const response = await fetch(FIREBASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(products)
  });

  if (!response.ok) {
    throw new Error("Kunde inte uppdatera lagret");
  }

  return response.json();
}
