import React, { useState } from "react";
import "./CustomTable.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch } from "react-redux";
import { openLogoutModal } from "../../States/reducers/logoutModalSlice";
import FormComponent from "../Form/Form";
import { CustomTableProps } from "../../interface/interface";

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  onAction,
  onSearch,
  title = "",
  fetchData,
}) => {
  const [sortedData, setSortedData] = useState([...data]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 3 && onSearch) {
      onSearch(value);
    }
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  const renderSortIndicator = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  const id = params.get("id");

  return (
    <div className="custom-table-container">
      <div className="table-header">
        {!toggle ? (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="header-left">
                <img
                  className="m-0 icon-he"
                  src={
                    title === "Categories"
                      ? "/public/Group.png"
                      : title === "Sub Category"
                      ? "public/list 1.png"
                      : "public/Group 2609141.png"
                  }
                />
                <span className="title">{title}</span>
              </div>

              <div className="header-right">
                <div className="search-container">
                  <input
                    type="text"
                    className="form-control search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <i className="bi bi-search search-icon"></i>
                </div>
              </div>
            </div>

            <button className="add-button" onClick={() => setToggle(true)}>
              Add New
            </button>
          </>
        ) : (
          <div className="header-left">
            <i
              className="back-arrow bi bi-arrow-left"
              onClick={() => setToggle(false)}
            ></i>
            <img
              className="m-0 icon-he"
              src={
                title === "Categories"
                  ? "/public/Group.png"
                  : title === "Sub Category"
                  ? "public/list 1.png"
                  : "public/Group 2609141.png"
              }
            />
            <span className="title">
              {id ? `Edit ${title}` : `Add ${title}`}
            </span>
          </div>
        )}
      </div>
      {toggle ? (
        <>
          <FormComponent
            title={title}
            setToggle={() => {
              setToggle(false);
              fetchData?.();
            }}
          />
        </>
      ) : (
        <table className="table table-striped table-hover border custom-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={column.sortable ? "sortable" : ""}
                >
                  {column.label}{" "}
                  {column.sortable && renderSortIndicator(column.key)}
                </th>
              ))}
              <th className="action-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr className="border-row" key={rowIndex}>
                {columns.map((column) => (
                  <td className="pt-0 pb-0" key={column.key}>
                    {column.key === "status" ? (
                      <span
                        className={`status-indicator ${
                          row[column.key] === 0
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {row[column.key] === 0 ? "Active" : "Inactive"}
                      </span>
                    ) : column.key === "img" ? (
                      <img
                        className="table-img"
                        src={`http://localhost:3000/uploads/${row[column.key]}`}
                      />
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
                <td>
                  <a
                    className="me-2"
                    onClick={() => {
                      if (onAction) {
                        onAction("edit", row);
                        setToggle(true);
                      }
                    }}
                  >
                    <img className="m-0" src="/public/Group 2609073.png" />
                  </a>
                  <a
                    className=""
                    onClick={() => {
                      if (onAction) onAction("delete", row);
                      dispatch(openLogoutModal("delete"));
                    }}
                  >
                    <img className="ms-1 " src="/public/Group 2609075.png" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomTable;
