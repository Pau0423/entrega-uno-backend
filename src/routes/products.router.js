import { Router } from "express";
import Product from "../models/Product.js";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query ? { category: query } : {};

    const products = await Product.find(filter)
      .limit(Number(limit))
      .skip((page - 1) * limit)
      .sort(
        sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {}
      );

    res.json({
      status: "success",
      payload: products,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.log("ERROR GET PRODUCTS:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.log("ERROR GET BY ID:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log("ERROR CREATE:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.pid,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.log("ERROR UPDATE:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.pid);

    if (!deleted) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.log("ERROR DELETE:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
