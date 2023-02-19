import { Box } from "./components/Box/Box";
import { Header } from "../../common/components/Header/Header";
import { useSetupPage } from "./contexts/setupPage";
import { SetupPageContent } from "./SetupPage.content";
import { SETUP_REDIRECTION_PAGE } from "../../constants";

const SetupPage = () => {
  const { setupImages } = useSetupPage();

  const isReady = Object.entries(setupImages).filter(([key, value]) => value === undefined).length === 0;

  const handleReady = async () => {
    await chrome.storage.local.set({
      setupImages: setupImages,
    });

    await chrome.storage.local.set({ isFelixActive: true });
    window.location.href = SETUP_REDIRECTION_PAGE;
  };

  return (
    <div className="setup-page-wrapper">
      <Header />
      <div className="setup-page">
        <p className="setup-page-top-description description">{SetupPageContent.topDescription}</p>
        <div className="boxes">
          {SetupPageContent.boxes?.map((box) => {
            return <Box id={box.id} key={box.id} label={box.label} placeholderImg={box.placeHolderImg} />;
          })}
        </div>
        <p className="setup-page-bottom-description description">{SetupPageContent.bottomDescription}</p>
        {isReady && (
          <div className="ready-button" onClick={handleReady}>
            <p>Ready!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { SetupPage };
