import { useEffect, useState } from "react";

export function useFetch(fetchFn,intialValue) {

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState(intialValue);
  useEffect(() => {
    async function getUserPlace() {
      try {
        setIsLoading(true);
        const userPlaces = await fetchFn();
        console.log(`useFect Data -> ${fetchFn}`+JSON.stringify(userPlaces));
        setFetchData(userPlaces);
       
      } catch (error) {
        setIsLoading(false);
        setError({ message: error.message || 'Failed to Fetch User Places' })
      }
      setIsLoading(false);
    }
    getUserPlace();

  }, [fetchFn]);


 // console.log('useFetch '+JSON.stringify({ fetchData, error, isLoading, setFetchData }));

  return { fetchData, error, isLoading, setFetchData };


}