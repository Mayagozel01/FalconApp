// Main.js
import { settings } from "config";
import AppContext from "context/Context";
import { getColor, getItemFromStore } from "helpers/utils";
import useToggleStyle from "hooks/useToggleStyle";
import PropTypes from "prop-types";
import { useReducer } from "react";
import { configReducer } from "reducers/configReducer";

import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const Main = (props) => {
  const configState = {
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

  const { isLoaded } = useToggleStyle(
    config.isRTL,
    config.isDark,
    configDispatch
  );

  const setConfig = (key, value) => {
    configDispatch({
      type: "SET_CONFIG",
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
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: config.isDark ? getColor("dark") : getColor("light"),
        }}
      />
    );
  }
  return (
    <AppContext.Provider value={{ setConfig, configDispatch, ...config }}>
      {props.children}
    </AppContext.Provider>
  );
};

Main.propTypes = { children: PropTypes.node };

export default Main;
