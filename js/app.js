const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  const few = `http://127.0.0.1:5500/data.json`;
  fetch(few)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("single-product", "h-100", "shadow-lg", "bg-light");
    div.innerHTML = `
      <img class="product-image" src=${image}></img>
      <div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p>Customer Reviews:  ${product.rating.rate} out of 5 by
        <span class="text-info">${product.rating.count}</span>
      </p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  // updateTaxAndCharge function call
  updateTaxAndCharge();
  //set total products count

  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

// get input value function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  const totalFixed = total.toFixed(2);
  document.getElementById(id).innerText = totalFixed;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  const grandTotalFixed = grandTotal.toFixed(2);
  document.getElementById("total").innerText = grandTotalFixed;
};

// load details function
const loadDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;

  console.log(id);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data));
};
// displayDetails function call
const displayDetails = (details) => {
  const cartDetails = document.getElementById("cart-details");
  cartDetails.classList.add("shadow-lg");
  cartDetails.innerHTML = `
    <h5>Title : ${details.title}</h5>
    <h6>Price : $ ${details.price}</h6>
    <p>Description : ${details.description}</p>

   `;
  // cartDetails.appendChild(div);
};
