export default function Log({ logData }) {

    return (
        <ol id="log">
            { logData && logData.map((logDataVal, logIndex) => (               
                <li key={logIndex}>
                 <p>{logDataVal.playerName + ' Selects ' + logDataVal.playerSymbol + ' On Square ' + logDataVal.playerSelRowIndex + ' ' + logDataVal.playerSelectedColIndex}</p>
                </li>
            ))
            }

        </ol>

    );
}