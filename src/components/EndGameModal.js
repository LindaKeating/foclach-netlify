import Modal from 'react-modal'
import Success from '../data/Success.png'
import Fail from '../data/Cross.png'
import { dictionary } from '../constants'
import { ReactComponent as Close } from '../data/Close.svg'
import { CountdownTimer } from './countdownTimer/CountdownTimer';
import { Message } from './Message'
Modal.setAppElement('#root')

export const EndGameModal = ({ 
  isOpen, 
  handleClose, 
  styles,
  currentStreak,
  longestStreak,
  percentage,
  totalPlayed, 
  message,
  messageVisible
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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={styles}
      currentStreak={currentStreak}
      longestStreak={longestStreak}
      percentage={percentage}
      totalPlayed={totalPlayed}
    >
      <div className="h-full endGameModal dark">
        <button
              className="closeButton"
              onClick={handleClose}
            >
              <Close />
        </button>
        <div className="endGameModal-Container">
          <h1>Statistics</h1>
          <div className="endGameModal-Statistics">
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {totalPlayed}
          </div>
          <div class="label">
            played
          </div>
        </div>
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {percentage}
          </div>
          <div class="label">
            wins %
          </div>
        </div> 
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {currentStreak}
          </div>
          <div class="label">
          current streak
            </div>
          
        </div> 
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {longestStreak}
          </div>
          <div class="label">
          longest streak
            </div>    
          
        </div>
          </div>
          <div className="endGameModal-Message">
            {message}
          </div>
          <div className="endGameModal-Word">

          </div>
          <div class="endGameModal-Countdown">
            <h1>An chéad FOCLACH eile</h1>
            <CountdownTimer 
              hoursMinsSecs={timeToMidnight()}/>
          </div>
        </div> 
      </div>
    </Modal>
  )
}