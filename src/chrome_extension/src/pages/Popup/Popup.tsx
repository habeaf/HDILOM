import { useEffect, useState } from "react";
import { Header } from "../../common/components/Header/Header";
import { PopupContent } from "./Popup.content";
import classNames from "classnames";
import "./Popup.scss";

const Popup = () => {
  const [isFelixActive, setIsFelixActive] = useState(false);

  useEffect(() => {
    (async () => {
      const { isFelixActive: _isFelixActive } = await chrome.storage.local.get(["isFelixActive"]);

      setIsFelixActive(_isFelixActive);
    })();
  }, []);

  const redirectToSetupPage = () => {
    chrome.tabs.create({ url: "/Setup/index.html" });
  };

  const triggerFelix = async () => {
    const { setupImages } = await chrome.storage.local.get(["setupImages"]);

    if (!setupImages) {
      alert("Please setup images first!");
      return;
    }

    if (isFelixActive) {
      setIsFelixActive(!isFelixActive);
      await chrome.storage.local.set({ isFelixActive: !isFelixActive });
    } else {
      setIsFelixActive(true);
      await chrome.storage.local.set({ isFelixActive: true });
    }

    chrome.tabs.reload(() => {});
  };

  return (
    <div className="popup">
      <Header />
      <div className="context">
        <p>{PopupContent.welcomeTitle}</p>
        <p>{PopupContent.welcomeText}</p>
        <p>{PopupContent.welcomeSummary}</p>
      </div>
      <div className="buttons">
        <button className="setup-page-button button" onClick={redirectToSetupPage}>
          {PopupContent.setupPageButton}
        </button>
        <button className={classNames("lets-felix-button button", isFelixActive && "active")} onClick={triggerFelix}>
          {PopupContent.letsFelixButton}
        </button>
      </div>
    </div>
  );
};

export { Popup };
