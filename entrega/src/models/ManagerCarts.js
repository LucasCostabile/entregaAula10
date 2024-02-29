import * as fs from "fs/promises";
import path from "path";
import url from "url";

export default class ManagerCart {
  #__filename = url.fileURLToPath(import.meta.url);
  #__dirname = path.dirname(this.#__filename);
  #pathData = path.resolve(this.#__dirname, "../../data/cart.json");

  constructor() {}

  #readFile = async () => {
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

  #saveProductToFile = async (cart) => {
    let cartList = await this.#readFile();

    const index = cartList.findIndex((prod) => prod.id === cart.id);

    if (index !== -1) {
      cartList[index] = cart;
    } else {
      cartList.push(cart);
    }
    await fs.writeFile(this.#pathData, JSON.stringify(cartList, null, 4));

    console.log("Produto adicionado ao carrinho com sucesso!");
  };

  createCart = async (prod) => {
    const prodList = await this.#readFile();

    const generateID = () => {
      const id = prodList.length + 1;
      return id;
    };
    const newCartProd = {
      id: generateID(),
      prod: prod,
    };
    try {
      this.#saveProductToFile(newCartProd);
    } catch (err) {
      console.log(err);
    }
  };

  getProductById = async (id) => {
    const prodList = await this.#readFile();

    const filtredProdList = prodList.find((prods) => prods.id === +id);
    console.log(filtredProdList);
    return filtredProdList;
  };

  updateProds = async (cid, pid, prods) => {
    const prodList = await this.#readFile();

    const filtredProdList = prodList.find((prods) => prods.id === +cid);

    if (!filtredProdList) {
      this.createCart(prods);
      return;
    }

    const id = filtredProdList.prod[0].id;

    if (pid === id) {
      let quantity = Number(filtredProdList.prod[0].quantity);
      let newQuantity = quantity + 1;

      filtredProdList.prod[0].quantity = newQuantity;

      this.#saveProductToFile(filtredProdList);
      return;
    }

    filtredProdList.prod.push(prods);
    this.#saveProductToFile(filtredProdList);
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
}
