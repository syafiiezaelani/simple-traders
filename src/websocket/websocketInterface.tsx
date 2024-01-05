// There is no specific structure for websocket, so it allows for flexibility. 

export interface GeneralWebsocketRequest {
    type: string,
    value: any;
}

export interface GeneralWebsocketResponse {
    type: string,
    value: any;
}

export interface PricingRequest {
    type: string,
    value: {
        selectedPriceString: string,
        componentType: string
    }
}