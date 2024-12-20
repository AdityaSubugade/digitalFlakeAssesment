import { Request, Response } from "express";
import {
  deleteCategory,
  getCategories,
  getCategoriesById,
  upsertCategory,
} from "../services/category.service";

export const upsertCategoryController = async (req: Request, res: Response) => {
  try {
    // Safely access `req.user`
    console.log(req.body, "reaa");
    const userId = req.body?.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const categoryPayload = {
      id: req.body.id,
      userId,
      name: req.body.name,
      img: req.file?.filename,
      status: req.body.status,
    };

    const category = await upsertCategory(categoryPayload);
    res.status(200).json({ success: true, data: category });
  } catch (error: unknown) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const getCategoriesController = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const userId = req.body?.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const categories = await getCategories(userId, search as string);
    res.status(200).json({ success: true, data: categories });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Category ID from URL params

    const userId = req.body?.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const isDeleted = await deleteCategory(id, userId);

    if (!isDeleted) {
      res
        .status(404)
        .json({
          success: false,
          message: "Category not found or already deleted.",
        });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete category." });
  }
};

export const getCategoriesByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.body?.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const categories = await getCategoriesById(userId, id as string);
    res.status(200).json({ success: true, data: categories });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
