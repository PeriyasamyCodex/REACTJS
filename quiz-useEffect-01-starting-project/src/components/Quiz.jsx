import { useContext, useState } from "react";
import Question from "./Question";
import Result from "./Result";

export default function Quiz() {
  const [displayResult, setDisplayResult] = useState(false);

if (displayResult) {
    return <Result></Result>
}

    return (
    <div id="quiz">
        <Question setDisplayResult={setDisplayResult}/>
    </div>
    );
}