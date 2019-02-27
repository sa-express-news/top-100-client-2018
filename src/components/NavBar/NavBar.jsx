import React from 'react';
import PropTypes from 'prop-types';

const NavBar = props => <div>Hello World!</div>;

NavBar.propTypes = {
    socialLinks: PropTypes.shape({
        facebook: PropTypes.string.isRequired,
        twitter: PropTypes.string.isRequired,
        reddit: PropTypes.string.isRequired,
    }).isRequired,
}

export default NavBar;