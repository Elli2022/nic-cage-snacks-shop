import anime from "animejs/lib/anime.es.js";
import { sortBy } from "underscore";
import { fetchProducts, saveProducts } from "./lib/api.js";
import { buildStockMap, decrementStock } from "./lib/inventory.js";
import { cartTotals, readCart, writeCart } from "./lib/cart.js";
import { PRODUCT_SLUGS } from "./lib/constants.js";
import "./styles/shop.css";

const elements = {
  heroImage: document.getElementById("ng"),
  errorMessage: document.getElementById("errorMessage"),
  itemCounter: document.getElementById("itemCounter"),
  productGrid: document.getElementById("productGrid"),
  summary: document.getElementById("cartSummary")
};

let products = [];
let cartItems = readCart();

function slugForIndex(index) {
  return PRODUCT_SLUGS[index] ?? `product-${index}`;
}

function renderSummary() {
  const reserved = buildStockMap(products, cartItems);
  const { count } = cartTotals(cartItems);

  elements.itemCounter.textContent = `Varor i kundvagn: ${count}`;
  elements.summary.innerHTML = products
    .map(
      (product) =>
        `<p><span>${product.name}</span><strong>${reserved[product.name] ?? 0}</strong></p>`
    )
    .join("");
}

function renderProducts() {
  const reserved = buildStockMap(products, cartItems);
  const sorted = sortBy(products, "name");

  elements.productGrid.innerHTML = sorted
    .map((product, index) => {
      const left = Number(product.stock);
      const slug = slugForIndex(index);

      return `
        <article class="product-card" data-slug="${slug}">
          <img src="${product.url}" alt="${product.name}" loading="lazy" />
          <h2>${product.name}</h2>
          <p class="price">${product.price} kr</p>
          <p class="stock">${left} kvar i lager</p>
          <button type="button" data-name="${product.name}" ${left <= 0 ? "disabled" : ""}>
            Lägg i kundvagn
          </button>
        </article>
      `;
    })
    .join("");

  elements.productGrid.querySelectorAll("button[data-name]").forEach((button) => {
    button.addEventListener("click", async () => {
      const name = button.dataset.name;
      const product = products.find((item) => item.name === name);
      if (!product || Number(product.stock) <= 0) {
        return;
      }

      button.disabled = true;

      try {
        elements.errorMessage.textContent = "";
        const updated = decrementStock(products, product.name);
        await saveProducts(updated);
        products = updated;
        cartItems = [...cartItems, product];
        writeCart(cartItems);
        renderSummary();
        renderProducts();
      } catch {
        elements.errorMessage.textContent =
          "Kunde inte uppdatera lagret. Försök igen.";
        button.disabled = Number(product.stock) <= 0;
      }
    });
  });
}

async function bootstrap() {
  try {
    elements.errorMessage.textContent = "";
    products = await fetchProducts();
    renderSummary();
    renderProducts();

    anime({
      targets: elements.heroImage,
      scale: [0.96, 1],
      duration: 900,
      easing: "easeOutElastic(1, .6)"
    });
  } catch {
    elements.errorMessage.textContent = "Anslutningsproblem — kunde inte hämta snacks.";
  }
}

bootstrap();
