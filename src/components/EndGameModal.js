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
  darkMode,
  gameState,
  state,
  currentStreak,
  longestStreak,
  answer,
  playAgain,
  shareResults,
  isCopied,
}) => {

  const PlayAgainButton = () => {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <button
          type="button"
          className="rounded-lg px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
          onClick={playAgain}
        >
          {dictionary['PlayAgain']}
        </button>
        
      </div>
    )
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={styles}
      contentLabel="Game End Modal"
      isCopied={isCopied}
    >
      <div id="endGameModal"className={darkMode ? 'dark' : ''}>
        <div className="h-full flex flex-col items-center justify-center max-w-[300px] mx-auto">
          <button
            className="absolute top-4 right-4 rounded-full nm-flat-background dark:nm-flat-background-dark text-primary dark:text-primary-dark p-1 w-6 h-6 sm:p-2 sm:h-8 sm:w-8"
            onClick={handleClose}
          >
            <Close />
          </button>
          {gameState === state.won && (
            <>
              <img src={Success} alt="success" height="auto" width="auto" />
              <h1 className="text-primary dark:text-primary-dark text-3xl">Comhghairdeas!</h1>
              <p className="mt-6">
                {dictionary['CurrentStreak']}: <strong>{currentStreak}</strong> {currentStreak > 4 && '🔥'}
              </p>
              <p>
                {dictionary['LongestStreak']}: <strong>{longestStreak}</strong>
              </p>
            </>
          )}
          {gameState === state.lost && (
            <>
              <img src={Fail} alt="success" height="auto" width="80%" />
              <div className="text-primary dark:text-primary-dark text-4xl text-center">
                <p className={darkMode ? 'dark': ''}>{dictionary['Oops']}!</p>
                <p className={darkMode ? 'dark mt-3 text-2xl' : 'mt-3 text-2xl'} >
                  Ba é <strong>{answer}</strong> an focal ceart
                </p>
                <p className={darkMode ? 'dark mt-6 text-base' : 'mt-6 text-base'}>
                  {dictionary['CurrentStreak']}: <strong>{currentStreak}</strong> {currentStreak > 4 && '🔥'}
                </p>
                <p className="text-base">
                  {dictionary['LongestStreak']}: <strong>{longestStreak}</strong>
                </p>
              </div>
            </>
          )}
          <div class="items-center">
            <button
              type="button"
              className="rounded-lg px-6 py-2 mt-8 text-lg nm-flat-background dark:nm-flat-background-dark hover:nm-inset-background dark:hover:nm-inset-background-dark text-primary dark:text-primary-dark"
              onClick={shareResults}
            >
              {dictionary['ShareTheResults']}
            </button>
            {isCopied ? <p>{dictionary['ResultsCopiedToClipboard']}</p> : <p></p>}
            <br />
            <PlayAgainButton />
          </div>
          </div>
      </div>
    </Modal>
  )
}