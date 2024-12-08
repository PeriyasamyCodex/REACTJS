import { Link, Outlet, useNavigate, useParams, useSubmit } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteEvent, fetchEvent, queryClient } from '../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EventDetails() {

  const {id} = useParams();
  const navigate = useNavigate();
 // const submit = useSubmit();

  const {data, isError, error, isLoading} = useQuery({
    queryKey: ['event',id],
    queryFn: ({signal}) => fetchEvent({id,signal})
  });

  const {mutate} = useMutation({
    mutationFn: ({id}) => deleteEvent({id}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['events']})
      navigate('/events');
    }
  });

  function handleDelete() {
    console.log('submit vcalla')
    
    mutate({id});
  }

  let content;
  if(isLoading){
    content =  <LoadingIndicator />;
  }

  if (isError) {
    <ErrorBlock title='An Error Occured' message={ error.info?.message || 'Failed to Fetch Event Data'}/>
  }
  if (data) {
    content = (<>
      <header>
        <h1>{data.name}</h1>
        <nav>
          <button onClick={handleDelete}>Delete</button>
          <Link to="edit">Edit</Link>
        </nav>
      </header>
      <div id="event-details-content">
        <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
        <div id="event-details-info">
          <div>
            <p id="event-details-location">{data.location}</p>
            <time dateTime={`Todo-DateT$Todo-Time`}>{data.date}</time>
          </div>
          <p id="event-details-description">{data.description}</p>
        </div>
      </div>
      </>
      )
  }
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {data && content}
      </article>
    </>
  )
}
