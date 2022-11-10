const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

window.onload = async () => {
  if (productId) {
    const optionsGet = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
      },
    };
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      optionsGet
    );
    const product = await response.json();

    let submitButton = document.querySelector("#submit-button");
    submitButton.innerText = "Edit Product";
    submitButton.classList.remove("btn-primary");
    submitButton.classList.add("btn-success");

    document.querySelector("#product-name").value = product.name;
    document.querySelector("#product-description").value = product.description;
    document.querySelector("#product-price").value = product.price;
  }
};

async function onFormSubmit(event) {
  // We call this to avoid the default action for the event.
  //  which is the refresh of the page because it is a submit button
  event.preventDefault();

  const newProduct = {
    name: document.querySelector("#product-name").value,
    description: document.querySelector("#product-description").value,
    price: document.querySelector("#product-price").value,
  };

  const options = {
    method: productId ? "PUT" : "POST",
    // BODY NEEDS TO BE A STRING, BECAUSE THIS IS HTTP,
    // so we convert the object into a string, JSON string
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjhlOWQ0YmUzZDAwMTU4NDYwMWMiLCJpYXQiOjE2NjgwODU5OTMsImV4cCI6MTY2OTI5NTU5M30.cD3v-klASeHbVpOpbjrZdw-MFDviHcox_TWvK-MbKak",
    },
  };

  try {
    // JavaScript please TRY to execute this block of code...
    // Whenever an erorr presents inside here, we will move directly
    // to the catch block, and we will execute the code there.

    const endpoint = productId
      ? `https://striveschool-api.herokuapp.com/api/product/${productId}`
      : "https://striveschool-api.herokuapp.com/api/product/";

    const response = await fetch(endpoint, options);
    // If there is an error here, when fetching...
    // This code will not go forward -> we jump to the catch block.

    if (response.ok) {
      // Because we want to do this only if the response code is 200 OK
      alert(
        productId
          ? "Product edited successfully!"
          : "Product created successfully!"
      );
    } else {
      throw new Error("ERROR WHILE EXECUTING THE TRY BLOCK!");
    }
  } catch (error) {
    // Any error will be catched here.
    console.error(error);
  }
}
