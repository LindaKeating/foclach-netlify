import Modal from 'react-modal'
import Success from '../data/Success.png'
import Fail from '../data/Cross.png'
import { dictionary } from '../constants'
import { ReactComponent as Close } from '../data/Close.svg'
import { CountdownTimer } from './countdownTimer/CountdownTimer';
Modal.setAppElement('#root')

export const EndGameModal = ({ 
  isOpen, 
  handleClose, 
  styles,
  currentStreak,
  longestStreak,
  percentage,
  totalPlayed
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
        <div className="endGameModal-Statistic">
          <span className="endGameMode-StatisticNumber">
            {totalPlayed}
          </span>
          played
        </div>
        <div className="endGameModal-Statistic">
          <span className="endGameMode-StatisticNumber">
            {percentage}
          </span>
          wins %
        </div> 
        <div className="endGameModal-Statistic">
          <span className="endGameMode-StatisticNumber">
            {currentStreak}
          </span>
          current streak
        </div> 
        <div className="endGameModal-Statistic">
          <span className="endGameMode-StatisticNumber">
            {longestStreak}
          </span>       
          longest streak
        </div>
        <CountdownTimer 
          hoursMinsSecs={timeToMidnight()}
        />
      </div>
    </Modal>
  )
}