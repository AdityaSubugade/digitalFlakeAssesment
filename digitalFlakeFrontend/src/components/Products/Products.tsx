/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../States/store";
import CustomTable from "../CustomTable/CustomTable";
import { fetchProductData } from "../../States/reducers/productSlice";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  const handleSearch = (searchTerm: string) => {
    dispatch(fetchProductData(searchTerm));
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
    { key: "name", label: "Product name", sortable: true },
    { key: "img", label: "Image" },
    { key: "subcategoryName", label: "Sub Category name", sortable: true },
    { key: "categoryName", label: "Category name", sortable: true },
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
          data={products}
          onSearch={handleSearch}
          onAction={handleAction}
          title="Product"
          fetchData={() => dispatch(fetchProductData(""))}
        />
      )}
    </div>
  );
};

export default Products;
