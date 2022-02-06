import { dictionary } from '../constants'

const EndGameButtons = (props) => {
    const isVisible = props.isOpen && !props.gameMode
    if (isVisible) {
        return <div className="endGameButtons">
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