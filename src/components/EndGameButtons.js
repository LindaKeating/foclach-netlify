const EndGameButtons = (props ) => {
    const isVisible = props.isOpen
    if (isVisible) {
        return <div className="endGameButtons">
        <button className="endGameButton"
           onClick={props.playAgain}>
            😊 Imir Arís
        </button>
    </div>
    } else {
        return <div></div>
    }  
}

export { EndGameButtons }