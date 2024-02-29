import express from "express";
import {create,getAll,getById, deleteProduct, upDateProduct} from "../controllers/products.controller.js"
const prodRouter = express.Router();

prodRouter.get("/", getAll);

prodRouter.get("/:pid",getById );

prodRouter.post("/", create);

prodRouter.put("/:id", upDateProduct);

prodRouter.delete("/:id",deleteProduct);

export default prodRouter;