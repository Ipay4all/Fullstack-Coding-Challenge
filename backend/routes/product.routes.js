"use strict";

const router = require("express").Router();

const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, saveAllProducts, dropAllProducts } = require("../controllers/productController");
const bearerAuth = require("../middlewares/bearerAuth");

router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.post("/product",bearerAuth, createProduct);
router.put("/product/:id",bearerAuth, updateProduct);
router.delete("/product/:id",bearerAuth, deleteProduct);

router.get("/save",bearerAuth, saveAllProducts);
router.delete("/drop/:password",bearerAuth, dropAllProducts);

module.exports = router;