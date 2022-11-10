const url = "https://striveschool-api.herokuapp.com/api/product/";

const optionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
  },
};

async function getProducts() {
  const response = await fetch(url, optionsGet);
  const products = await response.json();
  console.log(products);
  return products;
}

function renderProducts(listOfProducts) {
  let list = document.querySelector("ul.list-group");
  listOfProducts.forEach(({ name, price, _id, description }, index) => {
    const productLi = document.createElement("li");
    productLi.classList.add("list-group-item");
    productLi.innerHTML = `<div class="row px-3 align-items-center">
                            <div class="mr-1 col row justify-content-between align-items-center">
                              <div>${index + 1} - ${name}</div>
                              <div class="badge badge-dark">${price}€</div>
                              </div>
                                <a class"col" href="details.html?productId=${_id}">VIEW DETAILS</a>
                              </div>`;
    list.appendChild(productLi);
  });
}

window.onload = async () => {
  const products = await getProducts();
  renderProducts(products);
};
