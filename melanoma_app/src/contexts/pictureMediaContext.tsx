import { createContext, useContext, useState } from "react";

import CustomProviderProps from "./customProviderProps";

import PictureMedia from "@/models/pictureMedia";

interface CurrentPictureMediaContextType {
  currentPictureMedia: PictureMedia;
  setCurrentPictureMedia: (pictureMedia: PictureMedia) => void;
}

const CurrentPictureMediaContext =
  createContext<CurrentPictureMediaContextType>({
    currentPictureMedia: {},
    setCurrentPictureMedia: () => null,
  });

const CurrentPictureMediaProvider = ({ children }: CustomProviderProps) => {
  const [currentPictureMedia, setCurrentPictureMedia] = useState<PictureMedia>(
    {}
  );

  return (
    <CurrentPictureMediaContext.Provider
      value={{
        currentPictureMedia,
        setCurrentPictureMedia,
      }}
    >
      {children}
    </CurrentPictureMediaContext.Provider>
  );
};

export const useCurrentPictureMedia = () => {
  return useContext(CurrentPictureMediaContext);
};

export default CurrentPictureMediaProvider;
