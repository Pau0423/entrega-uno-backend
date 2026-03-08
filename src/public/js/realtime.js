const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const formAdd = document.getElementById("formAdd");
  const titleInput = document.getElementById("title");
  const priceInput = document.getElementById("price");

  const formDelete = document.getElementById("formDelete");
  const idInput = document.getElementById("productId");

  formAdd.addEventListener("submit", (e) => {
    e.preventDefault();

    const product = {
      title: titleInput.value,
      price: Number(priceInput.value),
    };

    socket.emit("addProduct", product);

    formAdd.reset();
  });

  formDelete.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = idInput.value.trim();

    if (!id) {
      alert("Ingresa un ID válido");
      return;
    }

    console.log("ID enviado:", id);

    socket.emit("deleteProduct", Number(id));

    formDelete.reset();
  });
});

socket.on("updateProducts", (products) => {
  const list = document.getElementById("productList");

  list.innerHTML = "";

  products.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `ID: ${p.id} - ${p.title} - $${p.price}`;
    list.appendChild(li);
  });
});
