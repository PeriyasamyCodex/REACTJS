import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { fetchEvents } from '../util/http';
import ErrorBlock from '../UI/ErrorBlock';
import LoadingIndicator from '../UI/LoadingIndicator';
import EventItem from './EventItem';

export default function FindEventSection() {
  const searchElement = useRef();
  const[searchTerm, setSearchTerm] = useState();

 const {data,isError, isLoading, error} = useQuery({
  queryKey: ['events', searchTerm],
  queryFn: ({signal}) => fetchEvents({signal,searchTerm}),
  enabled: searchTerm !== undefined,
  
 })

 let content;
 if (isLoading) {
  content = <LoadingIndicator />;
}

 if (isError){
  <ErrorBlock title='An Error Occured!' message={error.message}></ErrorBlock>
 }

 if (data) {
  content = (
    <ul className="events-list">
      {data.map((event) => (
        <li key={event.id}>
          <EventItem event={event} />
        </li>
      ))}
    </ul>
  );
}


  function handleSubmit(event) {
    event.preventDefault();

    setSearchTerm(searchElement.current.value);
  }
  
  content = content ? content :  <p>Please enter a search term and to find events.</p>;

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
     {content}
    </section>
  );
}
