/** Samma databas som i skoloriginalet — kan överstyras via Netlify/GitHub env. */
export const FIREBASE_URL =
  import.meta.env.VITE_FIREBASE_URL ||
  "https://della-311b1-default-rtdb.europe-west1.firebasedatabase.app/.json";

export const CART_STORAGE_KEY = "cartItems";

export const PRODUCT_SLUGS = ["candy", "chips", "cookie", "gum", "soda"];
