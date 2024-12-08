import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

export default function DeleteConfirmation({ onConfirm, onCancel , timer}) {
 
 
  useEffect(() => {   
    console.log('TIMER SET');
    const timeOut = setTimeout(() => {
      onConfirm();
    }, timer);

    return () => {     
      console.log('Cleaning up timer');
      clearTimeout(timeOut);
    }

  }, []);



  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar  timer={timer}/>
    </div>
  );
}
