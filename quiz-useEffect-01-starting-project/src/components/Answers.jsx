import { useContext } from "react";
import { QuizContext } from "./QuizAppContext";


export default function Answers({ activeQuestion }) {
    const { setAnsweredQuestionsId, setWrongAnsweredQuestionsId } = useContext(QuizContext);

 


    return (
        <ul id="answers" >
            {activeQuestion && activeQuestion.answers && activeQuestion.answers.map((answer, ansIndex) =>
            (<li key={ansIndex} className="answer ">
                <button onClick={() => ansIndex === 0 ? setAnsweredQuestionsId(activeQuestion.id) : setWrongAnsweredQuestionsId(activeQuestion.id)}>{answer}</button>
            </li>)
            )}

        </ul>
    );
}