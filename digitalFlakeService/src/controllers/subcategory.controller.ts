import { NextFunction, Request, Response } from "express";
import {
  deleteSubCategory,
  getSubcategoriesById,
  getSubcategoriesByUserId,
  upsertSubCategory,
} from "../services/subcategory.service";

export const upsertSubCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.body?.user?.id;
    console.log(userId);

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const subcategoryPayload = {
      id: req.body.id, // Optional: if provided, it will update the subcategory
      categoryId: req.body.categoryId,
      name: req.body.name,
      img: req.file?.filename,
      userId,
      status: req.body.status,
      delete: req.body.delete,
    };

    const subcategory = await upsertSubCategory(subcategoryPayload);

    res.status(200).json({
      success: true,
      data: subcategory,
      message: subcategoryPayload.id
        ? "Subcategory updated successfully."
        : "Subcategory created successfully.",
    });
  } catch (error: unknown) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const getSubcategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.body?.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const search = (req.query.search as string) || "";

    const subcategories = await getSubcategoriesByUserId(userId, search);

    res.status(200).json({
      success: true,
      data: subcategories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching subcategories: " + error.message,
    });
  }
};

export const deleteSubCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const userId = req.body?.user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const isDeleted = await deleteSubCategory(id, userId);

    if (!isDeleted) {
      res.status(404).json({
        success: false,
        message: "SubCategory not found or already deleted.",
      });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "SubCategory deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete subcategory." });
  }
};

export const getSubcategoriesByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.body?.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { subcategoryId } = req.params;

    if (!subcategoryId) {
      res
        .status(400)
        .json({ success: false, message: "Subcategory ID is required" });
      return;
    }

    const subcategories = await getSubcategoriesById(userId, subcategoryId);

    res.status(200).json({
      success: true,
      data: subcategories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching subcategories: " + error.message,
    });
  }
};
