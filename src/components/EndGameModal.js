import Modal from 'react-modal'
import Success from '../data/Success.png'
import Fail from '../data/Cross.png'
import { dictionary } from '../constants'
import { useEffect } from 'react'
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
  lastCanvas,
  cellStatuses,
}) => {
  useEffect(() => {
    if(isOpen) {
      let myResults = '';
      let rowOne = printEmojis(cellStatuses[0]);
      let rowTwo = printEmojis(cellStatuses[1]);;
      let rowThree = printEmojis(cellStatuses[2]);;
      let rowFour = printEmojis(cellStatuses[3]);;
      let rowFive = printEmojis(cellStatuses[4]);;
      myResults = myResults.concat(rowOne, rowTwo, rowThree, rowFour, rowFive);
      console.log(myResults, 'myResults')
    }
  })

  const printEmojis = (item) => {
    let s = '';
      for(var i = 0; i < item.length; i++) {
        switch (item[i]) {
          case "gray":
            s = s + '\u26AA' + '\x20';
            break;
          case "unguessed":
            s = s + '\u26AA' + '\x20';
            break;
          case "green":
            s = s + '💚' + '\x20';
            break;
          case "yellow":
            s = s + '💛' + '\x20';
            break;         
          default:
            console.log('\u26AA', item);
            s = s + '\x0A';
        }
      }    
    return (
      s = s + '\x0A'
    )
  }

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
              { lastCanvas }
            </>
          )}
          {gameState === state.lost && (
            <>
              <img src={Fail} alt="success" height="auto" width="80%" />
              <div className="text-primary dark:text-primary-dark text-4xl text-center">
                <p>{dictionary['Oops']}!</p>
                <p className="mt-3 text-2xl">
                  Ba é <strong>{answer}</strong> an focal ceart
                </p>
                <p className="mt-6 text-base">
                  {dictionary['CurrentStreak']}: <strong>{currentStreak}</strong> {currentStreak > 4 && '🔥'}
                </p>
                <p className="text-base">
                  {dictionary['LongestStreak']}: <strong>{longestStreak}</strong>
                </p>
              </div>
            </>
          )}
          <PlayAgainButton />
        </div>
      </div>
    </Modal>
  )
}