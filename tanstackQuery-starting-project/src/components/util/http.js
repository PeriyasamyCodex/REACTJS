import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchEvents({signal, searchTerm}) {

    let url ='http://localhost:3000/events';

    if(searchTerm) {
        url+= '?search='+searchTerm;
    }

   
    const response = await fetch(url,{signal});

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    const { events } = await response.json();

    return events;
  
}

export async function fetchSelectableImages({ signal }) {
    const response = await fetch(`http://localhost:3000/events/images`, { signal });
  
    if (!response.ok) {
      const error = new Error('An error occurred while fetching the images');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const { images } = await response.json();
  
    return images;
  }
  

export async function createEvent(formData,method,id) {
console.log('createEvent '+method)
  let url ='http://localhost:3000/events';   
  if (id) {
    url ='http://localhost:3000/events/'+id;   
  }

    
    const response = await fetch(url,{
        method: method,
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
          },
    });

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    const { events } = await response.json();

    return events;
  
}

export async function fetchEvent({ id, signal }) {
    const response = await fetch(`http://localhost:3000/events/${id}`, { signal });
  
    if (!response.ok) {
      const error = new Error('An error occurred while fetching the event');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const { event } = await response.json();
  
    return event;
  }
  
  
  export async function deleteEvent({ id }) {
    console.log('delete alles')
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const error = new Error('An error occurred while deleting the event');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    return response.json();
  }