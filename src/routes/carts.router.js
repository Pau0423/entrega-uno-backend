import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const manager = new CartManager();

router.post("/", async (req, res) => {
  const newCart = await manager.createCart();
  res.status(201).json(newCart);
});

router.get("/:cid", async (req, res) => {
  const cid = Number(req.params.cid);

  const cart = await manager.getCartById(cid);

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  res.json(cart.products);
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = Number(req.params.cid);
  const pid = Number(req.params.pid);

  const result = await manager.addProductToCart(cid, pid);

  if (result?.error === "Cart not found") {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  if (result?.error === "Product not found") {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(result);
});

export default router;
