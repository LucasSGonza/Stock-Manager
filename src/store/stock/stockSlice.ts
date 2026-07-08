import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DClothing } from "@/types";

interface StockState {
  list: DClothing[];
}

const initialState: StockState = {
  list: [],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    updateStockList(state, action: PayloadAction<DClothing[]>) {
      state.list = action.payload;
    },
  },
});

export const { updateStockList } = stockSlice.actions;

export const selectStockList = (state: { stock: StockState }) => state.stock.list;

export default stockSlice.reducer;
