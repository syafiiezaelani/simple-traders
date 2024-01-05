import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface StocksDayPrices {
    stockTicker: string;
    prices: StockChartServerPrices[]
}

export interface StockChartServerPrices {
    price: string;
    time: string[];
}

let initialState: StocksDayPrices[] = [];


export const stocksDayPricesSlice = createSlice({
    // Response from server will have 2 attributes, stockTicker & price
    // Cant use a map, but without a map i.e. an array would hamper performance. 

    name: 'stocksDayPrices',
    initialState: {
        stocksDayPrices: initialState
    },
    reducers: {
        //TODO: Can't use map in redux, using object instead. 
        addChartPrices: (state, action) => {
            const stockTicker: string = action.payload.stockTicker;
            const prices = action.payload.prices;
            state.stocksDayPrices.push({
                stockTicker: stockTicker,
                prices: prices 
            })
            
        }
    }
});

export const { addChartPrices } = stocksDayPricesSlice.actions;

// ==============Selectors ================
export const selectChartPrices = (state: RootState) => state.stocksDayPrices;

export default stocksDayPricesSlice.reducer; 

