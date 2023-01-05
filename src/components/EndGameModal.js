import Modal from 'react-modal'
import { dictionary } from '../constants'
import { ReactComponent as Close } from '../data/Close.svg'
import { CountdownTimer } from './countdownTimer/CountdownTimer';
import { GameModePicker } from './gameModePicker/gameModePicker';
import { GuessDistribution } from './guessDistribution/GuessDistribution';
import { ReactComponent as LitreachSVG } from '../data/Asset18.svg';
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
  answer,
  version,
  distribution,
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
      version={version}
      distribution={distribution}
    >
      <div className="h-full endGameModal dark">
        
        <div className="endGameModal-Container">
          <div className="endGameModal-Header">
            <button></button>
            <h1></h1>
            <button
              className="closeButton"
              onClick={handleClose}
            >
              <Close />
            </button>
          </div>
          <h1 className="endGameMode-Heading">{dictionary['Statistics']}</h1>    
          <div className="endGameModal-Statistics"> 
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {totalPlayed}
          </div>
          <label className="label endGameMode-Label">
            {dictionary['Played']}
          </label>
        </div>
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {percentage}<small className="percentage"></small>
          </div>
          <label className="label endGameMode-Label">
            {dictionary['Wins']} %
          </label>
        </div> 
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {currentStreak}
          </div>
          <label className="label endGameMode-Label">
          {dictionary['CurrentStreak']}
            </label>
          
        </div> 
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {longestStreak}
          </div>
          <label className="label endGameMode-Label">
            {dictionary['LongestStreak']}
            </label>              
        </div>
      </div>
      <h1 className="endGameMode-Heading">{dictionary['distribution']}</h1>
      <GuessDistribution distribution={distribution} />
  <div className="endGameModal-Countdown">
    <h1 className="endGameMode-Heading">{dictionary['CheadFoclachEile']}</h1>
    <CountdownTimer 
      hoursMinsSecs={timeToMidnight()}/>
    <a href={`https://www.teanglann.ie/en/fb/${answer}`} 
                 target="_blank" rel="noopener noreferrer"
                 className={`${getDisplayDefinition(
                    gameState               
                  )} `}>Brí an fhocail</a>
  </div>
          <div className="endGameModal-Share">
            <div className="endGameButtons">
              <a href="https://litreach.ie?utm_source=Foclach" className="endGameButton endGameButton-Litreach">Imir Litreach 
              <LitreachSVG className="endGameButton-LitreachLogo"/>
              </a>
              <button className="endGameButton shareButton" 
                disabled={!gameMode}
                onClick={shareResults}>
                 { dictionary['Share']} 
                 <i className="fa-solid fa-share-nodes EndGameModal-Icon"></i>
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
          <div>
            <small>leagan: {version}</small>
          </div>
        </div> 
      </div>
    </Modal>
  )
}