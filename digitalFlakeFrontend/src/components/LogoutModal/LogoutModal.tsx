import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeLogoutModal } from "../../States/reducers/logoutModalSlice";
import "./LogoutModal.css";
import { RootState } from "../../States/store";

interface LogoutModalProps {
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onConfirm }) => {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector(
    (state: RootState) => state.logoutModal
  );

  if (!isOpen) return null;

  const getModalContent = () => {
    switch (modalType) {
      case "logout":
        return {
          header: "Log Out",
          body: "Are you sure you want to log out?",
        };
      case "delete":
        return {
          header: "Delete",
          body: "Are you sure you want to delete this item?",
        };
      default:
        return {
          header: "Confirmation",
          body: "Are you sure?",
        };
    }
  };

  const { header, body } = getModalContent();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header */}
        <div className="logOut">
          <img
            src="public/mingcute_alert-fill.png"
            alt="Alert Icon"
            className="alert-icon-size"
          />
          <h3 className=" font-bold text-black">{header}</h3>
        </div>

        {/* Body */}
        <p>{body}</p>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => dispatch(closeLogoutModal())}
            className="delete-button"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              dispatch(closeLogoutModal());
            }}
            className="confirm-button"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
