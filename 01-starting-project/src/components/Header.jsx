import invCalLogo from '../assets/investment-calculator-logo.png'

export default function Header() {

    return (
        <header id="header">
        <img src={invCalLogo} alt="Investor Calculator Logo"></img>
        <h1>React Investment Calculator</h1>
        </header>
    );
}