import {
  Context,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useEffect,
} from "react";

interface SetupPageContext {
  setupImages: {
    1?: Blob;
    2?: Blob;
    3?: Blob;
  };
  setSetupImages: Dispatch<SetStateAction<SetupPageContext["setupImages"]>>;
}

const defaultSetupPageContext: SetupPageContext = {
  setupImages: {
    1: undefined,
    2: undefined,
    3: undefined,
  },

  setSetupImages: () => {},
};

const SetupPageContext: Context<SetupPageContext> = createContext(defaultSetupPageContext);

const useSetupPage = () => useContext(SetupPageContext);

interface SetupPageProviderProps {}

const SetupPageProvider = ({ children }: PropsWithChildren<SetupPageProviderProps>) => {
  const [setupImages, setSetupImages] = useState(defaultSetupPageContext.setupImages);

  useEffect(() => {
    (async () => {
      const result = await chrome.storage.local.get(["setupImages"]);
      const setupImagesFromLocalStorage = result.setupImages;

      if (setupImagesFromLocalStorage) setSetupImages(setupImagesFromLocalStorage);
    })();
  }, []);

  return (
    <SetupPageContext.Provider
      value={{
        setupImages,
        setSetupImages,
      }}
    >
      {children}
    </SetupPageContext.Provider>
  );
};

export { SetupPageProvider, useSetupPage, SetupPageContext, defaultSetupPageContext };
