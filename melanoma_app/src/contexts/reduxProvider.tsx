import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import CustomProviderProps from "./customProviderProps";

import { melanomaApi } from "@/services/melanomaApi";

const store = configureStore({
  reducer: {
    [melanomaApi.reducerPath]: melanomaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(melanomaApi.middleware),
});

const ReduxProvider = ({ children }: CustomProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
