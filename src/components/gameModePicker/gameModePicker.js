import { useLocalStorage } from '../../hooks/useLocalStorage'

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
          Daily
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
          Free
        </div>
      </div>
    )
}

/*
function GameModePicker(props) {
    return (
        <div className="radio-btn-container">
        <div
          className="radio-btn"
          onClick={()=>{}}>
          <input
            type="radio"
            value="daily"
            name="gameMode"
            checked={props.gameMode}
            onChange={() => {}}
          />
          Daily
        </div>
        <div
          className="radio-btn"
          onClick={() => {}}       
        >
          <input          
            onChange={() => {}}
            type="radio"
            value="free"
            name="gameMode"
            checked={!props.gameMode}
          />
          Free
        </div>
      </div>
    )
} 

export { GameModePicker } */