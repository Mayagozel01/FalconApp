import PropTypes from "prop-types";
import React from "react";

export const LayoutContext = React.createContext(null);

export const LayoutProvider = ({ users, children }) => {
  return (
    <LayoutContext.Provider value={users}>{children}</LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = {
  users: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
