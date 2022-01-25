import { useLocalStorage } from '../../hooks/useLocalStorage'
import { dictionary } from '../../constants'
export const GameModePicker = ({ gameMode, toggleGameMode}) => {
    return (
        <div className="radio-btn-container">
        <div
          className="radio-btn"
          onClick={toggleGameMode}>
          <input
            type="radio"
            value="daily"
            name="gameMode"
            checked={gameMode}
            onChange={() => {}}
          />
          {dictionary['DayMode']}
        </div>
        <div
          className="radio-btn"
          onClick={toggleGameMode}       
        >
          <input          
            onChange={() => {}}
            type="radio"
            value="free"
            name="gameMode"
            checked={!gameMode}
          />
          {dictionary['PracticeMode']}
        </div>
      </div>
    )
}