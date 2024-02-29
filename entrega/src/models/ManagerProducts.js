import * as fs from "fs/promises";
import path from "path";
import url from "url";

class ProductManager {
  #__filename = url.fileURLToPath(import.meta.url);
  #__dirname = path.dirname(this.#__filename);
  #pathData = path.resolve(this.#__dirname, "../../data/produto.json");

  constructor(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.status = status;
    this.category = category;
  }

  addProduct = async (product) => {
    let produto = this.readData(product);
    if (this.checkData(produto)) {
      await this.saveProductToFile(produto);
    }
  };

  readData(reqBody) {
    const {
      title,
      description,
      price,
      stock,
      thumbnail,
      code,
      category,
      status,
    } = reqBody;
    const product_title = title;
    const product_desc = description;
    const product_price = price;
    const product_thumb = thumbnail;
    const product_code = code;
    const product_stock = stock;
    const product_category = category;
    const product_status = status;
    let produto = new ProductManager(
      product_title,
      product_desc,
      product_price,
      product_thumb,
      product_code,
      product_stock,
      product_category,
      product_status
    );
    return produto;
  }

  checkData(produto) {
    if (
      produto.title === "" ||
      produto.description === "" ||
      produto.price === null ||
      produto.thumbnail === "" ||
      produto.stock === null ||
      produto.code === null ||
      produto.category === ""
    ) {
      console.log("Erro: Produto com valores vazios ou nulos encontrado!");
      return false;
    } else {
      console.log("Produto válido!");
      return true;
    }
  }

  saveProductToFile = async (product) => {
    let productsList = await this.readProductsFromFile();
    const id =
      productsList.length > 0
        ? productsList[productsList.length - 1].id + 1
        : 1;
    product.id = id;
    productsList.push(product);
    await fs.writeFile(this.#pathData, JSON.stringify(productsList));
    console.log("Produto salvo com sucesso!");
  };

  readProductsFromFile = async () => {
    try {
      const data = await fs.readFile(this.#pathData, "utf8");

      const parsedData = JSON.parse(data);

      if (Array.isArray(parsedData)) {
        return parsedData;
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  };

  upDateProduct = async (productId, reqProducts) => {
    const productsList = await this.readProductsFromFile();
    console.log(productsList);
    const index = productsList.findIndex((produto) => +productId == produto.id);
    if (index !== -1) {
      console.log(productsList[index]);
      let updatedProduct = await this.readData(productsList);
      updatedProduct.id = parseInt(productId);

      updatedProduct = { id: +productId, ...reqProducts };
      productsList[index] = updatedProduct;
      fs.writeFile(this.#pathData, JSON.stringify(productsList));
      console.log("Produto atualizado com sucesso!");
    } else {
      console.log("PRODUTO NÃO ENCONTRADO");
    }
  };
  deleteProductById = async (productId) => {
    let productsList = await this.readProductsFromFile();
    let updatedProductsList = productsList.filter(
      (produto) => produto.id != +productId
    );

    if (updatedProductsList.length < productsList.length) {
      fs.writeFile(this.#pathData, JSON.stringify(updatedProductsList));
      console.log("Produto excluído com sucesso!");
      return true;
    } else {
      console.log("PRODUTO NÃO ENCONTRADO");
      return false;
    }
  };

  getProductById = async (productId) => {
    const productsList = await this.readProductsFromFile();

    const getProduct = productsList.find(
      (produto) => +productId === produto.id
    );

    return getProduct;
  };
}
export default ProductManager;
