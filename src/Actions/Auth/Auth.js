import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = import.meta.env.VITE_PARKING_URL;
export const startRegUser = createAsyncThunk(
  "user/reg",
  async (formData, { rejectWithValue }) => {
    console.log(url,'url')
    const Api = `${url}/api/users/register`;
    console.log(formData, "form");
    try {
      const response = await axios.post(Api, formData);
      console.log(response.data, "daas");
      return response.data;
    } catch (error) {
      console.log(error, "err");
      return rejectWithValue(error.response?.data);
    }
  }
);
export const startLoginUser = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    const Api = `${url}/api/users/login`;
    console.log(formData, "form");
    console.log(url,'url')
    try {
      const response = await axios.post(Api, formData);
      console.log(response.data, "daas");
      return response.data;
    } catch (error) {
      console.log(error, "err");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const startLogOutUser = createAsyncThunk(
  "user/logout",
  async (formData) => {
    const Api = `${url}/api/logout`;
    try {
      const response = await axios.delete(Api, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formData,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
  }
);
export const startForceLogOut = createAsyncThunk(
  "user/forcelogout",
  async (formData) => {
    const Api = `${url}/api/forceLogout`;
    try {
      const response = await axios.post(Api, formData);
      console.log(response.data, "daas");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
  }
);
export const startForgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (formData, { rejectWithValue }) => {
    const Api = `${url}/api/user/forgotPassword`;
    try {
      const response = await axios.get(Api, { params: formData });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || "An error occurred"
      );
      // throw new Error(error.response?.data?.message || "An error occurred");
    }
  }
);
export const startVerifyPassword = createAsyncThunk(
  "user/verifyPassword",
  async (formData) => {
    const Api = `${url}/api/user/verifyForgotPasswordOtp`;
    try {
      const response = await axios.get(Api, { params: formData });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
  }
);
export const startUpdatePassword = createAsyncThunk(
  "user/updatePassword",
  async (formData) => {
    console.log(formData, "form");
    const Api = `${url}/api/user/updatePassword`;
    try {
      const response = await axios.post(Api, formData);
      console.log(response.data, "res");
      return response.data;
    } catch (error) {
      console.log(error, "err");
      throw new Error(error.response?.data?.message || "An error occurred");
    }
  }
);
const initialState = {
  verifyLoading: false,
  passwordLoading: false,
  otpLoading: false,
  loginLoading: false,
  logOutLoading: false,
  error: null,
  userDetails: null,
};
const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startLoginUser.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(startLoginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("email_id", action.payload.login_id);
        localStorage.setItem("login_id", action.payload.login_id);
        localStorage.setItem("agent_ext", action.payload.agent_ext);
        localStorage.setItem("userId", action.payload.userId);
        localStorage.setItem("role", action.payload.user_type);
        localStorage.setItem("fname", action.payload.first_name);
        localStorage.setItem("lname", action.payload.last_name);
        localStorage.setItem("ext_list", action.payload.ext_list);
        localStorage.setItem("rabbitmq_id", action.payload.rabbitmq_id);
        state.userDetails = action.payload;
      })
      .addCase(startLoginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.error.message;
      })
      .addCase(startForceLogOut.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(startForceLogOut.fulfilled, (state, action) => {
        state.loginLoading = false;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("email_id", action.payload.login_id);
        localStorage.setItem("userId", action.payload.userId);
        localStorage.setItem("role", action.payload.user_type);
        localStorage.setItem("login_id", action.payload.login_id);
        localStorage.setItem("agent_ext", action.payload.agent_ext);
        localStorage.setItem("fname", action.payload.first_name);
        localStorage.setItem("lname", action.payload.last_name);
        localStorage.setItem("ext_list", action.payload.ext_list);
        localStorage.setItem("rabbitmq_id", action.payload.rabbitmq_id);
        state.userDetails = action.payload;
      })
      .addCase(startForceLogOut.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.error.message;
      })
      .addCase(startLogOutUser.pending, (state) => {
        state.logOutLoading = true;
        state.error = null;
      })
      .addCase(startLogOutUser.fulfilled, (state, action) => {
        state.logOutLoading = false;
        localStorage.removeItem("token");
        localStorage.removeItem("fname");
        localStorage.removeItem("lname");
        localStorage.removeItem("role");
        localStorage.removeItem("email_id");
        localStorage.removeItem("agent_ext");
        localStorage.removeItem("ext_list");
      })
      .addCase(startLogOutUser.rejected, (state, action) => {
        state.logOutLoading = false;
        state.error = action.error.message;
      })
      .addCase(startForgotPassword.pending, (state) => {
        state.otpLoading = true;
        state.error = null;
      })
      .addCase(startForgotPassword.fulfilled, (state, action) => {
        state.otpLoading = false;
      })
      .addCase(startForgotPassword.rejected, (state, action) => {
        state.otpLoading = false;
        state.error = action.error.message;
      })
      .addCase(startVerifyPassword.pending, (state) => {
        state.verifyLoading = true;
        state.error = null;
      })
      .addCase(startVerifyPassword.fulfilled, (state, action) => {
        state.verifyLoading = false;
      })
      .addCase(startVerifyPassword.rejected, (state, action) => {
        state.verifyLoading = false;
        state.error = action.error.message;
      })
      .addCase(startUpdatePassword.pending, (state) => {
        state.passwordLoading = true;
        state.error = null;
      })
      .addCase(startUpdatePassword.fulfilled, (state, action) => {
        state.passwordLoading = false;
      })
      .addCase(startUpdatePassword.rejected, (state, action) => {
        state.passwordLoading = false;
        state.error = action.error.message;
      });
  },
});

export default AuthSlice.reducer;
