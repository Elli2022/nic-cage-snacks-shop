import { FIREBASE_DB_ROOT, FIREBASE_DB_URL } from "./firebase-config.js";

let url = FIREBASE_DB_URL;
getProducts();
let dbdata;
let cartItems = JSON.parse(localStorage.getItem("cartItems"));
console.log(cartItems);

let itemsInCart = 0;
let completePurchase = document.getElementById("buyButton");
let totalPriceElement = document.getElementById("totalPrice");
let errorMessage = document.getElementById("errorMessage");


//Rendering divs for the products
let items = document.getElementById("items");

if (cartItems !== null) {
  cartItems.forEach((item) => {
    items.innerHTML += `
    <br>
    ${item.name}<br>
    ${item.price}kr <br>
    <img src="${item.url}"/>
    <hr id="hr">`;
  });
} else {
  console.log("inga items i carten");
}

let emptyButton = document.getElementById("emptyButton");
emptyButton.addEventListener("click", () => {
  localStorage.removeItem("cartItems");
  if (cartItems == null) {
    document.getElementById("itemCounter").innerText =
      "Your cart is ALREADY empty!";
  } else {
    items.innerText = "no products in the cart";
    totalPrice.innerText = "";
    document.getElementById("itemCounter").innerText = "Your cart is emptied!";
    cartItems = null;
  }

  window.onpageshow = function (event) {
    if (event.persisted) {
      location.reload();
    }
  };
  document.getElementById("totalPrice").style.display = "none";
  document.getElementById("purchaseBtn").style.display = "none";
  document.getElementById("emptyButton").style.display = "none";
});

//Checking if cart is empty or not and displaying items in the cart from the last session.
if (cartItems !== null) {
  cartItems.forEach((item) => {
    if (item <= 0) {
      itemsInCart++;
      console.log(itemsInCart)
    } else {
      itemsInCart++;
      itemCounter.innerHTML = `Items from last session ${itemsInCart}`;
      console.log(itemsInCart)
    }
  });
}

// Function to calculate the total price of items in the cart
function calculateTotalPrice() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  let totalPrice = 0;

  if (cartItems !== null) {
    cartItems.forEach((item) => {
      itemsInCart++;
      totalPrice += item.price;
    });
  }
  // Update the DOM with the total price
  totalPriceElement.textContent = `${totalPrice.toFixed(2)} KR`; // Format the price to 2 decimal places
  return totalPrice;
}

//Call the method
let total = calculateTotalPrice();

purchaseBtn.addEventListener("click", () => {
  if (cartItems === null) {
    document.getElementById("itemCounter").innerText = "Your cart is empty!";
    localStorage.clear();
  } else {
    postProducts()
    
    document.getElementById("items").innerHTML = "";
    document.getElementById("itemCounter").innerText =
      "Purchase completed successfully!";
    localStorage.clear(cartItems);
  }
  document.getElementById("totalPrice").style.display = "none";
  document.getElementById("purchaseBtn").style.display = "none";
  document.getElementById("emptyButton").style.display = "none";
});

async function postProducts() {
  await getProducts()
  const url = FIREBASE_DB_URL;
  let stock = [0, 0, 0, 0, 0]
  stock[0] = dbdata[0].stock;
  stock[1] = dbdata[1].stock;
  stock[2] = dbdata[2].stock;
  stock[3] = dbdata[3].stock;
  stock[4] = dbdata[4].stock;
  console.log(cartItems);
  if (cartItems !== null) {
    cartItems.forEach((item) => {


      switch (item.name) {
        case "Candy Skittles":
          stock[0]--
          break;
        case "Chips Estrella":
          stock[1]--
          break;
        case "Gum Stimorol":
          stock[2]--
          break;
        case "Cookies Marabou":
          stock[3]--
          break;
        case "Soda Pepsi":
          stock[4]--
          break;
        default:
          break;
      }
    
    });
  }
  console.log("stock to reduce from DB:", stock);

  let productArray =
    [
      {
        name: "Candy Skittles",
        price: 10,
        stock: stock[0],
        url: "/images/products/candy.png"
      },
      {
        name: "Chips Estrella",
        price: 10,
        stock: stock[1],
        url: "/images/products/chips.jpg"
      },
      {
        name: "Cookies Marabou",
        price: 10,
        stock: stock[2],
        url: "/images/products/cookies.jpg"
      },
      {
        name: "Gum Stimorol",
        price: 10,
        stock: stock[3],
        url: "/images/products/gum.jpg"
      },
      {
        name: "Soda Pepsi",
        price: 10,
        stock: stock[4],
        url: "/images/products/soda.jpg"
      }
    ];

  console.log(productArray);
  if (productArray.length !== 0) {
    const init = {
      method: "PUT",
      body: JSON.stringify(productArray),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const response = await fetch(url, init);
    const data = await response.json();
  }
}

async function updateStock(product, newStock) {
  const patchUrl = `${FIREBASE_DB_ROOT}/${product}.json`;

  const init = {
    method: "PATCH",
    body: JSON.stringify({ stock: newStock }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const response = await fetch(patchUrl, init);
  const data = await response.json();
}


async function getProducts() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    dbdata = data
    console.log(data);
  } catch (error) {
    console.log(`Connection problem!` + error);
    errorMessage.innerText = " CONNECTION PROBLEM! ";
  }
}
