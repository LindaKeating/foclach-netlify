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
  shareResults
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
      shareResults={shareResults}
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
          <div className="label">
            played
          </div>
        </div>
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {percentage}
          </div>
          <div className="label">
            wins %
          </div>
        </div> 
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {currentStreak}
          </div>
          <div className="label">
          current streak
            </div>
          
        </div> 
        <div className="endGameMode-statisticContainer">
          <div className="endGameMode-StatisticNumber">
            {longestStreak}
          </div>
          <div className="label">
          longest streak
            </div>    
          
        </div>
          </div>
          <div className="endGameModal-Message">
            {message}
          </div>
          <div className="endGameModal-Word">

          </div>
          <div className="endGameModal-Countdown">
            <h1>An chéad FOCLACH eile</h1>
            <CountdownTimer 
              hoursMinsSecs={timeToMidnight()}/>
          </div>
          <div className="endGameModal-Share">
            <div className="endGameButtons">
              <button className="endGameButton shareButton" 
                onClick={shareResults}>
                ⭐   Roinn  ⭐ 
              </button>
            </div>
          </div>
          <div className="endGameModal-ModeMessage">
            <small>
            You are playing using the <strong>daily mode</strong>.  In this mode you are given the same word as everyone else within a 24 hour period &
            you can share your results with friends online.  But if you wish to play more than once a day you can use the <strong>practice mode</strong>. 
            In practice mode you can play as often as you like, but you will not be able to share your results online
            </small>
          </div>
        </div> 
      </div>
    </Modal>
  )
}