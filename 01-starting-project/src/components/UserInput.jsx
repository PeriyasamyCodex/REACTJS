
import InputGroup from "./InputGroup";


export default function UserInput({userInputData,updateUserInputData}) {
   
    return (
        <div id="user-input">
            <div className="input-group">
                <InputGroup userInputId="initialInvestment" userInputData={userInputData} updateUserInputData={updateUserInputData}>INITIAL INVESTMENT</InputGroup>

                <InputGroup userInputId="annualInvestment" userInputData={userInputData} updateUserInputData={updateUserInputData}>ANNUAL INVESTMENT</InputGroup>
            </div>
            <div className="input-group">
                <InputGroup userInputId="expectedReturn" userInputData={userInputData} updateUserInputData={updateUserInputData}>EXPECTED RETURN</InputGroup>

                <InputGroup userInputId="duration" userInputData={userInputData} updateUserInputData={updateUserInputData}>DURATION</InputGroup>
            </div>
        </div>
    );
}