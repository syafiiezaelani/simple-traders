import React, { useEffect } from "react";
import { webSocketOnOpen, webSocketOnClose, webSocketReceiveMessage } from "./websocketUtilities";
import { GeneralWebsocketResponse } from "./websocketInterface";
import { useDispatch } from "react-redux";
import { addStocksList } from "../redux/reducers/stocksListSlice";
import { WebsocketResponseTypes } from "../enum/enum";
import { addStockPrice } from "../redux/reducers/stocksPriceSlice";
import { addChartPrices } from "../redux/reducers/stocksDayPricesSlice";

export const LocalWebSocket = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        webSocketOnOpen();
        webSocketOnClose();
        webSocketReceiveMessage(handleReceivedMessage);
    }, [])

    const handleReceivedMessage = (data: GeneralWebsocketResponse) => {
        // Update redux state once received data. 
        if(!data.value){
            return;
        }
        const serverDataValue = data.value;
        
        switch(data.type){
            case WebsocketResponseTypes.START_RESPONSE:
                console.log("Handling start data from websocket", serverDataValue )
                dispatch(addStocksList(serverDataValue));// TODO: Find a way to update redux without using Hooks.
                break;

            case WebsocketResponseTypes.TILE_PRICING_RESPONSE: 
                console.log("Handling tile pricing response ",serverDataValue);
                dispatch(addStockPrice(serverDataValue));
                break;
            
            case WebsocketResponseTypes.CHART_PRICING_RESPONSE:
                console.log("Handling chart pricing response ", data);
                dispatch(addChartPrices(serverDataValue));
                break;

        }
    }

    return(null)
}