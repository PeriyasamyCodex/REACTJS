import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import { fetchAvailablePlaces } from '../http.js';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  const [isFetchLoading, setIsFetchLoading] = useState(false);

  useEffect(() => {
    async function fetchPlace() {
      try {
        setIsFetchLoading(true);
        const places = await fetchAvailablePlaces();
        console.log('places '+places);
        setAvailablePlaces(places);
        setIsFetchLoading(false);
      } catch (error) {
        setError({ message: error.message || 'Unable to Fetch Places, Please Try Later' });
        setIsFetchLoading(false);
      }
    }
    fetchPlace();

  }, []);

  if (error) {
    return <Error title="An Error Occured!" message={error.message}></Error>
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isFetchLoading={isFetchLoading}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
