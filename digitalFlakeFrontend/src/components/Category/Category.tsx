/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomTable from "../CustomTable/CustomTable";
import { AppDispatch, RootState } from "../../States/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../States/reducers/categorySlice";

const Category: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  const handleSearch = (searchTerm: string) => {
    dispatch(fetchCategories(searchTerm)); // Fetch categories based on search term
  };

  const handleAction = (action: string, row: any) => {
    if (action === "edit") {
      console.log("Edit:", row._id);
      // Add the row._id to the URL (without navigating)
      window.history.pushState(null, "", `?id=${row._id}`);
    } else if (action === "delete") {
      console.log("Delete:", row._id);
      // Add the row._id to the URL (without navigating)
      window.history.pushState(null, "", `?id=${row._id}`);
    }
  };

  const columns = [
    { key: "_id", label: "Id", sortable: true },
    { key: "name", label: "Category name", sortable: true },
    { key: "img", label: "Image" },
    { key: "status", label: "Status", sortable: true },
  ];

  return (
    <div style={{ height: "100%" }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CustomTable
          columns={columns}
          data={categories}
          onSearch={handleSearch}
          onAction={handleAction}
          title="Categories"
          fetchData={() => dispatch(fetchCategories(""))}
        />
      )}
    </div>
  );
};
export default Category;
