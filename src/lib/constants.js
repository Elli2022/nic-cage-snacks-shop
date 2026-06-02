/** Realtime Database (projekt nic-cage-snacks). Överstyr via VITE_FIREBASE_URL. */
export const FIREBASE_URL =
  import.meta.env.VITE_FIREBASE_URL ||
  "https://nic-cage-snacks-default-rtdb.firebaseio.com/.json";

export const CART_STORAGE_KEY = "cartItems";

export const PRODUCT_SLUGS = ["candy", "chips", "cookie", "gum", "soda"];
