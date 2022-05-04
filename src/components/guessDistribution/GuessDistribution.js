const GuessDistribution = ({distribution}) => {
      return (
        <div id="guess-distribution">
          <div className="graph-container">
            <div className="guess">1</div>
            <div className="graph">
              <div className="graph-bar" style={{width: distribution[1]['percentage'] +'%'}}>
                <div className="num-guesses">{distribution[1]['amount'] > 0 ? distribution[1]['amount'] : ''}</div>
              </div>
            </div>
          </div>
          <div className="graph-container">
            <div className="guess">2</div>
            <div className="graph">
              <div className="graph-bar" style={{width: distribution[2]['percentage'] +'%'}}>
                <div className="num-guesses">{distribution[2]['amount'] > 0 ? distribution[2]['amount'] : ''}</div>
              </div>
            </div>
          </div>
          <div className="graph-container">
            <div className="guess">3</div>
            <div className="graph">
              <div className="graph-bar" style={{width: distribution[3]['percentage'] +'%'}}>
                <div className="num-guesses">{distribution[3]['amount'] > 0 ? distribution[3]['amount'] : ''}</div>
              </div>
            </div>
          </div>
          <div className="graph-container">
            <div className="guess">4</div>
            <div className="graph">
              <div className="graph-bar" style={{width: distribution[4]['percentage'] + '%'}}>
                <div className="num-guesses">{distribution[4]['amount'] > 0 ? distribution[4]['amount'] : ''}</div>
              </div>
            </div>
          </div>
          <div className="graph-container">
            <div className="guess">5</div>
            <div className="graph">
              <div className="graph-bar" style={{width: distribution[5]['percentage'] + '%'}}>
                <div className="num-guesses">{distribution[5]['amount'] > 0 ? distribution[5]['amount'] : ''}</div>
              </div>
            </div>
          </div>
          <div className="graph-container">
            <div className="guess">6</div>
            <div className="graph">
              <div className="graph-bar" style={{width: distribution[6]['percentage'] + '%'}}>
                <div className="num-guesses">{distribution[6]['amount'] > 0 ? distribution[6]['amount'] : ''}</div>
              </div>
            </div>
          </div>
        </div>
    );
}

export { GuessDistribution };