import ProductManager from "../models/ManagerProducts.js";
const managerProducts = new ProductManager();

export const getAll = async (req, res) => {
  const limit = req.query.limit;
  try {
    const produtos = await managerProducts.readProductsFromFile(limit);

    res.status(200).json(produtos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao consultar produtos." });
  }
};
export const getById = async (req, res) => {
  try {
    const id = req.params.pid;
    const products = await managerProducts.getProductById(id);

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

export const create = async (req, res) => {
  //const product = req.body;
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status,
    } = req.body;
    await managerProducts.addProduct(req.body);
    res.status(201).json({ message: "Produto cadastrado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao cadastrar produtos." });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    await managerProducts.deleteProductById(id);
    res.status(201).json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao deletar produto." });
  }
};

export const upDateProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;

  try {
    await managerProducts.upDateProduct(id, product);
    res.status(201).json({ message: "Produto atualizado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao atualizar produto." });
  }
};
