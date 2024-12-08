import { useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';
const TIMER = 3000;

function App() {
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);
  const [sortedPlaces, setSortedPlaces] =  useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  

  useEffect(()=>{
  //  setSortedPlaces(AVAILABLE_PLACES);
    navigator.geolocation.getCurrentPosition((position)=> {
   
    const sortedPlacesByDisctance = sortPlacesByDistance(AVAILABLE_PLACES,position.coords.latitude, position.coords.longitude);
  
    setSortedPlaces(sortedPlacesByDisctance);

    const pickedPlacesIds = JSON.parse(localStorage.getItem('pickedPlaces')) || [];
    console.log('pickedPlacesIds ...'+JSON.stringify(pickedPlacesIds));
    pickedPlacesIds && pickedPlacesIds.map((id) => {
      const pickedPlacesFound = AVAILABLE_PLACES.find((places) => places.id === id);
      //console.log('pickedPlacesFound ...'+JSON.stringify(pickedPlacesFound));
      setPickedPlaces((prevPickedPlaces) => {
        const updatedPlaces = [pickedPlacesFound,...prevPickedPlaces];
        const sortedPlacesByDisctance = sortPlacesByDistance(updatedPlaces,position.coords.latitude, position.coords.longitude);
  
        return sortedPlacesByDisctance;
      });
    })
    });

   
    console.log('pickedPlacesFound ...'+JSON.stringify(pickedPlaces));
  },[]);
 

  function handleStartRemovePlace(id) {
    console.log('Remove Place ID'+id);
    setIsModelOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setIsModelOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      console.log('id -->'+id);
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      const storedIds = JSON.parse(localStorage.getItem('pickedPlaces')) || [];
      localStorage.setItem('pickedPlaces',JSON.stringify([id, ...storedIds]));
      return [place, ...prevPickedPlaces];
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    let storedIds = JSON.parse(localStorage.getItem('pickedPlaces')) || [];
    storedIds = storedIds.filter((id) => id !== selectedPlace.current);
      localStorage.setItem('pickedPlaces',JSON.stringify([...storedIds]));
    setIsModelOpen(false);
  }

  return (
    <>
      <Modal open={isModelOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
          timer={TIMER}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={sortedPlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
