import { keyboardLetters, status, letters } from '../constants'
import { useEffect, useCallback } from 'react'
/* eslint-disable */
const Keyboard = (props) => {
  const getKeyStyle = (letter) => {
    switch (props.letterStatuses[letter]) {
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
      if (props.gameDisabled) return

      const letter = event.key.toUpperCase()

      if (letters.includes(letter)) {
        props.addLetter(letter)
      } else if (letter === 'ENTER') {
        props.onEnterPress(event)
        event.preventDefault()
      } else if (letter === 'BACKSPACE') {
        props.onDeletePress()
      }
    },
    [props.addLetter, props.onEnterPress, props.onDeletePress, props.gameDisabled]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if(!props.isNotOpen) {
    return (
      <div className="keyboardContainer">
        {keyboardLetters.map((row, idx) => (
          <div key={idx} className="keyboardRow">
            {idx === 2 && (
              <button
                onClick={props.onEnterPress}
                className="TomhasButton keyboardButton"
                disabled={props.gameDisabled}
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
                onClick={props.onDeletePress}
                className="keyboardButton"
              >
                siar
              </button>
            )}
          </div>
        ))}
      </div>
    )
  } else {
    return <div></div>
  }

}

export { Keyboard }
