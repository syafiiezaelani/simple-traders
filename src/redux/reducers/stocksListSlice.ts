import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const stocksListSlice = createSlice({
    name: 'stocksList',
    initialState: {
        list: []
    },
    reducers: {
        addStocksList: (state, action) => {
            state.list = action.payload
        }
    }
});

export const { addStocksList } = stocksListSlice.actions;

// ==============Selectors ================
export const selectStocksList = (state: RootState) => state.stocksList.list;

export default stocksListSlice.reducer; // When you call upen sotcksListSlice, by default you will be exporting this unless you call for something else. 

