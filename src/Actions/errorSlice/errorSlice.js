import { createSlice } from "@reduxjs/toolkit";
const errorSlice = createSlice({
  name: "error",
  initialState: { open: false, msg: "", type: "error", message: "" },
  reducers: {
    setError: (state, action) => {
      state.open = true;
      state.msg = action.payload.msg;
      state.type = action.payload.type;
      state.message = action.payload.message || "Server Error";
    },
    clearError: (state) => {
      state.open = false;
      state.msg = "";
      state.message = "";
    },
  },
});
export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
