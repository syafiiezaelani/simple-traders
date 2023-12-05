import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, Button, } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { pricingService, stockListService } from "../../api/endpoints";
import { addStocksList, selectStocksList } from "../../redux/reducers/stocksListSlice";
import { useDispatch, useSelector } from "react-redux";

interface TileProps {
  id: number
}

export const Tile = (props: TileProps) => {
  const [selectedStockName, setSelectedStockName] = useState<string>("");
  const [prices, setPrices] = useState<string[]>([]);
  const [priceCount, setPriceCount] = useState<number>(0);
  const priceCurrency: string = "USD";

  // =========Redux=========
  const dispatch = useDispatch();
  const stockNames = useSelector(selectStocksList);

  const getPriceClass = () => {
    let className = "Price";
    if(prices?.length > 0 ){
      if(prices[priceCount] > prices[priceCount - 1]){
        className = "PriceUp";
      } else if(prices[priceCount] < prices[priceCount - 1]){
        className = "PriceDown";
      }
    }
    return className;
  }
  
  useEffect(()=>{ // Used to get list of stocks to trade with, should run once. 
    console.log("Tile: Get list of stocks.")
    if(stockNames.length === 0){
      const stockListPromise = stockListService();
      stockListPromise.then((value: string[]) => dispatch(addStocksList(value)));
    }

    
  }, [])
  
  useEffect(()=>{ // Gets pricing data based on selected stock name, updates everytime selected stock name changes. 
    console.log("Tile: Get pricing")
    if(selectedStockName){
      pricingService(selectedStockName).then((value: string[] | undefined)=> {
        if(value){
          setPrices(value);
        }
      });
    } 
  }, [selectedStockName])
  
  useEffect(()=>{ // Sets interval for prices to tick. Need to use webSocket to subscribe to pricing instead of doing this. 
    if(prices?.length > 1  && selectedStockName){
      const interval = setInterval(() => {
        setPriceCount(priceCount + 1);
        if(priceCount === prices?.length - 1){
          setPriceCount(0)
        }
      }, 1000);
      
      
      return()=> clearInterval(interval);
    }
  })



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
        onInputChange={(element, event)=> {console.log("setting stock name: ", event); setSelectedStockName(event);}}
      />
      {/* -----------------Pricing display------------------------- */}
      <span className={prices?.length > 1 && selectedStockName ? getPriceClass() : ""} style={{display: "flex", justifyContent: "center", alignItems: "center", height: "3em", margin: "0.5em", fontSize: "1.2em"}}>
        {getPriceClass() === "PriceUp" ? <ArrowDropUp fontSize="large"/> : getPriceClass() === "PriceDown" ? <ArrowDropDown fontSize="large"/> : null}
        <h1>{prices?.length > 1 && selectedStockName ? prices[priceCount] : "-- -- "}</h1>
        <h4 style={{marginLeft: "0.5em"}}>{prices?.length > 1 ? priceCurrency : ""}</h4>
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