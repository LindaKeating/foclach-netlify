import Modal from 'react-modal'
import { dictionary } from '../constants'
import { ReactComponent as Close } from '../data/Close.svg'
import { CountdownTimer } from './countdownTimer/CountdownTimer';
import { GameModePicker } from './gameModePicker/gameModePicker'
Modal.setAppElement('#root')

export const EndGameModal = ({ 
  isOpen, 
  handleClose, 
  styles,
  currentStreak,
  longestStreak,
  percentage,
  totalPlayed, 
  gameState,
  shareResults,
  gameMode,
  toggleGameMode,
  answer
 }) => {
   const timeToMidnight = () => {
    let now = new Date(),
    midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,59,59),
    diff =  midnight.getTime() - now.getTime();
    let hsMsSs = new Date(diff).toISOString().slice(11,19)
    return { hours: hsMsSs.slice(0,2), minutes: hsMsSs.slice(3,5), seconds: hsMsSs.slice(6,8)}
   }

   const getDisplayDefinition = (playingState) => {
     return playingState !== 'playing' ? '' : 'hidden'
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={styles}
      currentStreak={currentStreak}
      longestStreak={longestStreak}
      percentage={percentage}
      totalPlayed={totalPlayed}
      shareResults={shareResults}
      answer={answer}
      gameState={gameState}
    >
      <div className="h-full endGameModal dark">
        
        <div className="endGameModal-Container">
          <div className="endGameModal-Header">
            <button></button>
            <h1>{dictionary['Statistics']}</h1>
            <button
              className="closeButton"
              onClick={handleClose}
            >
              <Close />
            </button>
          </div>      
          <div className="endGameModal-Statistics">
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {totalPlayed}
          </div>
          <div className="label">
            {dictionary['Played']}
          </div>
        </div>
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {percentage}
          </div>
          <div className="label">
            {dictionary['Wins']} %
          </div>
        </div> 
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {currentStreak}
          </div>
          <div className="label">
          {dictionary['CurrentStreak']}
            </div>
          
        </div> 
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {longestStreak}
          </div>
          <div className="label">
            {dictionary['LongestStreak']}
            </div>              
        </div>
          </div>
          <div className="endGameModal-Countdown">
            <h1>{dictionary['CheadFoclachEile']}</h1>
            <CountdownTimer 
              hoursMinsSecs={timeToMidnight()}/>
          </div>
          <div className="endGameModal-Share">
            <div className="endGameButtons">
              <a href={`https://www.teanglann.ie/en/fgb/${answer}`} 
                 target="_blank" rel="noopener noreferrer"
                 className={`${getDisplayDefinition(
                    gameState               
                  )} `}>Brí an fhocail</a>
              <button className="endGameButton shareButton" 
                disabled={!gameMode}
                onClick={shareResults}>
                <i className="fa-solid fa-share-nodes EndGameModal-Icon"></i>
                 { dictionary['Share']}
              </button>
            </div>
          </div>
          <div className="endGameModal-ModeMessage">
            <small>
              {gameMode ? dictionary['ModeMessage'] : dictionary['PracticeModeMessage']}
            </small>
          </div>
          <div className="endGameMode-GameModePicker">
            <GameModePicker 
              gameMode={gameMode}
              toggleGameMode={toggleGameMode}
            />
          </div>
        </div> 
      </div>
    </Modal>
  )
}