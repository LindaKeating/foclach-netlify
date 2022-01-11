import { useEffect, useState, useRef } from 'react'
import { letters, status } from './constants'
import { Keyboard } from './components/Keyboard'
import answers from './data/answers'
import words from './data/words'
import  html2canvas  from 'html2canvas'

import { useLocalStorage } from './hooks/useLocalStorage'
import { ReactComponent as Info } from './data/Info.svg'
import { ReactComponent as Settings } from './data/Settings.svg'

import { InfoModal } from './components/InfoModal'
import { SettingsModal } from './components/SettingsModal'
import { EndGameModal } from './components/EndGameModal'

const state = {
  playing: 'playing',
  won: 'won',
  lost: 'lost',
  copiedToClipboard: false,

}

let variableState = {
  lastResult: '',
}

const getRandomAnswer = () => {
  const randomIndex = Math.floor(Math.random() * answers.length)
  return answers[randomIndex].toUpperCase()
}

function App() {
  const initialStates = {
    answer: () => getRandomAnswer(),
    gameState: state.playing,
    board: [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ],
    cellStatuses: () => Array(6).fill(Array(5).fill(status.unguessed)),
    currentRow: 0,
    currentCol: 0,
    letterStatuses: () => {
      const letterStatuses = {}
      letters.forEach((letter) => {
        letterStatuses[letter] = status.unguessed
      })
      return letterStatuses
    },
  }
  const [answer, setAnswer] = useState(initialStates.answer)
  const [gameState, setGameState] = useState(initialStates.gameState)
  const [board, setBoard] = useState(initialStates.board)
  const [cellStatuses, setCellStatuses] = useState(initialStates.cellStatuses)
  const [currentRow, setCurrentRow] = useState(initialStates.currentRow)
  const [currentCol, setCurrentCol] = useState(initialStates.currentCol)
  const [letterStatuses, setLetterStatuses] = useState(initialStates.letterStatuses)
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  const [submittedInvalidWord, setSubmittedInvalidWord] = useState(false)
  const [currentStreak, setCurrentStreak] = useLocalStorage('current-streak', 0)
  const [longestStreak, setLongestStreak] = useLocalStorage('longest-streak', 0)
  const streakUpdated = useRef(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [firstTime, setFirstTime] = useLocalStorage('first-time', true)
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(firstTime)
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const handleInfoClose = () => {
    setFirstTime(false)
    setInfoModalIsOpen(false)
  }

  const [darkMode, setDarkMode] = useLocalStorage('dark-mode', false)
  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  useEffect(() => {
    if (gameState !== state.playing) {
      setTimeout(() => {
        openModal()
      }, 500)
    }
  }, [gameState])

  useEffect(() => {
    if (!streakUpdated.current) {
      if (gameState === state.won) {
        if (currentStreak >= longestStreak) {
          setLongestStreak((prev) => prev + 1)
        }
        setCurrentStreak((prev) => prev + 1)
        streakUpdated.current = true
      } else if (gameState === state.lost) {
        setCurrentStreak(0)
        streakUpdated.current = true
      }
    }
  }, [gameState, currentStreak, longestStreak, setLongestStreak, setCurrentStreak])

  const getCellStyles = (rowNumber, colNumber, letter) => {
    if (rowNumber === currentRow) {
      if (letter) {
        return `nm-inset-background dark:nm-inset-background-dark text-primary dark:text-primary-dark ${
          submittedInvalidWord ? 'border border-red-800' : ''
        }`
      }
      return 'nm-flat-background dark:nm-flat-background-dark text-primary dark:text-primary-dark'
    }

    switch (cellStatuses[rowNumber][colNumber]) {
      case status.green:
        return 'nm-inset-n-green text-gray-50'
      case status.yellow:
        return 'nm-inset-yellow-500 text-gray-50'
      case status.gray:
        return 'nm-inset-n-gray text-gray-50'
      default:
        return 'nm-flat-background dark:nm-flat-background-dark text-primary dark:text-primary-dark'
    }
  }

  const addLetter = (letter) => {
    setSubmittedInvalidWord(false)
    setBoard((prev) => {
      if (currentCol > 4) {
        return prev
      }
      const newBoard = [...prev]
      newBoard[currentRow][currentCol] = letter
      return newBoard
    })
    if (currentCol < 5) {
      setCurrentCol((prev) => prev + 1)
    }
  }

  const isValidWord = (word) => {
    if (word.length < 5) return false
    return words[word.toLowerCase()]
  }

  const onEnterPress = () => {
    const word = board[currentRow].join('')
    if (!isValidWord(word)) {
      setSubmittedInvalidWord(true)
      return
    }

    if (currentRow === 6) return

    updateCellStatuses(word, currentRow)
    updateLetterStatuses(word)
    setCurrentRow((prev) => prev + 1)
    setCurrentCol(0)
  }

  const screenShotResult = () => {
    html2canvas(document.querySelector("#gameBoard")).then(canvas => {
      state.lastCanvas = canvas
    });
  }

  const onDeletePress = () => {
    setSubmittedInvalidWord(false)
    if (currentCol === 0) return

    setBoard((prev) => {
      const newBoard = [...prev]
      newBoard[currentRow][currentCol - 1] = ''
      return newBoard
    })

    setCurrentCol((prev) => prev - 1)
  }

  const updateCellStatuses = (word, rowNumber) => {
    setCellStatuses((prev) => {
      const newCellStatuses = [...prev]
      newCellStatuses[rowNumber] = [...prev[rowNumber]]
      const wordLength = word.length
      const answerLetters = answer.split('')

      // set all to gray
      for (let i = 0; i < wordLength; i++) {
        newCellStatuses[rowNumber][i] = status.gray
      }

      // check greens
      for (let i = wordLength - 1; i >= 0; i--) {
        if (word[i] === answer[i]) {
          newCellStatuses[rowNumber][i] = status.green
          answerLetters.splice(i, 1)
        }
      }

      // check yellows
      for (let i = 0; i < wordLength; i++) {
        if (answerLetters.includes(word[i]) && newCellStatuses[rowNumber][i] !== status.green) {
          newCellStatuses[rowNumber][i] = status.yellow
          answerLetters.splice(answerLetters.indexOf(word[i]), 1)
        }
      }

      return newCellStatuses
    })
  }

  // checking if the answer is right
  const isRowAllGreen = (row) => {
    let correctAnswer = row.every((cell) => cell === status.green)
    if (correctAnswer) {
      screenShotResult()
    }
    return correctAnswer
  }

  // every time cellStatuses updates, check if the game is won or lost
  useEffect(() => {
    const cellStatusesCopy = [...cellStatuses]
    const reversedStatuses = cellStatusesCopy.reverse()
    const lastFilledRow = reversedStatuses.find((r) => {
      return r[0] !== status.unguessed
    })

    if (lastFilledRow && isRowAllGreen(lastFilledRow)) {
      setGameState(state.won)
    } else if (currentRow === 6) {
      setGameState(state.lost)
    }

      let myResults = '';
      let rowOne = printEmojis(cellStatuses[0]);
      let rowTwo = printEmojis(cellStatuses[1]);;
      let rowThree = printEmojis(cellStatuses[2]);;
      let rowFour = printEmojis(cellStatuses[3]);;
      let rowFive = printEmojis(cellStatuses[4]);;
      myResults = myResults.concat(rowOne, rowTwo, rowThree, rowFour, rowFive);
      console.log(myResults, 'myResults')
      variableState.lastResult = myResults;
      //lastResult(myResults)
  }, [cellStatuses, currentRow])

  const printEmojis = (item) => {
    let s = '';
    for (var i = 0; i < item.length; i++) {
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
      s = s + '\x0A '
    )
  }

  const updateLetterStatuses = (word) => {
    setLetterStatuses((prev) => {
      const newLetterStatuses = { ...prev }
      const wordLength = word.length
      for (let i = 0; i < wordLength; i++) {
        if (newLetterStatuses[word[i]] === status.green) continue

        if (word[i] === answer[i]) {
          newLetterStatuses[word[i]] = status.green
        } else if (answer.includes(word[i])) {
          newLetterStatuses[word[i]] = status.yellow
        } else {
          newLetterStatuses[word[i]] = status.gray
        }
      }
      return newLetterStatuses
    })
  }

  const copyToClipboard = () => {
    setCopiedToClipboard(true)
    navigator.clipboard.writeText(variableState.lastResult + "  \x0A https://lindakeating.github.io/foclach/").then(function(){
      setCopiedToClipboard(true);
      console.log('successfully wrote to clipboard')
    }, function(){
      setCopiedToClipboard(false)
      console.log('there was a problem heuston')
    });
    setCopiedToClipboard(true)

  }

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: darkMode ? 'rgba(54, 57, 74, .6)' : 'hsl(231, 16%, 92%)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      height: 'calc(100% - 2rem)',
      width: 'calc(100% - 2rem)',
      backgroundColor: darkMode ? 'hsl(231, 16%, 25%)' : 'hsl(231, 16%, 92%)',
      boxShadow: `${
        darkMode
          ? '0.2em 0.2em calc(0.2em * 2) #1E2029, calc(0.2em * -1) calc(0.2em * -1) calc(0.2em * 2) #36394A'
          : '0.2em 0.2em calc(0.2em * 2) #A3A7BD, calc(0.2em * -1) calc(0.2em * -1) calc(0.2em * 2) #FFFFFF'
      }`,
      border: 'none',
      borderRadius: '1rem',
      maxWidth: '475px',
      maxHeight: '650px',
      position: 'relative',
    },
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`flex flex-col h-fill bg-background dark:bg-background-dark appContainer`}>
        <header className="flex items-center py-2 px-3 text-primary dark:text-primary-dark mb-[5rem]">
          <button type="button" onClick={() => setSettingsModalIsOpen(true)}>
            <Settings />
          </button>
          <h1 className="flex-1 text-center text-xl xxs:text-2xl -mr-6 sm:text-6xl tracking-wide font-bold font-righteous">
            FOCLACH
          </h1>
          <button type="button" onClick={() => setInfoModalIsOpen(true)}>
            <Info />
          </button>
        </header>
        <div className="flex items-center flex-col py-3 mb-[5rem]">
          <div id="gameBoard" className="grid grid-cols-5 grid-flow-row gap-4">
            {board.map((row, rowNumber) =>
              row.map((letter, colNumber) => (
                <span
                  key={colNumber}
                  className={`${getCellStyles(
                    rowNumber,
                    colNumber,
                    letter
                  )} letterTile inline-flex items-center font-medium justify-center text-lg rounded-full`}
                >
                  {letter}
                </span>
              ))
            )}
          </div>
        </div>
        <InfoModal
          isOpen={infoModalIsOpen}
          handleClose={handleInfoClose}
          darkMode={darkMode}
          styles={modalStyles}
        />
        <EndGameModal
          isOpen={modalIsOpen}
          handleClose={closeModal}
          styles={modalStyles}
          darkMode={darkMode}
          gameState={gameState}
          state={state}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          answer={answer}
          playAgain={() => {
            setAnswer(initialStates.answer)
            setGameState(initialStates.gameState)
            setBoard(initialStates.board)
            setCellStatuses(initialStates.cellStatuses)
            setCurrentRow(initialStates.currentRow)
            setCurrentCol(initialStates.currentCol)
            setLetterStatuses(initialStates.letterStatuses)
            closeModal()
            streakUpdated.current = false
          }}
          shareResults={() => {
            copyToClipboard()
          }}
          isCopied={copiedToClipboard}
        />
        <SettingsModal
          isOpen={settingsModalIsOpen}
          handleClose={() => setSettingsModalIsOpen(false)}
          styles={modalStyles}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <Keyboard
          letterStatuses={letterStatuses}
          addLetter={addLetter}
          onEnterPress={onEnterPress}
          onDeletePress={onDeletePress}
          gameDisabled={gameState !== state.playing}
        />
      </div>
    </div>
  )
}

export default App
