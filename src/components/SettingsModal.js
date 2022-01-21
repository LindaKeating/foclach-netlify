import { ReactComponent as Close } from '../data/Close.svg'
import Modal from 'react-modal'
import InstallPWA from './InstallPWA'
import { dictionary } from '../constants'
import { GameModePicker } from './gameModePicker/gameModePicker'

Modal.setAppElement('#root')

export const SettingsModal = ({ isOpen, handleClose, styles, darkMode, toggleDarkMode, downloadApp }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={styles}
      contentLabel="Game Info Modal"
    >
      <div className={`h-full ${darkMode ? 'dark' : ''}`}>
        <div
          className={``}
        >
          <div className="">
            <button
              className="closeButton"
              onClick={handleClose}
            >
              <Close />
            </button>
          </div>
          <GameModePicker />
          <div className="downloadAppContainer">
            <h1 className="downloadTitle">{dictionary['DownloadAppToPhone']}</h1>
            <ul className="downloadBenefits">
              <li>⭐ {dictionary['PlayTheGameOffline']}</li>
              <li>⭐ {dictionary['UseLessData']}</li>
              <li>⭐ {dictionary['OneClickAccessFromHomeScreen']}</li>
            </ul>
            <InstallPWA />
          </div>
          <h1 className="modalTitle">{dictionary['About']}</h1>
          <p className="mb-[1rem]">
            Tá an cluiche Foclach bunaithe ar an chluiche Wordle le <i>Josh Wardle</i> <a href="https://twitter.com/powerlanguish">@powerlanguish </a>
          </p>
          <p className="mb-[1rem]">
            Rinneadh an cód foinseach a chraobhú ón stór a rinne <a href="https://octokatherine.github.io/word-master/">octokatherine</a> - a bhunaigh an cód agus an dearadh ar an chluiche focal Wordle le @powerlanguish </p>
          <p className="mb-[1rem]">
            Tógadh liosta na bhfocal ón liosta seo, le Michal Měchura: <a href="https://github.com/michmech/irish-word-frequency">michmech irish word frequency</a> </p>
          <p className="mb-[1rem]">Más maith leat cluichí focal agus tomhasanna as Gaeilge, b’fhéidir go mbeadh dúil agat sa leabhar <a href="https://eabhloid.com/siopa/tomhas-orm-tomhas-ort">Tomhas Orm, Tomhas Ort!</a>, foilsithe ag Éabhlóid:  Bailiúchán tomhasanna ón bhéaloideas.
          </p>
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {dictionary['IfYouAreEnjoyingThisGame']}{' '}
              <a href="https://www.buymeacoffee.com/lindamary" target="_blank">
                {dictionary['BuyMeACoffee']}
              </a>{' '}
              💛
            </div>
            <a href="https://www.buymeacoffee.com/lindamary" target="_blank">
              <img
                alt="buy me a coffee"
                src="https://img.buymeacoffee.com/button-api/?text=Ceannaigh beoir domh&emoji=&slug=lindamary&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
              />
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
}
