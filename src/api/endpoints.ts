import axios from "axios";

export const stockListService =async () => {

    const options = {
        method: 'GET',
        url: 'https://mboum-finance.p.rapidapi.com/tr/trending',
        headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_MBOUM_KEY}`,// TODO: Figure out how to hid API before pushing to git, can also choose to ignore but just find out how to hide it in the first place.
            'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
        }
    };
    
    console.log("stock service running")
    try {
        const response = await axios.request(options);
        return response.data.body;
    } catch (error) {
        console.error(error);
    }
}

export const pricingService = async(selectedTicker: string) => {
    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            interval: '5min',
            function: 'TIME_SERIES_INTRADAY',
            symbol: `${selectedTicker}`,
            datatype: 'json',
            output_size: 'compact'
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_ALPHA_KEY,
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };
    
    try {
        const response = await axios.request(options);
        const openValues: string[] = [];
        const pricingObjects = response.data["Time Series (5min)"];
        
        for (const timestamp in pricingObjects) {
            const stringTime = timestamp.toString();
            const value = pricingObjects[stringTime]["1. open"];
            const editedValue = value.slice(0, value.length - 2)// TODO: Use regex to do it instead of this, cause there is a chance that this would fail. 
            openValues.push(editedValue);
        }
        console.log("tile pricing service running", openValues);
    return openValues;
    } catch (error) {
        console.error(error);
    }
}

export const chartPricingService = async(selectedTicker: string) => {
    const regex = new RegExp("..:..");// TODO: For now this works but obviously stupid. Figure out how to make this better.

    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            interval: '5min',
            function: 'TIME_SERIES_INTRADAY',
            symbol: `${selectedTicker}`,
            datatype: 'json',
            output_size: 'compact'
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_ALPHA_KEY,
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };
    
    try {
        const response = await axios.request(options);
        const openValues: any[] = [];
        const pricingObjects = response.data["Time Series (5min)"];
        
        for (const timestamp in pricingObjects) {
            const stringTime = timestamp.toString();
            // const value = pricingObjects[stringTime]["1. open"];
            const time = regex.exec(stringTime);
            const newObject = {
                price: pricingObjects[stringTime]["1. open"],
                time: time
            }
            openValues.push(newObject);
        }
        console.log("chart pricing service running", openValues);
    return openValues;
    } catch (error) {
        console.error(error);
    }
}