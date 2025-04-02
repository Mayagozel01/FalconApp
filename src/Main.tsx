import React, { useReducer } from "react";
import { settings } from "./config";
import AppContext from "./context/Context";
import { getColor, getItemFromStore } from "./helpers/utils";
import useToggleStyle from "./hooks/useToggleStyle";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

interface ConfigState {
  isFluid: boolean;
  isRTL: boolean;
  isDark: boolean;
  navbarPosition: string;
  disabledNavbarPosition: string[];
  isNavbarVerticalCollapsed: boolean;
  navbarStyle: string;
  currency: string;
  showBurgerMenu: boolean;
  showSettingPanel: boolean;
  navbarCollapsed: boolean;
}

interface MainProps {
  children: React.ReactNode;
}

enum ActionTypes {
  SET_CONFIG = "SET_CONFIG",
}

interface ConfigAction {
  type: ActionTypes;
  payload: {
    key: keyof ConfigState;
    value: any;
    setInStore: boolean;
  };
}


const configReducer = (state: ConfigState, action: ConfigAction): ConfigState => {
  switch (action.type) {
    case ActionTypes.SET_CONFIG:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
};

interface AppContextValue extends ConfigState {
  setConfig: (key: keyof ConfigState, value: any) => void;
  configDispatch: React.Dispatch<ConfigAction>;
}

const Main: React.FC<MainProps> = ({ children }) => {
  const configState: ConfigState = {
    isFluid: getItemFromStore("isFluid", settings.isFluid),
    isRTL: getItemFromStore("isRTL", settings.isRTL),
    isDark: getItemFromStore("isDark", settings.isDark),
    navbarPosition: getItemFromStore("navbarPosition", settings.navbarPosition),
    disabledNavbarPosition: [],
    isNavbarVerticalCollapsed: getItemFromStore(
      "isNavbarVerticalCollapsed",
      settings.isNavbarVerticalCollapsed
    ),
    navbarStyle: getItemFromStore("navbarStyle", settings.navbarStyle),
    currency: settings.currency,
    showBurgerMenu: settings.showBurgerMenu,
    showSettingPanel: false,
    navbarCollapsed: false,
  };


  const [config, configDispatch] = useReducer(configReducer, configState);

  const { isLoaded } = useToggleStyle(config.isRTL, config.isDark, configDispatch);


  const setConfig = (key: keyof ConfigState, value: any) => {
    configDispatch({
      type: ActionTypes.SET_CONFIG,
      payload: {
        key,
        value,
        setInStore: [
          "isFluid",
          "isRTL",
          "isDark",
          "navbarPosition",
          "isNavbarVerticalCollapsed",
          "navbarStyle",
        ].includes(key),
      },
    });
  };


  if (!isLoaded) {
    const loadingStyle: React.CSSProperties = {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: config.isDark ? getColor("dark") : getColor("light"),
    };

    return <div style={loadingStyle} />;
  }

 
  const contextValue: AppContextValue = {
    ...config,
    setConfig,
    configDispatch,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default Main;