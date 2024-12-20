/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import InputField from "../../Common/InputField/InputField";
import UploadFile from "../../Common/UploadFile/UploadFile";
import SelectField from "../../Common/SelectField/SelectField";
import { useSelector } from "react-redux";
import { RootState } from "../../../States/store";
import { saveFormData } from "../../../api/auth";
import "./SubCategoryForm.css";

const options = [
  {
    label: "Active",
    value: "0",
  },
  {
    label: "Inactive",
    value: "1",
  },
];

const SubCategoryForm = ({ setToggle }: { setToggle: () => void }) => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filePreview, setFilePreview] = useState<string>();
  const [fileData, setFileData] = useState<File | undefined>();
  const [status, setStatus] = useState("0");

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const id = params.get("id");
  useEffect(() => {
    if (id) {
      const data = subcategories.filter((ele) => ele._id === params.get("id"));
      setStatus(String(data[0]?.status));
      setSubCategoryName(data[0]?.name);
      setSelectedCategory(data[0]?.categoryId);
      setFilePreview(`http://localhost:3000/uploads/${data[0].img}`);
    }
  }, [id]);

  const { categories } = useSelector((state: RootState) => state.categories);

  const { subcategories } = useSelector(
    (state: RootState) => state.subcategory
  );

  const handleSave = async () => {
    if (!subCategoryName || (!id && !fileData)) {
      alert("Please provide both category name and image.");
      return;
    }

    try {
      const data = new FormData();
      data.append("file", fileData);
      data.append("name", subCategoryName);
      data.append("categoryId", selectedCategory);
      if (id) {
        data.append("id", id);
        data.append("status", status);
      }

      const response = await saveFormData(
        data,
        "subcategory/upsert-subcategories"
      );
      if (response) {
        setSubCategoryName("");
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
      <div className="form-row">
        <div className="form-column">
          <InputField
            name="Sub Category name"
            value={subCategoryName}
            handleChange={(e) => {
              setSubCategoryName(e.target.value);
            }}
          />
        </div>

        <div className="form-column">
          <SelectField
            labelName={"Category"}
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            optionList={categories.map((ele) => {
              return { label: ele.name, value: ele._id };
            })}
          />
        </div>

        {id && (
          <div className="form-column">
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
      </div>

      <div className="form-row">
        <div className="form-column-full">
          <UploadFile
            handleImageChange={(e) => {
              const file = e?.target?.files?.[0];
              if (file && file.size <= 10 * 1024 * 1024) {
                setFileData(file);
                setFilePreview(URL.createObjectURL(file));
              } else {
                alert("File size exceeds 10MB");
              }
            }}
            preview={filePreview}
          />
        </div>
      </div>

      <div className="category-button">
        <button className="me-4 bg-white" onClick={() => setToggle()}>
          Cancel
        </button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default SubCategoryForm;
