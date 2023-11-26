import CustomProviderProps from "./customProviderProps";
import CurrentPictureMediaProvider from "./pictureMediaContext";
import ReduxProvider from "./reduxProvider";
import UserProvider from "./userContext";

const Providers = ({ children }: CustomProviderProps) => {
  return (
    <CurrentPictureMediaProvider>
      <ReduxProvider>
        <UserProvider>{children}</UserProvider>
      </ReduxProvider>
    </CurrentPictureMediaProvider>
  );
};

export default Providers;
