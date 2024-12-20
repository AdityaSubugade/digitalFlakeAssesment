/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CustomTable from "../CustomTable/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../States/store";
import { fetchSubcategories } from "../../States/reducers/subCategorySlice";

const Subcategory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { subcategories, loading, error } = useSelector(
    (state: RootState) => state.subcategory
  );

  const handleSearch = (searchTerm: string) => {
    dispatch(fetchSubcategories(searchTerm));
  };

  const handleAction = (action: string, row: any) => {
    if (action === "edit") {
      console.log("Edit:", row._id);
      window.history.pushState(null, "", `?id=${row._id}`);
    } else if (action === "delete") {
      console.log("Delete:", row._id);
      window.history.pushState(null, "", `?id=${row._id}`);
    }
  };

  const columns = [
    { key: "_id", label: "Id", sortable: true },
    { key: "name", label: "Sub Category name", sortable: true },
    { key: "categoryName", label: "Category name", sortable: true },
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
          data={subcategories}
          onSearch={handleSearch}
          onAction={handleAction}
          title="Sub Category"
          fetchData={() => dispatch(fetchSubcategories(""))}
        />
      )}
    </div>
  );
};

export default Subcategory;
