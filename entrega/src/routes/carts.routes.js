import express from "express";
import {
  getById,
  createCart,
  addProductInCart,
  getAll,
} from "../controllers/cart.controller.js";

const cartRoutes = express.Router();

cartRoutes.post("/", createCart);

cartRoutes.get("/", getAll);

cartRoutes.get("/:cid", getById);

cartRoutes.post("/:cid/product/:pid", addProductInCart);

export default cartRoutes;
