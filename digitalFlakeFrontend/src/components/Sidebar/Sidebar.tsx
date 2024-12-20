import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div
      style={{
        width: "310px",
        height: "92vh",
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #dee2e6",
      }}
    >
      <Nav className="flex-column pt-5">
        <Nav.Item>
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              `nav-link d-flex align-items-center mb-3 fw-semibold  ${
                isActive ? "active text-dark" : "text-muted"
              }`
            }
          >
            <img src="public/home (3) 1.png" className="imgSize" />
            Home
            <img className="arrow" src="public/Vector (2).png" />
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink
            to="/category"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center justify-content-between mb-3 fw-semibold  ${
                isActive ? "active text-dark" : "text-muted"
              }`
            }
          >
            <div className="d-flex align-items-center">
              <img src="public/Group.png" className="imgSize" /> Category
            </div>
            <img className="arrow" src="public/Vector (2).png" />
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink
            to="/subcategory"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center mb-3 fw-semibold ${
                isActive ? "active text-dark" : "text-muted"
              }`
            }
          >
            <img src="public/list 1.png" className="imgSize" /> Subcategory{" "}
            <img className="arrow" src="public/Vector (2).png" />
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center mb-3 fw-semibold ${
                isActive ? "active text-dark" : "text-muted"
              }`
            }
          >
            <img src="public/Group 2609141.png" className="imgSize" />
            Products
            <img className="arrow" src="public/Vector (2).png" />
          </NavLink>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
