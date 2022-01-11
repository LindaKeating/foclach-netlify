import { ReactComponent as Close } from '../data/Close.svg'
import Modal from 'react-modal'
import { dictionary } from '../constants'

Modal.setAppElement('#root')

export const SettingsModal = ({ isOpen, handleClose, styles, darkMode, toggleDarkMode }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={styles}
      contentLabel="Game Info Modal"
    >
      <div className={`h-full ${darkMode ? 'dark' : ''}`}>
        <div
          className={`h-full flex flex-col items-center justify-center max-w-[390px] mx-auto pt-9 text-primary dark:text-primary-dark `}
        >
          <div className="flex-1 w-full">
            <button
              className="absolute top-4 right-4 rounded-full nm-flat-background dark:nm-flat-background-dark text-primary dark:text-primary-dark p-1 w-6 h-6 sm:p-2 sm:h-8 sm:w-8"
              onClick={handleClose}
            >
              <Close />
            </button>
            <div className="mt-12">
              <input className="m-2" type="checkbox" checked={darkMode} onClick={toggleDarkMode} />
              <span>{dictionary['DarkMode']}</span>
            </div>
          </div>
          <p className="mb-[1rem]">
            Tá an cluiche Foclach bunaithe ar an chluiche Wordle le Josh Wardle @powerlanguish 
          </p>
          <p className="mb-[1rem]">
            Rinneadh an cód foinseach a chraobhú ón stór a rinne <a href="https://octokatherine.github.io/word-master/">octokatherine</a> - a bhunaigh an cód agus an dearadh ar an chluiche focal Wordle le @powerlanguish </p>
          <p className="mb-[1rem]">
            Tógadh liosta na bhfocal ón liosta seo, le Michal Měchura: <a href="https://github.com/michmech/irish-word-frequency">michmech irish word frequency</a> </p>
          <p>Más maith leat cluichí focal agus tomhasanna as Gaeilge, b’fhéidir go mbeadh dúil agat sa leabhar <a href="https://eabhloid.com/?s=tomhas+orm+tomhas+ort">Tomhas Orm, Tomhas Ort!</a>, foilsithe ag Éabhlóid:  Bailiúchán tomhasanna ón bhéaloideas.
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
