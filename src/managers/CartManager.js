import fs from "fs/promises";
import ProductManager from "./ProductManager.js";

export default class CartManager {
  constructor() {
    this.path = "./src/data/carts.json";
    this.productManager = new ProductManager();
  }

  async getCarts() {
    const data = await fs.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async createCart() {
    const carts = await this.getCarts();

    const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

    const newCart = {
      id: newId,
      products: [],
    };

    carts.push(newCart);

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));

    return newCart;
  }
  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find((cart) => cart.id === id);
  }
  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();

    const cartIndex = carts.findIndex((cart) => cart.id === cid);
    if (cartIndex === -1) {
      return { error: "Cart not found" };
    }

    // 🔎 Verificar que el producto exista
    const product = await this.productManager.getProductById(pid);
    if (!product) {
      return { error: "Product not found" };
    }

    const cart = carts[cartIndex];

    const productIndex = cart.products.findIndex((p) => p.product === pid);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({
        product: pid,
        quantity: 1,
      });
    }

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));

    return cart;
  }
}
