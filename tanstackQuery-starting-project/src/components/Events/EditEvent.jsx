import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { createEvent, fetchEvent, queryClient } from '../util/http.js';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function EditEvent() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {data} = useQuery({
    queryKey: ['event',id],
    queryFn: ({signal}) => fetchEvent({id,signal})
  });

  const {mutate} = useMutation({
    mutationFn: ({formData,method, id}) => createEvent(formData,method, id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['events']})
      navigate('/events');
    }
  })

   // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;

  //     await queryClient.cancelQueries({ queryKey: ['events', params.id] });
  //     const previousEvent = queryClient.getQueryData(['events', params.id]);

  //     queryClient.setQueryData(['events', params.id], newEvent);

  //     return { previousEvent };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', params.id], context.previousEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(['events', params.id]);
  //   },
  // });

  function handleSubmit(formData) {
    
  mutate({formData: {event: formData}, method: 'PUT', id: id});
  }

  function handleClose() {
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    </Modal>
  );
}
