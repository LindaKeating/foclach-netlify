import Modal from 'react-modal'
import Success from '../data/Success.png'
import Fail from '../data/Cross.png'
import { dictionary } from '../constants'
import { ReactComponent as Close } from '../data/Close.svg'

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
          wins%
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
      </div>
    </Modal>
  )
}