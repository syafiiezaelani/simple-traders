import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const stocksListSlice = createSlice({
    name: 'stocksList',
    initialState: {
        list: []
    },
    reducers: {
        addStocksList: (state, action) => {
            console.log("add stocks list: ", action)
            state.list = action.payload
        }
    }
});

export const { addStocksList } = stocksListSlice.actions;

// ==============Selectors ================
export const selectStocksList = (state: RootState) => state.stocksList.list;
export const currentState = (state: RootState) => state;

export default stocksListSlice.reducer; // When you call upon stockListSlice, by default you will be exporting this unless you call for something else. 

