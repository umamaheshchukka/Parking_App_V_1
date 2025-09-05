import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = import.meta.env.VITE_PARKING_URL;
export const startRegPlace = createAsyncThunk(
  "user/reg",
  async (formData, { rejectWithValue }) => {
    const Api = `${url}/api/parking-spaces/register`;
    try {
      const response = await axios.post(Api, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data, "daas");
      return response.data;
    } catch (error) {
      console.log(error, "err");
      return rejectWithValue(error.response?.data);
    }
  }
);
export const startUpdatePlace = createAsyncThunk(
  "user/reg",
  async (data, { rejectWithValue }) => {
    const Api = `${url}/api/parking-spaces/update/${data?.id}`;
    try {
      const response = await axios.put(Api, data.formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data, "daas");
      return response.data;
    } catch (error) {
      console.log(error, "err");
      return rejectWithValue(error.response?.data);
    }
  }
);
export const startRemovePlace = createAsyncThunk(
  "user/reg",
  async (id, { rejectWithValue }) => {
    const Api = `${url}/api/parking-spaces/${id}`;
    try {
      const response = await axios.delete(Api, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data, "daas");
      return response.data;
    } catch (error) {
      console.log(error, "err");
      return rejectWithValue(error.response?.data);
    }
  }
);
export const startGetPlacesByOwnerId = createAsyncThunk(
  "owner/parkingspaces",
  async (_, { rejectWithValue }) => {
    const Api = `${url}/api/parking-spaces/my`;
    try {
      const response = await axios.get(Api, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data, "daas");
      return response.data;
    } catch (error) {
      console.log(error, "err");
      return rejectWithValue(error.response?.data);
    }
  }
);

const initialState = {
  placeAddLoading: false,
  parkingList: [],
  parkingListLoading: false,
};
const ParkingPlacess = createSlice({
  name: "ParkingPlacess",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startGetPlacesByOwnerId.pending, (state) => {
        state.parkingListLoading = true;
        state.error = null;
      })
      .addCase(startGetPlacesByOwnerId.fulfilled, (state, action) => {
        state.parkingListLoading = false;
        state.parkingList = action.payload;
      })
      .addCase(startGetPlacesByOwnerId.rejected, (state, action) => {
        state.parkingListLoading = false;
        state.error = action.error.message;
      });
  },
});

export default ParkingPlacess.reducer;
