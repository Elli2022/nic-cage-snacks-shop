import { fetchProducts, saveProducts } from "./lib/api.js";
import { restoreStockFromCart } from "./lib/inventory.js";
import { cartTotals, clearCart, readCart } from "./lib/cart.js";
import "./styles/cart.css";

const elements = {
  errorMessage: document.getElementById("errorMessage"),
  items: document.getElementById("items"),
  itemCounter: document.getElementById("itemCounter"),
  totalPrice: document.getElementById("totalPrice"),
  emptyButton: document.getElementById("emptyButton"),
  purchaseBtn: document.getElementById("purchaseBtn"),
  actions: document.getElementById("cartActions")
};

let cartItems = readCart();

function setActionsVisible(visible) {
  elements.actions.hidden = !visible;
}

function render() {
  if (cartItems.length === 0) {
    elements.items.innerHTML = `<p class="empty">Kundvagnen är tom.</p>`;
    elements.itemCounter.textContent = "Inga varor i kundvagnen";
    elements.totalPrice.textContent = "";
    setActionsVisible(false);
    return;
  }

  const { count, total } = cartTotals(cartItems);

  elements.items.innerHTML = cartItems
    .map(
      (item) => `
        <article class="cart-line">
          <img src="${item.url}" alt="${item.name}" loading="lazy" />
          <div>
            <h2>${item.name}</h2>
            <p>${item.price} kr</p>
          </div>
        </article>
      `
    )
    .join("");

  elements.itemCounter.textContent = `${count} varor i kundvagnen`;
  elements.totalPrice.textContent = `Totalt: ${total.toFixed(2)} kr`;
  setActionsVisible(true);
}

elements.emptyButton.addEventListener("click", async () => {
  if (cartItems.length === 0) {
    elements.itemCounter.textContent = "Kundvagnen är redan tom.";
    return;
  }

  const itemsToRestore = [...cartItems];

  try {
    elements.errorMessage.textContent = "";
    elements.emptyButton.disabled = true;

    const products = await fetchProducts();
    const restored = restoreStockFromCart(products, itemsToRestore);
    await saveProducts(restored);

    cartItems = [];
    clearCart();
    elements.itemCounter.textContent =
      "Kundvagnen tömd. Lagret i Firebase är återställt.";
    render();
  } catch {
    elements.errorMessage.textContent =
      "Kunde inte återställa lagret. Försök igen.";
  } finally {
    elements.emptyButton.disabled = false;
  }
});

elements.purchaseBtn.addEventListener("click", async () => {
  if (cartItems.length === 0) {
    elements.itemCounter.textContent = "Kundvagnen är redan tom.";
    return;
  }

  try {
    elements.errorMessage.textContent = "";
    // Lagret minskades redan när varor lades i kundvagnen på shop-sidan.
    cartItems = [];
    clearCart();
    elements.items.innerHTML = "";
    elements.itemCounter.textContent = "Köpet slutfört! Tack Nicolas Cage.";
    elements.totalPrice.textContent = "";
    setActionsVisible(false);
  } catch {
    elements.errorMessage.textContent = "Kunde inte slutföra köpet. Försök igen.";
  }
});

render();
