import { WebsocketRequestTypes } from "../enum/enum";
import { GeneralWebsocketRequest, PricingRequest } from "./websocketInterface";

export const ws = new WebSocket("ws://localhost:8082");// If use this command multiple times would it affect anything? all it does is listen to 8082 port no?

export const webSocketOnOpen = () => ws.addEventListener("open",()=> {
    console.log("Client connected to websocket server")
    webSocketSendMessage({
        type: "START_REQUEST",
        value: null
    })
})

export const webSocketOnClose = () => ws.addEventListener("close", ()=>{
    console.log("Client websocket closed.")
})


export const webSocketSendMessage = (sendObject: GeneralWebsocketRequest) => {
    console.log("sending message to websocket: ", sendObject)
    ws.send(JSON.stringify(sendObject));
}

export const webSocketReceiveMessage = (messageHandlerCallback: any) => {
ws.addEventListener('message', (message) => {
    const receivedData = JSON.parse(message.data) as GeneralWebsocketRequest;
    console.log("Received message from websocket, ", receivedData)
    messageHandlerCallback(receivedData);
})
}

export const webSocketPricingRequest = (selectedStockName: string, componentType: string) => {
    const webSocketRequest: PricingRequest = {
        type: "PRICING_REQUEST",
        value: {
          selectedPriceString: selectedStockName,
          componentType: componentType
        }
      }
      webSocketSendMessage(webSocketRequest);
}

export const webSocketCloseRequest = (selectedStockName: string) => {
    console.log("close request", selectedStockName)
    const request: GeneralWebsocketRequest = {
        type: WebsocketRequestTypes.COMPONENT_CLOSE,
        value: selectedStockName 
    }
    console.log("Send request to close component", request)
    webSocketSendMessage(request);
}