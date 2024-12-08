
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import QuizAppContext from "./components/QuizAppContext";

function App() {
    
    
    
    return (
        <QuizAppContext>
        <Header/>
        <main>
           
                <Quiz />
        
        </main>
        
        </QuizAppContext>
    );

}

export default App;
