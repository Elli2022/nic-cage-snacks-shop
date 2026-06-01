/** Ny Realtime Database (projekt js2-mp3-elli-dany). Överstyr via VITE_FIREBASE_URL. */
export const FIREBASE_URL =
  import.meta.env.VITE_FIREBASE_URL ||
  "https://js2-mp3-elli-dany-default-rtdb.firebaseio.com/.json";

export const CART_STORAGE_KEY = "cartItems";

export const PRODUCT_SLUGS = ["candy", "chips", "cookie", "gum", "soda"];
