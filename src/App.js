import { useEffect, useState, useRef } from 'react'
import CacheBuster from 'react-cache-buster';
import packInfo from '../package.json';
import { dictionary, letters, status } from './constants'
import { Keyboard } from './components/Keyboard'
import answers from './data/answers'
import words from './data/words'
import  html2canvas  from 'html2canvas'
import dailyAnswers from './data/dailyAnswers'

import { useLocalStorage } from './hooks/useLocalStorage'
import { ReactComponent as Info } from './data/Info.svg'
import { ReactComponent as Settings } from './data/Settings.svg'
import { ReactComponent as Statistics } from './data/Statistics.svg'
import { ReactComponent as History } from './data/History.svg';

import { InfoModal } from './components/InfoModal'
import { SettingsModal } from './components/SettingsModal'
import { EndGameModal } from './components/EndGameModal'
import { EndGameButtons } from './components/EndGameButtons'
import { AnswersHistory } from './components/AnswersHistory';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable */
const state = {
  playing: 'playing',
  won: 'won',
  lost: 'lost',
  copiedToClipboard: false,
}

const getRandomAnswer = () => {
  const randomIndex = Math.floor(Math.random() * answers.length)
  return answers[randomIndex].toUpperCase()
}

const getTodaysAnswer = () => {
  const d = new Date()
  const fullDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  const dateSubstring = fullDate.toISOString().substring(0, 10)
  const todaysWord = dailyAnswers[dateSubstring]['word']
  return todaysWord
}

const getTodaysWordNumber = () => {
  const d = new Date()
  const today = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().substring(0, 10)
  const todaysWordNumber = dailyAnswers[today]['number']
  return todaysWordNumber
}

const getAnswer = (mode) => {
  return mode ? getTodaysAnswer() : getRandomAnswer()
}

const playedAlreadyToday = (date) => {
  const d = new Date()
  if (date && date.substring(0, 10) === new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().substring(0, 10)) {
    return true
  } else {
    return false
  }
}


