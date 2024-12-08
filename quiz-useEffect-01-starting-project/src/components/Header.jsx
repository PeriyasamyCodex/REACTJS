import quizImg from '../assets/quiz-logo.png'

export default function Header() {
    return <header>
    <img src={quizImg} alt="QUiz Image" />
    <h1>REACTQUIZ</h1>
    </header>
}