import { ISubCategory, SubCategory } from "../models/subcategory.model";

export const upsertSubCategory = async (
  subCategoryPayload: Partial<ISubCategory>
): Promise<ISubCategory> => {
  const { id, categoryId, name, userId, img, status } = subCategoryPayload;

  if (!categoryId || !name || !img) {
    throw new Error("Missing required fields: categoryId, name, or img.");
  }

  let subCategory;
  if (id) {
    subCategory = await SubCategory.findByIdAndUpdate(
      id,
      { categoryId, name, img, userId, status },
      { new: true, runValidators: true }
    );

    if (!subCategory) {
      throw new Error("Subcategory not found.");
    }
  } else {
    subCategory = await SubCategory.create({
      categoryId,
      userId,
      name,
      img,
      status: status || 0,
    });
  }

  return subCategory;
};

export const getSubcategoriesByUserId = async (
  userId: string,
  search: string
): Promise<ISubCategory[]> => {
  const filter: any = { userId, delete: 0 };

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const subcategories = await SubCategory.find(filter)
    .sort({
      createdAt: -1,
    })
    .populate({
      path: "categoryId",
      select: "name",
    })
    .lean();

  const result = subcategories.map((subcategory: any) => {
    return {
      ...subcategory,
      categoryName: subcategory.categoryId.name,
      categoryId: subcategory.categoryId._id,
    };
  });

  return result;
};

export const deleteSubCategory = async (
  subCategoryId: string,
  userId: string
): Promise<boolean> => {
  const result = await SubCategory.updateOne(
    { _id: subCategoryId, userId, delete: { $ne: 1 } },
    { $set: { delete: 1 } }
  );

  return result.modifiedCount > 0;
};

export const getSubcategoriesById = async (
  userId: string,
  subcategoryId: string
): Promise<ISubCategory[]> => {
  const filter: any = {
    userId,
    _id: subcategoryId,
    delete: 0,
  };

  const subcategories = await SubCategory.find(filter)
    .sort({ createdAt: -1 })
    .populate({
      path: "categoryId",
      select: "name",
    })
    .lean();

  const result = subcategories.map((subcategory: any) => {
    return {
      ...subcategory,
      categoryName: subcategory.categoryId.name,
      categoryId: subcategory.categoryId._id,
    };
  });

  return result;
};
