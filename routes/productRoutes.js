import express from 'express';
import { isadmin, RequiredSignIn } from '../middlewares/authMiddleware.js';
import { createProductController,deleteproductcontroller,getproductcontroller, getsingleproductcontroller, productphotoController, updateProductController } from '../controllers/productController.js';
import formidable from "express-formidable"
const router = express.Router();
//Create Product
router.post("/create-product", RequiredSignIn, isadmin,formidable(),createProductController);
//update product
router.put("/update-product/:pid", RequiredSignIn, isadmin,formidable(),updateProductController);
//get products

router.get("/get-products",getproductcontroller);
//get single product
router.get("/get-products/:slug",getsingleproductcontroller);
//get photo
router.get("/product-photo/:pid",productphotoController);
//delete product
router.delete("/delete-product/:pid",deleteproductcontroller);

export default router;