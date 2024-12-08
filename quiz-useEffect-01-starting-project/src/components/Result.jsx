import { useContext } from 'react';
import resultImg from '../assets/quiz-complete.png';
import { QuizContext } from './QuizAppContext';
import QUESTIONS from "../questions";
export default function Result() {
    const {resultData, setSkippedQuestionsId} = useContext(QuizContext);
let skippedQuestionsId = [];
    QUESTIONS.map((qtn) => {
        if (qtn.id) {
               
            const isQtnUnAnswered = !resultData.wrongAnsweredId.includes(qtn.id) && 
            !resultData.answeredQuestionsId.includes(qtn.id)
           
            isQtnUnAnswered && skippedQuestionsId.push(qtn.id);
           
            
        }
    });
   
    console.log('resultData ->'+JSON.stringify(resultData));
    return (
        <div id="summary">
  <img src={resultImg} alt="Quiz Result Image" />
  <h2>QUIZ COMPLETED!</h2>
  <div id="summary-stats">
        <p>
          <span className="number">{((+skippedQuestionsId.length)/(+QUESTIONS.length)).toFixed(2) * 100}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{((parseFloat(resultData.answeredQuestionsId.length)/parseInt(QUESTIONS.length)) * 100).toFixed(0)}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{((+resultData.wrongAnsweredId.length/+QUESTIONS.length).toFixed(2) * 100).toFixed(0)}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {QUESTIONS.map((qtn, index) => {
          let cssClass = 'user-answer';

          if (skippedQuestionsId.includes(qtn.id) ) {
            cssClass += ' skipped';
          } else if (resultData.answeredQuestionsId.includes(qtn.id)) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{QUESTIONS[index].answers[0] ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>
        </div>
    );
}