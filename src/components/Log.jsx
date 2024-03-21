export default function Log({turns}){

    return (
        <ol id="log">
            {turns.map((turn, index) => {
                return <li key={index}>{turn.square.row} {turn.square.col} {turn.player}</li>
            })}
        </ol>
    )
}