function App() {
  const isProduction = process.env.NODE_ENV === 'production';
  const initialStates = {
    answer: () => getAnswer(true),
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
    invalidWord: false,
    currentGuess: '',
    message: '',
    lostGameMessage: '',
    distribution: {
      '1': { 'amount': 0 ,  'percentage': 0 },
      '2': { 'amount': 0 ,  'percentage': 0 },
      '3': { 'amount': 0 ,  'percentage': 0 },
      '4': { 'amount': 0 ,  'percentage': 0 },
      '5': { 'amount': 0 ,  'percentage': 0 },
      '6': { 'amount': 0 ,  'percentage': 0 },
      total: 0
    }
  }



  const [submittedInvalidWord, setSubmittedInvalidWord] = useState(false)
  const [answer, setAnswer] = useState(initialStates.answer)
  const [boardState, setBoardState] = useLocalStorage('boardState', null)
  const [gameMode, setGameMode] = useLocalStorage('daily', true)
  const [lastPlayedDate, setLastPlayedDate] = useLocalStorage('lastPlayedDate', null)
  const [lastScoredDate, setLastScoredDate] = useLocalStorage('lastScoredDate', null)
  const boards = gameMode && lastPlayedDate ? boardState : initialStates.board
  const [gameState, setGameState] = useState(initialStates.gameState)
  const [practiceBoard, setPracticeBoard] = useLocalStorage('practiceBoard', initialStates.board)
  const [dailyBoard, setDailyBoard] = useLocalStorage('dailyBoard', initialStates.board)
  const [board, setBoard] = useState(initialStates.board)
  const [dailyCellStatuses, setDailyCellStatuses] = useLocalStorage('dailyCellStatuses', initialStates.cellStatuses)
  const [cellStatuses, setCellStatuses] = useState(initialStates.cellStatuses)
  const [currentRow, setCurrentRow] = useState(initialStates.currentRow)
  const [dailyCurrentRow, setDailyCurrentRow] = useLocalStorage('dailyCurrentRow', null)
  const [currentCol, setCurrentCol] = useState(initialStates.currentCol)
  const [dailyLetterStatuses, setDailyLetterStatuses] = useLocalStorage('dailyLetterStatuses', initialStates.letterStatuses)
  const [letterStatuses, setLetterStatuses] = useState(initialStates.letterStatuses)
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  const [clipboardMessage, setClipboardMessage] = useState(false)
  const [lostDailyGameMessage, setDailyLostGameMessage] = useLocalStorage('dailyLostGameMessage','')
  const [currentWinStreak, setCurrentWinStreak] = useLocalStorage('current-win-streak', 0)
  const [longestWinStreak, setLongestWinStreak] = useLocalStorage('longest-win-streak', 0)
  const [wins, setWins] = useLocalStorage('wins', 0)
  const [losses, setLosses] = useLocalStorage('losses', 0)
  const [rowsPlayed, setRowsPlayed] = useState(0)
  const streakUpdated = useRef(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [firstTime, setFirstTime] = useLocalStorage('first-time', true)
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(firstTime)
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false)
  const [answerHistoryModalIsOpen, setAnswerHistoryModalIsOpen] = useState(false)
  const [currentGuess, setCurrentGuess] = useState(initialStates.currentGuess)
  const [myResults, setMyResults] = useState('')
  const [dayModeModalOpen, setDayModeModalOpen] = useState(false)
  const [enterEvent, setEnterEvent] = useState(null)
  const [distribution, setDistribution] = useLocalStorage('distribution', initialStates.distribution)
  const [answerHistory, setAnswerHistory] = useState(null)

  const showMessage = (message, props) => toast(message, props);

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleInfoClose = () => {
     setFirstTime(false)
     setInfoModalIsOpen(false)
  }

  const setTodaysDate = () => {
    let d = new Date()
    setLastPlayedDate(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString())
  }

  const updateScores = () => {
    if (gameMode && !playedAlreadyToday(lastScoredDate)) {
      if ((gameState === state.won) && gameMode) {
        if (currentWinStreak >= longestWinStreak) {
          setLongestWinStreak((prev) => prev + 1)
        }
        setCurrentWinStreak((prev) => prev + 1)
        setWins((prev) => prev + 1)
        streakUpdated.current = true
        let d = new Date()
        setLastScoredDate(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString())
      } else if ((gameState === state.lost) && gameMode) {
        setLosses((prev) => prev + 1)
        setCurrentWinStreak(0)
        streakUpdated.current = true
        let d = new Date()
        setLastScoredDate(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString())
      }
    }
   }

  const updateBoard = () => {
    const dailyModeAndPlayedToday =  gameMode && playedAlreadyToday(lastPlayedDate)
    gameMode ? setAnswer(getTodaysAnswer()) : setAnswer(getRandomAnswer())
    dailyModeAndPlayedToday ? setBoard(dailyBoard) : setBoard( initialStates.board)
    dailyModeAndPlayedToday ? setCellStatuses(dailyCellStatuses) : setCellStatuses(initialStates.cellStatuses)
    setGameState(initialStates.gameState)
    dailyModeAndPlayedToday ? setCurrentRow(dailyCurrentRow) : setCurrentRow(initialStates.currentRow)
    setCurrentCol(initialStates.currentCol)
    dailyModeAndPlayedToday ? setLetterStatuses(dailyLetterStatuses) : setLetterStatuses(initialStates.letterStatuses)
    setRowsPlayed(0)
    setMyResults('')
  }

  const toggleGameMode = () => {
    setGameMode((prev) => !prev)
  }

  const [darkMode, setDarkMode] = useLocalStorage('dark-mode', true)
  const toggleDarkMode = () => setDarkMode((prev) => !prev)

  // on mount event I think?
  useEffect (() => {
    if (gameMode && playedAlreadyToday(lastPlayedDate)) {
      setCurrentRow(dailyCurrentRow)
      setBoard(dailyBoard)
      setCellStatuses(dailyCellStatuses)
      setLetterStatuses(dailyLetterStatuses)
      if (lostDailyGameMessage !== '') {
        showMessage(`😿 Mí ááádh 😿  ${ answer } an freagra ceart`, { className: 'infoToast'} )
      }
    } else {
      setBoard(initialStates.board)
      setCellStatuses(initialStates.cellStatuses)
      setLetterStatuses(initialStates.letterStatuses)
      setDailyLostGameMessage('')
    }

  }, [])

  useEffect(() => {
    if (gameState !== state.playing && !gameMode) {
      setTimeout(() => {
        openModal()
      }, 500)
    } 
    if (gameState !== state.playing && gameMode) {
      setTimeout(() => {
        setDayModeModalOpen(true)
      }, 2500)    
    }
    if (gameState !== 'playing' && gameMode) {
      updateScores()
      setTodaysDate()
    }
  }, [gameState])

  useEffect(() => {
    updateBoard()
  }, [gameMode])

  const getCellStyles = (rowNumber, colNumber, letter) => {
    if (rowNumber === currentRow) {
      if (letter) {
        return ` ${
          submittedInvalidWord ? 'submittedInvalidWord border border-red-800' : ''
        }`
      }
      return ''
    }
    


    switch (cellStatuses[rowNumber][colNumber]) {
      case status.green:
        return 'rightLetterRightPlace is-flippedColumn' + colNumber + ' delay' + colNumber
      case status.yellow:
        return 'rightLetterWrongPlace is-flippedColumn' + colNumber + ' delay' + colNumber
      case status.gray:
        return 'wrongLetter transition is-flippedColumn' + colNumber + ' delay' + colNumber
      default:
        return ''
    }
  }

  const getModeDisplay = (gameMode) => {
    if (gameMode) return 'hidden'
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

  const onEnterPress = (event) => {
    setEnterEvent(event && event.key)
    const word = board[currentRow].join('')
    setCurrentGuess(word)
    if (!isValidWord(word)) {
      setSubmittedInvalidWord(true)
      showMessage(`Níl ${word} sa stór focal 😿`, { autoClose: true, className: 'infoToast', toastClassName: 'infoToast' } )
      return
    } else {
      setSubmittedInvalidWord(false)
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

  const onDeletePress = (event) => {
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

  const percentageStatistic = () => {
    let totalGames = losses + wins
    let percentage = wins / totalGames * 100
    let percentageNumber = Math.round(Number.parseFloat(percentage))
    return isNaN(percentageNumber) ? 0 : Math.round(Number.parseFloat(percentage)) 
  }

  // every time cellStatuses updates, check if the game is won or lost
  useEffect(() => {
    const cellStatusesCopy = [...cellStatuses]
    const reversedStatuses = cellStatusesCopy.reverse()
    const lastFilledRow = reversedStatuses.find((r) => {
      return r[0] !== status.unguessed
    })

    let gameRowEnded = 0

    if (gameMode) {
      setDailyBoard(board)
      setTodaysDate()
      setDailyCurrentRow(currentRow)
      setDailyCellStatuses(cellStatuses)
      setDailyLetterStatuses(letterStatuses)
    }

    if (lastFilledRow && isRowAllGreen(lastFilledRow)) {
      let lastFilledRowIndex = reversedStatuses.findIndex((r) => {
        return (r[0]) !== status.unguessed
      })
      setRowsPlayed(6 - lastFilledRowIndex)
      gameRowEnded = 6 - lastFilledRowIndex;

      updateDistribution(gameRowEnded)

      // delay to allow player to see that all five letters are green
      setTimeout(() => {
        setGameState(state.won)
      }, 1000)
    } else if (currentRow === 6) {
      setGameState(state.lost)
      if (gameMode ) { setDailyLostGameMessage(`😿 Mí ááádh 😿  ${ answer } an freagra ceart`) }
      setTimeout(() => {
        showMessage(`😿 Mí ááádh 😿  ${ answer } an freagra ceart`, { autoClose: false, className: 'infoToast', toastClassName: 'infoToast' })  
      }, 3000)  
      setRowsPlayed(6)
      gameRowEnded = 6
    }
    let results = '';

    for (var i = 0; i < gameRowEnded; i++) {
      results += printEmojis(cellStatuses[i])
    }
      setMyResults(results)
  }, [cellStatuses, currentRow])

  const printEmojis = (item) => {
    let s = '';
    for (var i = 0; i < item.length; i++) {
      switch (item[i]) {
        case "gray":
          s = s + '⬛';
          break;
        case "unguessed":
          s = s + '⬛';
          break;
        case "green":
          s = s + '☘️';
          break;
        case "yellow":
          s = s + '💛';
          break;
        default:
          console.log('⬛', item);
          s = s + '\x0A';
      }
    }
    return (
      s = s + '\x0A'
    )
  }

  const updateDistribution = (rowNumber) => {
    if(!playedAlreadyToday(lastScoredDate)) {
      let newDistribution = { ...distribution}
      if(rowNumber) {
        newDistribution[rowNumber]['amount'] += 1;
      }
      let largestAmount = 0;
      let objectKeyLargestAmount = '';

      for(const[key, value] of Object.entries(newDistribution)) {
        if(value.amount > largestAmount) {
          largestAmount  = value.amount
          objectKeyLargestAmount = key
        }
      }

      for (const[key, value] of Object.entries(newDistribution)) {
        if (key === objectKeyLargestAmount) {
          newDistribution[key]['percentage'] =  100
        } else {
          if(key !== 'total') {
            newDistribution[key]['percentage'] = newDistribution[key]['amount'] / newDistribution[objectKeyLargestAmount]['amount'] * 100
          }        
        }
      }
      setDistribution(newDistribution)
    }
  }

  const updateLetterStatuses = (word) => {
    let i = 0
    word.split('').forEach((letter) => {
      const answer_letter = answer[i]
      setTimeout(() => {
        setLetterStatuses((prev) => {
          const newLetterStatuses = { ...prev }
          if (newLetterStatuses[letter] === status.green) return newLetterStatuses
          if (letter === answer_letter) {
            newLetterStatuses[letter] = status.green
          } else if (answer.includes(letter)) {
            newLetterStatuses[letter] = status.yellow
          } else {
            newLetterStatuses[letter] = status.gray
          }
          return newLetterStatuses
        })
      }, (1 + i) * 500)
      i++
    })
  }

  function testNativeShare(shareData) {
    return matchMedia('(pointer:coarse)').matches &&  // ~ is mobile - native share not wanted on desktop
      navigator.userAgent.toLowerCase().indexOf('firefox') === -1 &&  // firefox for Android reports that it can share, but doesn't support the `text` param (firefox on iOS can use the native share, but doesn't include 'firefox', instead includes 'FxiOS')
      navigator.share &&   // should catch lack of support in webview on Android?
      navigator.canShare(shareData);  // can actually share what we want to
  }

  const shareResults = () => {
    let rowString = gameState === state.lost ? 'X' : rowsPlayed
    const shareText = "FOCLACH " + getTodaysWordNumber() + ' - ' + rowString + "/6\x0A"  + myResults + "\x0A";
    const shareData = {
      text: shareText,
      // url: 'https://www.foclach.com/',  // disabled: a URL here overrides instead of complements the .text  on iOS
    }

    if (document.location.protocol !== 'https:') {
      // dev: both methods seem to fail silently on iOS without https
      alert(shareData.text);
    } else if (testNativeShare(shareData)) {
      navigator.share(shareData)
        .then(() => {
          //console.log('Successful share')
        })
        .catch((error) => {
          // this can be fine, e.g. 'AbortError: Abort due to cancellation of share'
          // don't want to copyToClipboard now if user pressed the 'x', but also we'd get a 'NotAllowedError' on iOS as it doesn't work as in a promise callback because it's not directly initiated by user
        });
    } else {
      copyToClipboard(shareText);
    }
  }

  const copyToClipboard = (shareText) => {
    navigator.clipboard.writeText(shareText).then(function(){
      setClipboardMessage(dictionary['ResultsCopiedToClipboard'])
      showMessage(dictionary['ResultsCopiedToClipboard'], { className: 'infoToast'})
    }, function(){
      console.log('there was a problem heuston')
    });
  }


  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#0D313F'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      height: 'calc(100% - 2rem)',
      width: 'calc(100% - 2rem)',
      background: 'rgb(25,42,73)',
      background: 'linear-gradient(180deg, rgb(47, 55, 69) 0%,    rgb(34, 66, 79) 42%, rgba(70, 107, 120, 0.995)    100%)',
      border: 'none',
      borderRadius: '1rem',
      position: 'relative',
      maxWidth: '500px'
    },
  }

  return (
    <CacheBuster
      currentVersion={packInfo.version}
      isEnabled={true} //If false, the library is disabled.
      isVerboseMode={true} //If true, the library writes verbose logs to console.
    >
   
    <div className={gameMode ? '' : 'practiceMode'}>
      <div className={`appContainer`}>
        <header className="appHeader">
          <button type="button" onClick={() => setSettingsModalIsOpen(true)}>
            <Settings />
          </button>
          <h1 className="siteTitle">
            FOCLACH
              <small className={`${getModeDisplay(gameMode)} subTitleMode`}>{dictionary['PracticeMode']}</small>
          </h1>
          <div>
             <button 
              className="statisticIcon"
              type="button" 
              onClick={() => setDayModeModalOpen(true)}>
            <Statistics />
          </button>
          <button 
            className="InfoIcon"
            type="button" onClick={() => setInfoModalIsOpen(true)}>
            <Info />
          </button>
          <button 
            className="HistoryIcon"
            type="button" onClick={() => setAnswerHistoryModalIsOpen(true)}>
            <History />
          </button>
          </div>
         
        </header>
        <div className="gameContainer">
          <div>        
           <div id="gameBoard" className="gameBoard">         
            {board.map((row, rowNumber) =>
              row.map((letter, colNumber) => (
                  <span
                    key={colNumber}
                    className={`${getCellStyles(
                    rowNumber,
                    colNumber,
                    letter,                  
                  )} letterTile`}
                  >
                    <span className="innerLetter">
                      {letter}
                    </span>
                  
                  </span>             
              ))
            )}
          </div>
          </div>     
        </div>

        <AnswersHistory 
          styles={modalStyles}
          historicalAnswers={[dailyAnswers]}
          isOpen={answerHistoryModalIsOpen}
          handleClose={() => setAnswerHistoryModalIsOpen(false)}
        />
        
        <InfoModal
          isOpen={infoModalIsOpen}
          handleClose={handleInfoClose}
          darkMode={darkMode}
          styles={modalStyles}
          gameMode={gameMode}
          toggleGameMode={toggleGameMode}
        />
        <EndGameModal
          isOpen={dayModeModalOpen}
          handleClose={() => setDayModeModalOpen(false)}
          styles={modalStyles}
          gameState={gameState}
          state={state}
          currentStreak={currentWinStreak}
          longestStreak={longestWinStreak}
          answer={answer}
          shareResults={shareResults}
          isCopied={copiedToClipboard}
          percentage={percentageStatistic()}
          totalPlayed={wins + losses}
          message={clipboardMessage}
          gameMode={gameMode}
          toggleGameMode={toggleGameMode}
          version={packInfo.version}
          distribution={distribution}
        />
        <SettingsModal
          isOpen={settingsModalIsOpen}
          handleClose={() => setSettingsModalIsOpen(false)}
          styles={modalStyles}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          getAnswer={getAnswer}
          gameMode={gameMode}
          toggleGameMode={toggleGameMode}
        />
        <EndGameButtons
          playAgain={() => {
            setAnswer(getRandomAnswer())
            setBoard(initialStates.board)
            setGameState(initialStates.gameState)
            setCellStatuses(initialStates.cellStatuses)
            setCurrentRow(initialStates.currentRow)
            setCurrentCol(initialStates.currentCol)
            setLetterStatuses(initialStates.letterStatuses)
            setRowsPlayed(0)
            setMyResults('')
            closeModal()
          }}
          shareResults={shareResults}
          gameMode={gameMode}
          isOpen={modalIsOpen}
          answer={answer.toLowerCase()}
        ></EndGameButtons>
        <Keyboard
          isNotOpen={modalIsOpen}
          letterStatuses={letterStatuses}
          addLetter={addLetter}
          onEnterPress={onEnterPress}
          onDeletePress={onDeletePress}
          gameDisabled={gameState !== state.playing}
        />
        <ToastContainer 
          position="top-center"
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
     </CacheBuster>
  )
}

export default App
