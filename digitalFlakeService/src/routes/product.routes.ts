import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  deleteProductController,
  getProductsByIdController,
  getProductsController,
  upsertProductController,
} from "../controllers/product.controller";
import { upload } from "../utils/multer";

const router = express.Router();

router.post(
  "/upsert-product",
  upload.single("file"),
  authenticate,
  upsertProductController
);

router.get("/get-product", authenticate, getProductsController);

router.delete("/delete-product/:id", authenticate, deleteProductController);

router.get(
  "/get-product-by-id/:productId",
  authenticate,
  getProductsByIdController
);

export default router;
