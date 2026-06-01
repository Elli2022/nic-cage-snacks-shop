import { CART_STORAGE_KEY } from "./constants.js";

export function readCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
}

export function countByName(items, name) {
  return items.filter((item) => item.name === name).length;
}

export function cartTotals(items) {
  const total = items.reduce((sum, item) => sum + Number(item.price), 0);
  return { count: items.length, total };
}
