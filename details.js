const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

// console.log(params);
// console.log(productId);

const optionsGet = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
  },
};

async function getProduct() {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/product/${productId}`,
    optionsGet
  );
  const product = await response.json();

  console.log(product);
  return product;
}

function renderProduct(product) {
  document.querySelector("#product-details").innerHTML = `
  <h1 class="display-4">${product.name}</h1>
  <p>${product.description}</p>
  <h4 class="mb-3">${product.price}€<h4>
  <h6 class="pl-2 py-3 bg-light">Server Details</h6>
  <ul class="list-group list-group-flush mb-3">
    <li class="list-group-item pl-2"><b>id: </b>${product._id}</li>
    <li class="list-group-item pl-2"><b>createdAt: </b>${product.createdAt}</li>
    <li class="list-group-item pl-2"><b>updatedAt: </b>${product.updatedAt}</li>
  </ul>`;
}

window.onload = async () => {
  const product = await getProduct();
  renderProduct(product);
};

async function onDelete() {
  try {
    if (confirm("Do you really want to delete this product?")) {
      const optionsDelete = {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
        },
      };
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/product/${productId}`,
        optionsDelete
      );
      if (response.ok) {
        // This is like an a tag, but in JavaScript
        window.location.assign("home.html");
      } else {
        alert("Error while deleting!");
      }
    }
  } catch (error) {
    alert(`Some erorr occured: ${error}`);
  }
}

function onEdit() {
  window.location.assign(`backoffice.html?productId=${productId}`);
}
