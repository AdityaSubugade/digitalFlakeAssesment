import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteApi, logoutApi } from "../api/auth";
import Header from "../components/Header/Header";
import LogoutModal from "../components/LogoutModal/LogoutModal";
import Sidebar from "../components/Sidebar/Sidebar";
import { fetchCategories } from "../States/reducers/categorySlice";
import { fetchProductData } from "../States/reducers/productSlice";
import { fetchSubcategories } from "../States/reducers/subCategorySlice";
import { AppDispatch, RootState } from "../States/store";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isModalOpen = useSelector(
    (state: RootState) => state.logoutModal.isOpen
  );
  const modalType = useSelector(
    (state: RootState) => state.logoutModal.modalType
  );

  const handleLogout = async () => {
    try {
      if (modalType === "logout") {
        await logoutApi();
        navigate("/");
      } else {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const isCategoryInUrl =
          window.location.pathname.startsWith("/category");
        const isSubCategoryInUrl =
          window.location.pathname.startsWith("/subcategory");
        const isProductInUrl = window.location.pathname.startsWith("/products");

        const id = params.get("id");

        if (isCategoryInUrl && id) {
          await deleteApi(`category/delete-categories/${id}`);
          await dispatch(fetchCategories(""));
        } else if (isProductInUrl && id) {
          await deleteApi(`products/delete-product/${id}`);
          await dispatch(fetchProductData(""));
        } else if (isSubCategoryInUrl && id) {
          await deleteApi(`subcategory/delete-subcategories/${id}`);
          await dispatch(fetchSubcategories(""));
        }
        navigate(
          isCategoryInUrl
            ? "/category"
            : isSubCategoryInUrl
            ? "/subcategory"
            : "/products"
        );
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  useEffect(() => {
    dispatch(fetchCategories(""));
    dispatch(fetchSubcategories(""));
    dispatch(fetchProductData(""));
  }, [dispatch]);
  return (
    <>
      {/* Header Section */}
      <div className="header">
        <Header />
      </div>

      {/* Main Layout */}
      <div style={{ display: "flex", height: "91.5vh" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div style={{ padding: "20px", flex: "1" }}>{children}</div>
      </div>

      {/* Logout Confirmation Modal */}
      {isModalOpen && <LogoutModal onConfirm={handleLogout} />}
    </>
  );
};

export default LayoutWrapper;
