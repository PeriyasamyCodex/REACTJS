import {  useContext, useState } from "react";
import Answers from "./Answers";
import { useEffect } from "react";
import QUESTIONS from "../questions";
import ProgressBar from "./ProgressBar";
import { QuizContext } from "./QuizAppContext";

const TIMER = 5000;

export default function Question({setDisplayResult}) {

    const [activeQuestion, setActiveQuestion] = useState({});
    const [currQuestIndex, setCurrQuestIndex] = useState(0);
    const {setDisplayResults } = useContext(QuizContext);

    useEffect(() => {
        
        setActiveQuestion(() =>  QUESTIONS[currQuestIndex]);
      

      const timeout =  setTimeout(()=>{ 
        if (currQuestIndex === 6) {
            setDisplayResult(true);
        }               
        setCurrQuestIndex(currQuestIndex+1);
       },TIMER);


        return () => clearTimeout(timeout);

    }, [currQuestIndex]);


    return (
        <div id="question">
           <ProgressBar onTimeout={currQuestIndex} timer={TIMER} />
            <h2>{activeQuestion.text}</h2>
            <Answers activeQuestion={activeQuestion}/>
        </div>
    );
}