import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http";

import ProductManager from "./managers/ProductManager.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const productManager = new ProductManager();

/* MIDDLEWARES */

app.use(express.json());
app.use(express.static("./src/public"));

/* HANDLEBARS */

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.set("views", "./src/views");

/* ROUTES */

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

/* SOCKET.IO */

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  const products = await productManager.getProducts();
  socket.emit("updateProducts", products);

  socket.on("addProduct", async (product) => {
    await productManager.addProduct(product);

    const products = await productManager.getProducts();
    io.emit("updateProducts", products);
  });

  socket.on("deleteProduct", async (id) => {
    console.log("Eliminar producto con id:", id);

    await productManager.deleteProduct(id);

    const products = await productManager.getProducts();
    io.emit("updateProducts", products);
  });
});

/* SERVER */

server.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});
