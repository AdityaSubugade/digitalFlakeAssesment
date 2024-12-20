import CategoryForm from "../Forms/CategoryForm/CategoryForm";
import SubCategoryForm from "../Forms/SubCategoryForm/SubCategoryForm";
import ProductForm from "../Forms/ProductForm/ProductForm";

const FormComponent = ({
  title,
  setToggle,
}: {
  title: string;
  setToggle: () => void;
}) => {
  const renderForm = () => {
    switch (title) {
      case "Categories":
        return <CategoryForm setToggle={setToggle} />;

      case "Sub Category":
        return <SubCategoryForm setToggle={setToggle} />;
      case "Product":
        return <ProductForm setToggle={setToggle} />;
      default:
    }
  };

  return (
    <div className="form-contener" style={{ height: "calc(100% - 55px)" }}>
      {renderForm()}
    </div>
  );
};

export default FormComponent;
