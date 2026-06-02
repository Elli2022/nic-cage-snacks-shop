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

/** Minska lagret i Firebase när en vara läggs i kundvagnen. */
export function decrementStock(products, productName) {
  return products.map((product) =>
    product.name === productName
      ? { ...product, stock: Math.max(0, Number(product.stock) - 1) }
      : product
  );
}

/** Återställ lagret i Firebase när kundvagnen töms (samma antal som i vagnen). */
export function restoreStockFromCart(products, cartItems) {
  const reserved = buildStockMap(products, cartItems);

  return products.map((product) => ({
    ...product,
    stock: Number(product.stock) + (reserved[product.name] ?? 0)
  }));
}
