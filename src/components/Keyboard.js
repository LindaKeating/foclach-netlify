import { keyboardLetters, status, letters, dictionary} from '../constants'
import { useEffect, useCallback } from 'react'

const Keyboard = ({ letterStatuses, addLetter, onEnterPress, onDeletePress, gameDisabled }) => {
  const getKeyStyle = (letter) => {
    switch (letterStatuses[letter]) {
      case status.green:
        return 'rightLetterRightPlace'
      case status.yellow:
        return 'rightLetterWrongPlace'
      case status.gray:
        return 'wrongLetter'
      default:
        return ''
    }
  }

  const onKeyButtonPress = (letter) => {
    letter = letter.toLowerCase()
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: letter,
      })
    )
  }

  const handleKeyDown = useCallback(
    (event) => {
      if (gameDisabled) return

      const letter = event.key.toUpperCase()

      if (letters.includes(letter)) {
        addLetter(letter)
      } else if (letter === 'ENTER') {
        onEnterPress()
        event.preventDefault()
      } else if (letter === 'BACKSPACE') {
        onDeletePress()
      }
    },
    [addLetter, onEnterPress, onDeletePress, gameDisabled]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="keyboardContainer">
      {keyboardLetters.map((row, idx) => (
        <div key={idx} className="keyboardRow">
          {idx === 2 && (
            <button
              onClick={onEnterPress}
              className="TomhasButton keyboardButton"
            >
              Tomhas
            </button>
          )}
          {row.map((letter) => (
            <button
              onClick={() => onKeyButtonPress(letter)}
              key={letter}
              className={`keyboardButton  ${getKeyStyle(letter)}`}
            >
                {letter}
            </button>
          ))}
          {idx === 2 && (
            <button
              onClick={onDeletePress}
              className="keyboardButton"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export { Keyboard }
