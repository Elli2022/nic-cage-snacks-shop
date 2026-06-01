import { countByName } from "./cart.js";

export function remainingStock(product, reservedCount) {
  return Number(product.stock) - reservedCount;
}

export function buildStockMap(products, cartItems) {
  return Object.fromEntries(
    products.map((product) => [product.name, countByName(cartItems, product.name)])
  );
}

export function applyPurchaseToStock(products, cartItems) {
  const reserved = buildStockMap(products, cartItems);

  return products.map((product) => ({
    ...product,
    stock: Math.max(0, remainingStock(product, reserved[product.name]))
  }));
}
