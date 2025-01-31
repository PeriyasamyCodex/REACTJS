import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { createEvent, queryClient } from '../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  const {mutate,isPending, isError, error} = useMutation({
    mutationFn: ({formData,method, id}) => createEvent(formData,method, id),
    onSuccess: () => {
      console.log('on success on ADDD  ')
      queryClient.invalidateQueries({queryKey: ['events']})
      navigate('/events');
    }
  })

  function handleSubmit(formData) {

    mutate({formData: {event: formData}, method: 'POST'});
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
      {isPending && 'Submitting...'}
      {!isPending && (
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
      )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            'Failed to create event. Please check your inputs and try again later.'
          }
        />
      )}
    </Modal>
  );
}
