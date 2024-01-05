export enum ComponentTypes {
    TILE = "TILE",
    BLOTTER = "BLOTTER",
    CHART = "CHART"

}

export enum WebsocketRequestTypes {
    START = "START",
    PRICING_REQUEST = "PRICING_REQUEST",
    COMPONENT_CLOSE =  "COMPONENT_CLOSE_REQUEST"
}

export enum WebsocketResponseTypes {
    TILE_PRICING_RESPONSE = "TILE_PRICING_RESPONSE",
    CHART_PRICING_RESPONSE = "CHART_PRICING_RESPONSE",
    START_RESPONSE = "START_RESPONSE",
    COMPONENT_CLOSE_RESPONSE = "COMPONENT_CLOSE_RESPONSE"
}

/* 

WEBSOCKET SERVER INTERFACE: 

export const ComponentTypes = {
    TILE : "TILE",
    BLOTTER: "BLOTTER",
    CHART: "CHART"

}

export const WebsocketRequestTypes = {
    START: "START_REQUEST",
    PRICING_REQUEST: "PRICING_REQUEST",
    COMPONENT_CLOSE: "COMPONENT_CLOSE_REQUEST"

}

export const WebsocketResponseTypes = {
    TILE_PRICING_RESPONSE: "TILE_PRICING_RESPONSE",
    CHART_PRICING_RESPONSE: "CHART_PRICING_RESPONSE",
    START_RESPONSE: "START_RESPONSE",
    COMPONENT_CLOSE_RESPONSE: "COMPONENT_CLOSE_RESPONSE"
}

*/