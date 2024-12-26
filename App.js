import { products } from "./Products.js";
console.log(products);

// elements
const product_grid = document.getElementById("product-grid");
const Tabs = document.querySelectorAll(".tab");
const clear_search = document.getElementById("clear-search");
const search_btn = document.getElementById("search-btn");
const search_bar = document.getElementById("search-bar");

function RenderProducts(productsarr) {
  // const product_grid = document.getElementById("product-grid");

  for (let i = 0; i < products.length; i++) {
    let Product = document.createElement("div");
    Product.classList.add("product-card");

    let Card = document.createElement("div");
    Card.classList.add("details");

    let Image = document.createElement("img");
    Image.src = `${productsarr[i].image}`;
    console.log(Image.src);
    Image.alt = productsarr[i].name;

    let title = document.createElement("h3");
    title.textContent = productsarr[i].name;

    let Category = document.createElement("p");
    Category.textContent = productsarr[i].category;

    let Price = document.createElement("p");
    Price.textContent = productsarr[i].price;

    // Append elements to build the product card
    Card.appendChild(title);
    Card.appendChild(Category);
    Card.appendChild(Price);
    Product.appendChild(Image);
    Product.appendChild(Card);

    product_grid.appendChild(Product);
  }
}

RenderProducts(products);

// Function to clear Product-grid
function clearProductGrid() {
  const ProductGrid = document.getElementById("product-grid");
  ProductGrid.innerHTML = "";
}

// Filter Based On Categories
function FilterBasedOnCategories(Category) {
  const NewProduct = products.filter((P) => {
    if (P.category === Category) {
      return P;
    }
  });
  console.log(NewProduct);
  clearProductGrid();
  RenderProducts(NewProduct);
}

// find Active Button
function FindActiveButton() {
  Tabs.forEach((tab) => {
    if (tab.classList.contains("active")) {
      tab.classList.remove("active");
    }
  });
}

// Handling Click Events on Tabs
Tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    const category = this.getAttribute("data-category");

    if (category === "all") {
      clearProductGrid();
      FindActiveButton();
      Tabs[0].classList.add("active");
      RenderProducts(products);
    }

    if (
      category === "electronics" ||
      category === "clothing" ||
      category === "home-garden"
    ) {
      FindActiveButton();
      tab.classList.add("active");
      FilterBasedOnCategories(category);
    }
  });
});

// Clear Search Input
clear_search.addEventListener("click", function () {
  clearProductGrid();
  FindActiveButton();
  RenderProducts(products);
  Tabs[0].classList.add("active");
});

// Search Button

search_btn.addEventListener("click", function () {
  // const search_bar = document.getElementById("search-bar");
  let SearchTxt = search_bar.value.trim().toLowerCase(); // Normalize user input

  if (!SearchTxt) {
    clearProductGrid();
    product_grid.innerHTML = `
      <h2 style="text-align: center;">Please enter a search term</h2>
    `;
    return;
  }

  const filteredProducts = products.filter((p) => {
    if (
      p.category.toLowerCase() === SearchTxt || // Normalize category
      p.tags.some((tag) => tag.toLowerCase() === SearchTxt) || // Normalize tags
      p.name.toLowerCase() === SearchTxt // Normalize product name
    ) {
      return true; // Include this product in the filtered array
    }
    return false;
  });

  // console.log(filteredProducts); // Logs the filtered products

  if (filteredProducts.length === 0) {
    clearProductGrid();
    FindActiveButton();
    product_grid.innerHTML = `
    <h2 style="text-align: center;">No Products Found</h2>
    `;
  } else {
    clearProductGrid();
    FindActiveButton();
    RenderProducts(filteredProducts);
  }

  // Reset Tabs and Search Input
  search_bar.value = ""; // Clear search bar
});

// Event Listener for Enter Key in Search Box
search_bar.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    search_btn.click(); // Trigger the click event on the search button
  }
});
