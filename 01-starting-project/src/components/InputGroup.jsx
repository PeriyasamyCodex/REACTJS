import { useState } from "react";

export default function InputGroup({children, userInputData, userInputId, updateUserInputData}) {
console.log(userInputId +' -  '+JSON.stringify(userInputData));
    const [userInput, setUserInput] = useState(userInputData[userInputId]);

    function onUserInputChange(event) {
        setUserInput(event.target.value);
        //userInputData[userInputId] = event.target.value;
        updateUserInputData(userInputId, event.target.value);
    }

    return (

        <>
            <label>{children}</label>
            <input onChange={onUserInputChange} value={userInput}/>
        </>
    );
}