import { dictionary } from "../constants"

const GameStats = (currentStreak, longestStreak) => {
    return <div className="gameStats">
            <div className="stat buannaGanBriseadh">
                <div className="number">{currentStreak}</div>
                <div>{dictionary.CurrentStreak}</div>
            </div>
            <div className="stat allTimebuannaGanBriseadh">
                <div className="number">{longestStreak}</div>
                <div>{dictionary.LongestStreak}</div>
            </div>
        </div>
}

export { GameStats }