import { useLocalStorage } from '../../hooks/useLocalStorage'

const updateMode = function (x) {
    console.log('params', x)
}

function GameModePicker() {
    const [gameMode, setGameMode] = useLocalStorage('daily', true)
    console.log(gameMode, 'gameMode')
    return (
        <div className="radio-btn-container">
        <div
          className="radio-btn"
          onClick={()=>{setGameMode(true)}}>
          <input
            type="radio"
            value="daily"
            name="gameMode"
            checked={gameMode}
            onChange={()=>{}}
          />
          Daily
        </div>
        <div
          className="radio-btn"
          onClick={() => {
            setGameMode(false);
          }}       
        >
          <input          
            onChange={()=>{}}
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

export { GameModePicker }