import { ReactComponent as Close } from '../data/Close.svg'
import Modal from 'react-modal'
import InstallPWA from './InstallPWA'
import { dictionary } from '../constants'

Modal.setAppElement('#root')



export const SettingsModal = ({ 
  isOpen, 
  handleClose, 
  styles, 
  darkMode
 }) => {
  const appVersion = navigator.appVersion;
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const vendor = navigator.vendor;
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
          <div className="getHelpContainer">
            <h1 className="downloadTitle">TACAÍOCHT</h1>
            <p className="SettingModal-paragraph">             
            Tabhair le fios dúinn, le do thoil, má thugann tú faoi deara aon rud nach bhfuil ag obair i gceart, trí
              <a href={`mailto:linda.mary.keating@gmail.com?subject=Fadhb le Foclach&body=****NB NA SCRIOS NA SONRAÍ SEO.  PLEASE DO NOT DELETE THESE DETAILS.  I NEED THEM TO HELP ME IDENTIFY PROBLEMS QUICKER. Seo iad mo shonraí appVersion=${appVersion} userAgent=${userAgent} platform=${platform} vendor=${vendor}`}> ríomhphost a chur </a> chugainn. 
               Mínigh, chomh cruinn agus is féidir, caidé nach bhfuil ag obair duit agus déanfaidh muid ár ndícheall é a chóiriú chomh luath agus is féidir.
            </p>
          </div>
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
          <p className="SettingModal-paragraph">
            Tá an cluiche Foclach bunaithe ar an chluiche Wordle le <i>Josh Wardle</i> <a href="https://twitter.com/powerlanguish">@powerlanguish </a>
          </p>
          <p className="SettingModal-paragraph">
            Rinneadh an cód foinseach a chraobhú ón stór a rinne <a href="https://octokatherine.github.io/word-master/">octokatherine</a> - a bhunaigh an cód agus an dearadh ar an chluiche focal Wordle le @powerlanguish </p>
          <p className="SettingModal-paragraph">
            Tógadh liosta na bhfocal ón liosta seo le Michal Měchura: <a href="https://github.com/michmech/irish-word-frequency">michmech irish word frequency</a> </p>
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {dictionary['IfYouAreEnjoyingThisGame']}{' '}
              <a href="https://www.buymeacoffee.com/lindamary" target="_blank" rel="noopener noreferrer">
                {dictionary['BuyMeACoffee']}
              </a>{' '}
              💛 <br/>
            </div>
            <a href="https://www.buymeacoffee.com/lindamary" target="_blank" rel="noopener noreferrer">
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
