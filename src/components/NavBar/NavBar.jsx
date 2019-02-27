import React from 'react';
import PropTypes from 'prop-types';

// styles
import './NavBar.scss';

const NavBar = ({ children }) => (
    <div className="nav-bar">
        {children}
    </div>
);

NavBar.propTypes = {
    socialLinks: PropTypes.shape({
        facebook: PropTypes.string.isRequired,
        twitter: PropTypes.string.isRequired,
        reddit: PropTypes.string.isRequired,
    }).isRequired,
}

export default NavBar;