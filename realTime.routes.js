import express from "express";

const realTimeRouter = express.Router();

import ProductManager from "../models/ManagerProducts.js";
const productManager = new ProductManager();

realTimeRouter.get("/", async (req, res) => {
  const limit = req.query;
  try {
    res.render("realTimeProducts");
  } catch (err) {
    console.log(err);
    res.render("404", { err });
  }
});

realTimeRouter.post("/", async (req, res) => {
  const produtos = req.body;
  console.log("passou ")
  try {
    await productManager.addProduct(produtos);
    res.render("realTimeProducts");
  } catch (err) {
    console.log(err);
    res.status(500);
  }

  //res.status(200).json(produtos);
});

export default realTimeRouter;