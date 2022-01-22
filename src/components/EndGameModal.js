import Modal from 'react-modal'
import Success from '../data/Success.png'
import Fail from '../data/Cross.png'
import { dictionary } from '../constants'
import { ReactComponent as Close } from '../data/Close.svg'

Modal.setAppElement('#root')

export const EndGameModal = ({ 
  isOpen, 
  handleClose, 
  styles
 }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={styles}
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
            2
          </span>
          played
        </div>
        <div className="endGameModal-Statistic">
          <span className="endGameMode-StatisticNumber">
            100
          </span>
          wins%
        </div> 
        <div className="endGameModal-Statistic">
          <span className="endGameMode-StatisticNumber">
            3
          </span>
          current streak
        </div> 
        <div className="endGameModal-Statistic">
          <span className="endGameMode-StatisticNumber">
            6
          </span>
          longest streak
        </div> 
      </div>
    </Modal>
  )
}