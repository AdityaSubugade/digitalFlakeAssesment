import express from "express";
import {
  deleteSubCategoryController,
  getSubcategoriesByIdController,
  getSubcategoriesController,
  upsertSubCategoryController,
} from "../controllers/subcategory.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../utils/multer";

const router = express.Router();

router.post(
  "/upsert-subcategories",
  upload.single("file"),
  authenticate,
  upsertSubCategoryController
);

router.get("/get-subcategories", authenticate, getSubcategoriesController);

router.delete(
  "/delete-subcategories/:id",
  authenticate,
  deleteSubCategoryController
);

router.get(
  "/get-subcategories-by-id/:subcategoryId",
  authenticate,
  getSubcategoriesByIdController
);

export default router;
