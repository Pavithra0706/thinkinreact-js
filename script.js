document.addEventListener("DOMContentLoaded", function () {
    const products = [
      { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
      { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
      { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
      { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
      { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
      { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
    ];

    const searchBox = document.getElementById("search-box");
    const stockedFilter = document.getElementById("stocked-filter");
    const categoriesContainer = document.getElementById("categories");

    function renderProducts() {
      const searchTerm = searchBox.value.toLowerCase();
      const showOnlyStocked = stockedFilter.checked;

      categoriesContainer.innerHTML = ""; 

      const groupedProducts = groupBy(products, 'category');

      Object.entries(groupedProducts).forEach(([category, categoryProducts]) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");

        const categoryName = document.createElement("h3");
        categoryName.textContent = category;
        categoryDiv.appendChild(categoryName);

        const productList = document.createElement("ul");

        categoryProducts.forEach(product => {
          const listItem = document.createElement("li");
          listItem.classList.add("product");

          const isStocked = showOnlyStocked ? product.stocked : true;

          if (
            (product.name.toLowerCase().includes(searchTerm) || searchTerm === "") &&
            isStocked
          ) {
            listItem.textContent = `${product.name} - Price: ${product.price}`;
            if (!product.stocked) {
              listItem.classList.add("out-of-stock");
            }
            productList.appendChild(listItem);
          }
        });

        categoryDiv.appendChild(productList);
        categoriesContainer.appendChild(categoryDiv);
      });
    }

   
    searchBox.addEventListener("input", renderProducts);
    stockedFilter.addEventListener("change", renderProducts);

    
    renderProducts();
  });

  
  function groupBy(array, key) {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  }