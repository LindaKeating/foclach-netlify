import { dictionary } from '../constants'

const EndGameButtons = (props) => {
    const isVisible = props.isOpen && !props.gameMode
    if (isVisible) {
        return <div className="endGameButtons">
            <a href={`https://www.teanglann.ie/en/fgb/${props.answer}`}
                target="_blank" rel="noopener noreferrer"
           >Brí an fhocail</a>
        <button className="endGameButton"
           onClick={props.playAgain}>
            😊 {dictionary['PlayAgain']}
        </button>
    </div>
    } else {
        return <div></div>
    }  
}

export { EndGameButtons }