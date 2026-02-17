import fs from "fs/promises";
export default class ProductManager {
  constructor() {
    this.path = "./src/data/products.json";
  }

  async getProducts() {
    const data = await fs.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((product) => product.id === id);
  }

  async addProduct(product) {
    const products = await this.getProducts();

    const newId =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id: newId,
      ...product,
    };

    products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));

    return newProduct;
  }

  async updateProduct(id, updatedData) {
    const products = await this.getProducts();

    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      return null;
    }

    delete updatedData.id;

    products[index] = {
      ...products[index],
      ...updatedData,
    };

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));

    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();

    const filteredProducts = products.filter((product) => product.id !== id);

    if (products.length === filteredProducts.length) {
      return null;
    }

    await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));

    return true;
  }
}
