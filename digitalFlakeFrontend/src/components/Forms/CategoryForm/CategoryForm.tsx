/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import InputField from "../../Common/InputField/InputField";
import UploadFile from "../../Common/UploadFile/UploadFile";
import { saveFormData } from "../../../api/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../../States/store";
import SelectField from "../../Common/SelectField/SelectField";
import "./CategoryForm.css";
import { options } from "../../../interface/interface";

const CategoryForm = ({ setToggle }: { setToggle: () => void }) => {
  const [categoryName, setCategoryName] = useState("");
  const [fileData, setFileData] = useState<File | undefined>();
  const [status, setStatus] = useState("0");
  const [filePreview, setFilePreview] = useState<string>();

  const { categories } = useSelector((state: RootState) => state.categories);

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const id = params.get("id");
  useEffect(() => {
    if (id) {
      const data = categories.filter((ele) => ele._id === params.get("id"));
      setStatus(String(data[0].status));
      setCategoryName(data[0].name);
      setFilePreview(`http://localhost:3000/uploads/${data[0].img}`);
    }
  }, [id]);

  const handleSave = async () => {
    console.log(categoryName, "categoryName");
    if (!categoryName || (!id && !fileData)) {
      alert("Please provide both category name and image.");
      return;
    }

    try {
      const data = new FormData();
      data.append("file", fileData);
      data.append("name", categoryName);
      if (id) {
        data.append("id", id);
        data.append("status", status);
      }

      const response = await saveFormData(data, "category/upsert-category");
      if (response) {
        setCategoryName("");
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
          name="Category Name"
          value={categoryName}
          handleChange={(e) => setCategoryName(e.target.value)}
        />
      </div>

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

      <div className="select-column">
        {id && (
          <SelectField
            labelName={"Status"}
            value={status}
            optionList={options}
            onChange={(e) => setStatus(e.target.value)}
          />
        )}
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

export default CategoryForm;
