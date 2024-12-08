import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(apiURL,config) {
  console.log('sendHttpRequest config'+apiURL+'  '+JSON.stringify(config));
 const response =  await fetch(apiURL,config);
 const jsonResponse = response.json();
 if (!response.ok){
     throw new Error('Failed to Fetch Meals Items');
 }
  
 return jsonResponse;
}


export default function useFetch(apiURL, config) {

    const [respData, setRespData] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async function fetchApi(data) {
        try { 
            setIsLoading(true);
            console.log('apiURL useFetch '+apiURL);
            const response = await sendHttpRequest(apiURL, {...config, body: data});
            console.log('jsonResponse'+response);
            setRespData(response);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error || 'Failed to Fetch Data');
        }
    },  [apiURL, config]);

    useEffect(() => {
      
        if(config && config.method === 'GET'){
            sendRequest();
        }
       
       
    }, [apiURL]);

    return { respData, error, isLoading, sendRequest }

}