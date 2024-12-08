import { useState } from "react";
import Header from "./components/Header"
import Result from "./components/Result"
import UserInput from "./components/UserInput"
const initialUserInput = {
  initialInvestment: 0,
  annualInvestment: 0,
  expectedReturn: "0.0",
  duration: 0
}
function App() {

  const [userInputData, setUserInputData] = useState(initialUserInput);

  function updateUserInputData(userInputId, userInputValue) {
      setUserInputData((prevUserInpData) => {
          return {
              ...prevUserInpData,
              [userInputId]: userInputValue
          };
      });

  }
  return (
    <>
    <Header/>
    <UserInput userInputData = {userInputData} updateUserInputData = {updateUserInputData}/>
    <Result userInputData = {userInputData}/>
    </>
  )
}

export default App
