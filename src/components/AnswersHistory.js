import Modal from 'react-modal'
import { ReactComponent as Close } from '../data/Close.svg'
Modal.setAppElement('#root')

export const AnswersHistory = ({
  historicalAnswers,
  isOpen,
  styles,
  handleClose
}) => {
  return (
    <Modal
      isOpen={isOpen}
      historicalAnswers={historicalAnswers}
      onRequestClose={handleClose}
      style={styles}
    >
      <div className="h-full dark AnswersHistory">
        <div className="AnswersHistory-Header">
          <button 
            className="closeButton"
            onClick={handleClose}><Close/></button>
        </div>

        <div className="AnswersHistory-Body">
          <h1 className="AnswerHistory-Heading">Stair na bhFreagraí</h1>
          <hr/>
          <table className="AnswersHistory-List ">
            <tr><th>#</th><th>Freagra</th><th>Dáta</th></tr>
            {

              Object.entries(historicalAnswers[0]).reverse().map(([key, value]) => {
                var today = new Date();
                var answerDate = new Date(key); 
                today.setDate(today.getDate() - 1);
                if (answerDate < today ) {
                  return (
                    <tr key={key}> <td>{value.number}</td><td>{value.word }</td><td>{key}</td></tr>
                  )
                } else {
                  return (null)
                }
              })
             //historicalAnswers.map((answer, i) => (<li>{answer }</li>))
            }
          </table>
        </div>
      </div>
    </Modal>
  )
}