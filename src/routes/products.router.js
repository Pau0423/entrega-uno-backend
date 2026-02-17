import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
  const products = await manager.getProducts();
  res.json(products);
});

router.get("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  const product = await manager.getProductById(pid);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
});

router.post("/", async (req, res) => {
  const newProduct = await manager.addProduct(req.body);
  res.status(201).json(newProduct);
});

router.put("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);

  const updatedProduct = await manager.updateProduct(pid, req.body);

  if (!updatedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(updatedProduct);
});

router.delete("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);

  const deleted = await manager.deleteProduct(pid);

  if (!deleted) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json({ message: "Producto eliminado correctamente" });
});

export default router;
