import { calculateInvestmentResults } from "../util/investment";

export default function Result({userInputData}) {

    const annualData = calculateInvestmentResults(userInputData);
    console.log('annual data '+JSON.stringify(annualData));
    return (
        <table id="result">
            <thead>
                <tr>
                <th>Year</th>
                <th>Investment value</th>
                <th>Interest(year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {annualData.map(annData => {
                    return  <tr key={annData.year}>
                    <td>{annData.year}</td>
                    <td>{annData.valueEndOfYear}</td>
                    <td>{annData.interest}</td>
                    <td>{annData.totalInterest}</td>
                    <td>{annData.annualInvestment}</td>
                </tr>
                   
                })}
            </tbody>
        </table>
    );

}