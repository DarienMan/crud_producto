import express from "express";
import { getProductos, getProductoById, createProducto, updateProducto, deleteProducto } from "../controllers/productosController.js";
import { validateProducto, validateId } from "../middlewares/validator.js";

const router = express.Router();

router.get("/", getProductos);
router.get("/:id", validateId, getProductoById);
router.post("/", validateProducto, createProducto);
router.put("/:id", validateId, validateProducto, updateProducto);
router.delete("/:id", validateId, deleteProducto);

export default router;
