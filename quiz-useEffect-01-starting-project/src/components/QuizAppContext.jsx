import { createContext, useReducer } from "react";

export const QuizContext = createContext({
    resultData: {},
    setDisplayResults: () => {},
    setSkippedQuestionsId: () => { },
    setAnsweredQuestionsId: () => {},
    setWrongAnsweredQuestionsId: () => {}
});

function resultDataReducer(state, actions) {

    if (actions.type === "ADD_SKIPPED_QTNS") {
        const prevIds = [...state.skippedQuestionsId];
        prevIds.push(actions.payload);
        //console.log('skippedQuestionsId'+JSON.stringify(prevIds));
        return {...state, skippedQuestionsId : prevIds };
    }
    if (actions.type === "ADD_ANSWERED_QTNS") {
        const prevIds = [...state.answeredQuestionsId];
        prevIds.push(actions.payload);
        return {...state, answeredQuestionsId : prevIds };;
    }
    if (actions.type === "ADD_WRONG_QTNS") {
        const prevIds = [...state.wrongAnsweredId];
        prevIds.push(actions.payload);
        return {...state, wrongAnsweredId : prevIds };;
    }
    if (actions.type === "TOGGLE_DISPLAY") {
            console.log("TOGGLE_DISPLAY"+!state.displayResults);
        return {...state, displayResults : !state.displayResults };
    }

}

export default function QuizAppContext({ children }) {

    const [resultData, dispatchResultData] = useReducer(resultDataReducer, {
        displayResults: false,
        skippedQuestionsId: [],
        answeredQuestionsId: [],
        wrongAnsweredId: []
    });


    function setSkippedQuestionsId(id) {
        dispatchResultData({
            type: "ADD_SKIPPED_QTNS",
            payload: id
        });
    }

    function setAnsweredQuestionsId(id) {
        dispatchResultData({
            type: "ADD_ANSWERED_QTNS",
            payload: id
        });
    }

    function setWrongAnsweredQuestionsId(id) {
        dispatchResultData({
            type: "ADD_WRONG_QTNS",
            payload: id
        });
    }

    function setDisplayResults() {
        dispatchResultData({
            type: "TOGGLE_DISPLAY"
        });
    }

    const contextValue = {
        resultData: resultData,
        setDisplayResults: setDisplayResults,
        setSkippedQuestionsId: setSkippedQuestionsId,
        setAnsweredQuestionsId: setAnsweredQuestionsId,
        setWrongAnsweredQuestionsId: setWrongAnsweredQuestionsId
    }

    return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
}