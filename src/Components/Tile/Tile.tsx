import { useEffect, useRef, useState } from "react";
import { TextField, Autocomplete, Button, } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { selectStocksList } from "../../redux/reducers/stocksListSlice";
import { useSelector } from "react-redux";
import { webSocketPricingRequest, webSocketCloseRequest } from "../../websocket/websocketUtilities";
import { selectPriceMap } from "../../redux/reducers/stocksPriceSlice";

interface TileProps {
  id: number
}

export const Tile = (props: TileProps) => {
  const [selectedStockName, setSelectedStockName] = useState<string>("");
  const refSelectedStockName = useRef("");// With useEffect, it takes the value of the variable when it was called, so if useEffect is running once, it wont get updated values, that's why you need useRef.
  const priceCurrency: string = "USD";

  const stockNames = useSelector(selectStocksList);
  const pricesObject: any = useSelector(selectPriceMap); // TODO: Update typeof any, its any cause redux doesnt allow use of map
  const currentPrice: string = pricesObject.stocksPriceMap[selectedStockName] ? pricesObject.stocksPriceMap[selectedStockName] : '-- --';
  const previousPrice = useRef('0');

  const getPriceClass = () => {
    let className = "Price";
    const parsedCurrent = parseFloat(currentPrice);
    const parsedPrevious = parseFloat(previousPrice.current);

    if(!isNaN(parsedCurrent) && !isNaN(parsedPrevious)){
      className = parsedCurrent > parsedPrevious ? "PriceUp" : parsedCurrent < parsedPrevious ? "PriceDown" : "PriceSame"
    }// PriceSame has no styling as of now.
    return className;
  }

  useEffect(()=>{
    // Updates previous pricing for styling updates. 
    previousPrice.current = currentPrice;
  }, [currentPrice])
    
  useEffect(()=>{
    // Gets pricing data based on selected stock name, updates everytime selected stock name changes. 
    if(selectedStockName){
      webSocketPricingRequest(selectedStockName, "TILE");
      refSelectedStockName.current = selectedStockName;
    }
  }, [selectedStockName])
  
  useEffect(()=>{
    // Used to handle when component first launches and return component is for when component closes.
    console.log("Tile launched");

    return ()=>{
      webSocketCloseRequest(refSelectedStockName.current)
      console.log("Tile closed", refSelectedStockName)
      
    }
  }, [])
  

  return(
    <div style={{padding: "0.5em"}}>
      {/* ------------------Stock dropdown selection--------------- */}
      <Autocomplete
        size="small"
        disablePortal
        id="stock-search-box"
        options={stockNames.length > 0 ? stockNames : []}
        sx={{ 
          width: "90%",
        }}
        renderInput={(params) => <TextField {...params} label="Stock Tickers" />}
        onInputChange={(element, event)=> {
          console.log("setting stock name: ", event);
          setSelectedStockName(event);
        }}
      />
      {/* -----------------Pricing display------------------------- */}
      <span className={getPriceClass()} style={{display: "flex", justifyContent: "center", alignItems: "center", height: "3em", margin: "0.5em", fontSize: "1.2em"}}>
        {getPriceClass() === "PriceUp" ? <ArrowDropUp fontSize="large"/> : getPriceClass() === "PriceDown" ? <ArrowDropDown fontSize="large"/> : null}
        <h1>{currentPrice}</h1>
        <h4 style={{marginLeft: "0.5em"}}>{currentPrice !==  "-- --" ? priceCurrency : ""}</h4>
      </span>
        {/* -----------------Inputs------------------ */}
      <span className="PriceInput" style={{display: " flex", alignItems: "center", fontSize: "1em", paddingBottom: "0.5em",}}>
        $
        <TextField id="outlined-basic" label="Order Price" variant="outlined" size="small" color="secondary" sx={{marginLeft: "0.5em", marginRight: "0.5em"}} 
        />
        USD
      </span>
      <span className="QuantityInput" style={{display: " flex", alignItems: "center", fontSize: "1em", }}>
        <TextField id="outlined-basic" label="Quantity" variant="outlined" size="small" color="secondary" sx={{marginRight: "0.5em"}}
        />
        Shares
      </span>

      <span className="BuyAndSellButtons" style={{display: "flex", justifyContent: "space-around", marginTop: "1em"}}>
      <Button variant="contained" size="small">BUY</Button>
      <Button variant="contained" size="small">SELL</Button>
      </span>
    </div>
  );
}