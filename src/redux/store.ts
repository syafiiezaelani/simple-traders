import { configureStore } from "@reduxjs/toolkit";
import stocksListReducer from "./reducers/stocksListSlice";
import  stocksPriceMapReducer from "./reducers/stocksPriceSlice";
import stocksDayPricesReducer from "./reducers/stocksDayPricesSlice";

export const store =  configureStore({
    reducer: {
        stocksList: stocksListReducer,
        stocksPriceMap: stocksPriceMapReducer,
        stocksDayPrices: stocksDayPricesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
