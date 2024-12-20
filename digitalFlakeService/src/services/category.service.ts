import { Category, ICategory } from "../models/category.model";

export const upsertCategory = async (
  categoryPayload: Partial<ICategory>
): Promise<ICategory> => {
  const { id, userId, name, img, status } = categoryPayload;

  if (!userId || !name || !img) {
    throw new Error("Missing required fields: userId, name, or img.");
  }

  let category;
  if (id) {
    category = await Category.findByIdAndUpdate(
      id,
      { userId, name, img, status },
      { new: true, runValidators: true }
    );
    if (!category) {
      throw new Error("Category not found.");
    }
  } else {
    category = await Category.create({ userId, name, img, status: 0 });
  }

  return category;
};

export const getCategories = async (
  userId: string,
  search?: string
): Promise<ICategory[]> => {
  const filter: any = { userId, delete: 0 };

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  return await Category.find(filter).sort({ createdAt: -1 });
};

export const getCategoriesById = async (
  userId: string,
  categoryId?: string
): Promise<ICategory[]> => {
  const filter: any = { userId, delete: 0 };

  if (categoryId) {
    filter._id = categoryId;
  }
  return await Category.find(filter).sort({ createdAt: -1 });
};

export const deleteCategory = async (
  categoryId: string,
  userId: string
): Promise<boolean> => {
  const result = await Category.updateOne(
    { _id: categoryId, userId, delete: { $ne: 1 } },
    { $set: { delete: 1 } }
  );

  return result.modifiedCount > 0;
};
