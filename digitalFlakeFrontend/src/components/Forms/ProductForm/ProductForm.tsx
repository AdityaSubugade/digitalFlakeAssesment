/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import InputField from "../../Common/InputField/InputField";
import SelectField from "../../Common/SelectField/SelectField";
import UploadFile from "../../Common/UploadFile/UploadFile";
import { useSelector } from "react-redux";
import { RootState } from "../../../States/store";
import { Subcategory } from "../../../States/reducers/subCategorySlice";
import { saveFormData } from "../../../api/auth";
import { options } from "../../../interface/interface";

const ProductForm = ({ setToggle }: { setToggle: () => void }) => {
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [fileData, setFileData] = useState<File | undefined>();
  const [subCategoriesList, setSubCategoriesList] = useState<Subcategory[]>([]);
  const [status, setStatus] = useState("0");
  const { categories } = useSelector((state: RootState) => state.categories);
  const { subcategories } = useSelector(
    (state: RootState) => state.subcategory
  );
  const { products } = useSelector((state: RootState) => state.product);
  const [filePreview, setFilePreview] = useState<string>();

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const id = params.get("id");
  useEffect(() => {
    if (id) {
      const data = products?.filter((ele) => ele._id === params.get("id"));
      setStatus(String(data[0]?.status));
      setProductName(data[0]?.name);
      setSelectedCategory(data[0]?.categoryId);
      setSelectedSubCategory(data[0]?.subcategoryId);
      setFilePreview(`http://localhost:3000/uploads/${data[0]?.img}`);
    }
  }, [id]);

  const handleSave = async () => {
    if (!productName || (!id && !fileData)) {
      alert("Please provide both category name and image.");
      return;
    }

    try {
      const data = new FormData();
      data.append("file", fileData);
      data.append("name", productName);
      data.append("categoryId", selectedCategory);
      data.append("subcategoryId", selectedSubCategory);

      if (id) {
        data.append("id", id);
        data.append("status", status);
      }

      const response = await saveFormData(data, "products/upsert-product");
      if (response) {
        setProductName("");
        setFileData(undefined);
        alert("Category successfully created!");
        setToggle();
      }
    } catch (error) {
      alert("Failed to create category. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <div className="input-column">
        <InputField
          name="Product name"
          value={productName}
          handleChange={(e) => {
            setProductName(e.target.value);
          }}
        />
      </div>

      <div className="select-column">
        <SelectField
          labelName={"Category"}
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSubCategoriesList(
              subcategories.filter((ele) => ele.categoryId === e.target.value)
            );
          }}
          optionList={categories.map((ele) => {
            return {
              label: ele.name,
              value: ele._id,
            };
          })}
        />
      </div>

      <div className="select-column">
        <SelectField
          labelName={"Subcategory"}
          value={selectedSubCategory}
          onChange={(e) => {
            setSelectedSubCategory(e.target.value);
          }}
          optionList={
            subCategoriesList
              ? subCategoriesList.map((ele) => {
                  return {
                    label: ele.name,
                    value: ele._id,
                  };
                })
              : []
          }
        />
      </div>

      {id && (
        <div className="select-column">
          <SelectField
            labelName={"Status"}
            value={status}
            optionList={options}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
        </div>
      )}

      <div className="upload-column">
        <UploadFile
          handleImageChange={(e) => {
            const file = e?.target?.files?.[0];
            if (file && file.size <= 10 * 1024 * 1024) {
              // 10MB limit
              setFileData(file);
              setFilePreview(URL.createObjectURL(file));
            } else {
              alert("File size exceeds 10MB");
            }
          }}
          preview={filePreview}
        />
      </div>

      <div className="category-button">
        <div className="category-button">
          <button className="me-4 bg-white" onClick={() => setToggle()}>
            Cancel
          </button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
