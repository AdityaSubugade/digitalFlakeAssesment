import React from "react";
import { useDispatch } from "react-redux";
import "./Header.css";
import { openLogoutModal } from "../../States/reducers/logoutModalSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <nav className="navbar px-3">
      <img
        src="public/Group 2609047 (1) 9.png"
        style={{ height: "26px", width: "170px" }}
        alt="background"
      />

      <div>
        <a onClick={() => dispatch(openLogoutModal("logout"))}>
          <img
            className="icon"
            src="public/Group 2609118.png"
            alt="logout icon"
            style={{ cursor: "pointer" }}
          />
        </a>
      </div>
    </nav>
  );
};

export default Header;
