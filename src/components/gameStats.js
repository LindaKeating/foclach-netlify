import { dictionary } from "../constants"

const GameStats = (props ) => {
    return <div className="gameStats">
            <div className="stat buannaGanBriseadh">
                <div className="number">{props.currentStreak}</div>
                <div>{dictionary.CurrentStreak}</div>
            </div>
            <div className="stat allTimebuannaGanBriseadh">
                <div className="number">{props.longestStreak}</div>
                <div>{dictionary.LongestStreak}</div>
            </div>
        </div>
}

export { GameStats }