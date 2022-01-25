import Modal from 'react-modal'
import { dictionary } from '../constants'
import { ReactComponent as Close } from '../data/Close.svg'
import { ReactComponent as Github } from '../data/Github.svg'
import { GameModePicker} from '../components/gameModePicker/gameModePicker'

Modal.setAppElement('#root')

export const InfoModal = ({ isOpen, handleClose, darkMode, styles, gameMode, toggleGameMode }) => (
  <Modal isOpen={isOpen} onRequestClose={handleClose} style={styles} contentLabel="Game Info Modal">
    <div className={`h-full ${darkMode ? 'dark' : ''}`}>
      <button
        className="closeButton"
        onClick={handleClose}
      >
        <Close />
      </button>
      <div className="infoModal-Container">
        <div className="">
          <h1 className="modalTitle">{dictionary['HowToPlay']}</h1>
          <ul className="infoModal-Rules">
            <li className="infoModal-Rule">{dictionary['SixGuessesLeft']}</li>
            <li className="infoModal-Rule">{dictionary['GuessAnyValidWord']}</li>
            <li className="infoModal-Rule">
              {dictionary['AfterEachGuessLetterWillTurnDifferentColour']}
            </li>
          </ul>
          <div className="infoModal-Rule">
            <span className="letterTile rightLetterRightPlace">
              A
            </span>
            <span className=""> - </span>
            <span>{dictionary['CorrectLetterCorrectSpot']}</span>
          </div>
          <div className="infoModal-Rule">
            <span className="letterTile rightLetterWrongPlace">
              É
            </span>
            <span className=""> - </span>
            <span>{dictionary['CorrectLetterWrongSpot']}</span>
          </div>
          <div className="infoModal-Rule">
            <span className="letterTile wrongLetter">
              R
            </span>
            <span className=""> - </span>
            <span>{dictionary['WrongLetter']}</span>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="endGameButton">Imir Anois</button>
          <div>
          <GameModePicker 
            gameMode={gameMode}
            toggleGameMode={toggleGameMode}
          />
        </div>
        <div>
          {dictionary['ModeMessage']}
        </div>
        
        <div className="gitHubLink">
          <span>{dictionary['ProjectIsOpenSource']}</span>
          <a
            className="gitHubIcon"
            href="https://github.com/LindaKeating/foclach/tree/main/src"
            target="_blank"
            rel="noreferrer"
          >
            <Github />
          </a>
        </div>
      </div>
    </div>
  </Modal>
)
