import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LogoutModalState } from "../../interface/interface";

const initialState: LogoutModalState = {
  isOpen: false,
  modalType: "",
};

const logoutModalSlice = createSlice({
  name: "logoutModal",
  initialState,
  reducers: {
    openLogoutModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeLogoutModal: (state) => {
      state.isOpen = false;
      state.modalType = "";
    },
  },
});

export const { openLogoutModal, closeLogoutModal } = logoutModalSlice.actions;

export default logoutModalSlice.reducer;
