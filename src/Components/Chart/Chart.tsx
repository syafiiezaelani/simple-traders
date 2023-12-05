import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from "recharts";
import { stockListService, chartPricingService } from "../../api/endpoints";
import { selectStocksList, addStocksList } from "../../redux/reducers/stocksListSlice";
import { Autocomplete, TextField } from "@mui/material";

export const Chart = () => {
    // Redux 
    const stockNames = useSelector(selectStocksList);
    const dispatch = useDispatch();

    // Local state variables
    const [selectedStockName, setSelectedStockName] = useState<string>("");
    const [prices, setPrices] = useState<string[]>([]);

    //TODO: Figure out how to organize all of this useEffects, or is there a better way to do this.
    
    useEffect(()=>{ // Used to get list of stocks to trade with, should run once. 
        console.log("Chart: Get list of stocks.")
        if(stockNames.length === 0){
          const stockListPromise = stockListService();
          stockListPromise.then((value: string[]) => dispatch(addStocksList(value)));
        }
    
        
      }, [])

      useEffect(()=>{ // Gets pricing data based on selected stock name, updates everytime selected stock name changes. 
        if(selectedStockName){
            chartPricingService(selectedStockName).then((value: any[] | undefined)=> {
                if(value){
                console.log("Chart: Get pricing", value)
              setPrices(value);
            }
          });
        } 
      }, [selectedStockName])

    return(
        <div style={{margin: "0.5em", height: "100%", width: "100%", display: "flex", flexDirection: "column"}}>
            <Autocomplete
                size="small"
                disablePortal
                id="stock-search-box"
                options={stockNames.length > 0 ? stockNames : []}
                sx={{ 
                width: "30%",
                minWidth: "4em"
                }}
                renderInput={(params) => <TextField {...params} label="Stock Tickers" />}
                onInputChange={(element, event)=> {console.log("setting stock name: ", event); setSelectedStockName(event);}}
            />
            { selectedStockName.length === 0 ? <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%"}}>
                <h1>No Stock Ticker Selected</h1>
            </div> :
            prices.length === 0 ? 
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%"}}>
              <h1> No Data to show </h1>
            </div> :
            <ResponsiveContainer width={"95%"} height={"80%"} style={{ marginTop: "0.5em", marginBottom: "0.5em", color: "white"}}>
                <LineChart
                    data={prices}
                    >
                    <XAxis dataKey="time" tickLine={{ stroke: 'white' }} axisLine={{ stroke: 'white' }} stroke="#fcfffd" />
                    <YAxis tickLine={{ stroke: 'white' }} axisLine={{ stroke: 'white' }} stroke="#fcfffd"/>
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            }
        </div>
    )
}