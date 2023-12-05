import { configureStore } from "@reduxjs/toolkit";
import stocksListReducer from "./reducers/stocksListSlice"

export const store =  configureStore({
    reducer: {
        stocksList: stocksListReducer,
        // pricing: pricingReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;