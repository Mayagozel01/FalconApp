import React from 'react';
import PropTypes from 'prop-types';

export const LayersContext = React.createContext(null);

export const LayersProvider = ({ users, children }) => {
    return (
        <LayersContext.Provider value={users}>
            {children}
        </LayersContext.Provider>
    )
}

LayersProvider.propTypes = {
    users: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
}