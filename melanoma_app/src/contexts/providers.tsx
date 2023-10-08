import CustomProviderProps from "./customProviderProps";
import CurrentPictureMediaProvider from "./pictureMediaContext";

const Providers = ({ children }: CustomProviderProps) => {
  return <CurrentPictureMediaProvider>{children}</CurrentPictureMediaProvider>;
};

export default Providers;
