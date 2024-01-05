import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const stocksPriceMapSlice = createSlice({
    // Response from server will have 2 attributes, stockTicker & price
    // Cant use a map, but without a map i.e. an array would hamper performance. 

    name: 'stocksPriceMap',
    initialState: {
        stocksPriceMap: {}
    },
    reducers: {
        //TODO: Can't use map in redux, using object instead. 
        addStockPrice: (state, action) => {
            console.log("add stock price: ", action)
            const stockTicker: string = action.payload.stockTicker;
            const price: number = action.payload.price;
            let mutableStocksPriceMap: any = {...state.stocksPriceMap};
            if(!mutableStocksPriceMap[stockTicker]){
                mutableStocksPriceMap = {
                    ...mutableStocksPriceMap,
                    [`${stockTicker}`]: price
                }
            }else{
                mutableStocksPriceMap[stockTicker] = price;
            }
            state.stocksPriceMap = {
                ...mutableStocksPriceMap
            }
        }
    }
});

export const { addStockPrice } = stocksPriceMapSlice.actions;

// ==============Selectors ================
export const selectPriceMap = (state: RootState) => state.stocksPriceMap;

export default stocksPriceMapSlice.reducer; 

