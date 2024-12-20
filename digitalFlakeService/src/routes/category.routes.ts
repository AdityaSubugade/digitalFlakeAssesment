import express from "express";
import {
  deleteCategoryController,
  getCategoriesByIdController,
  getCategoriesController,
  upsertCategoryController,
} from "../controllers/category.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../utils/multer";

const router = express.Router();

router.post(
  "/upsert-category",
  upload.single("file"),
  authenticate,
  upsertCategoryController
);

router.get("/get-categories", authenticate, getCategoriesController);

router.delete("/delete-categories/:id", authenticate, deleteCategoryController);

router.get(
  "/get-categories-by-id/:id",
  authenticate,
  getCategoriesByIdController
);

export default router;
