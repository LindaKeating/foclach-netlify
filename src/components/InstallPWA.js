import React, { useEffect, useState } from "react";
import { dictionary } from '../constants'


const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      console.log('no prompt install found')
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
      <div>
        <button
            className="endGameButton"
            id="setup_button"
            aria-label="Install app"
            title="Install app"
            onClick={onClick}
        >
            {dictionary['DownloadNow']}
        </button>
        <small> * {dictionary['AndroidChromeOnly']}</small>
      </div>
    
  );
};

export default InstallPWA;