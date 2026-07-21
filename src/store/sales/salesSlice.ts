import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DSale } from "@/types";

interface SalesState {
  list: DSale[];
}

const initialState: SalesState = {
  list: [],
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    updateSalesList(state, action: PayloadAction<DSale[]>) {
      state.list = action.payload;
    },
  },
});

export const { updateSalesList } = salesSlice.actions;

export const selectSalesList = (state: { sales: SalesState }) => state.sales.list;

export default salesSlice.reducer;
