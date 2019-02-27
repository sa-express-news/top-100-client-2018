import React from 'react';
import PropTypes from 'prop-types';

// components
import ENLogo       from '../ENLogo/ENLogo';
import SocialBlock  from '../SocialBlock/SocialBlock';

// styles
import './NavBar.scss';

const NavBar = ({ checkout, url }) => (
    <div className="nav-bar">
        <div className="left">
            <ENLogo />
            <div className="links">
                <ul>
                    <li><a href={checkout} target="_blank">Subscribe</a></li>
                    <li><a href={checkout} target="_blank">Premium Eats</a></li>
                </ul>
            </div>
        </div>
        <div className="right">
            <SocialBlock url={url} />
        </div>
    </div>
);

NavBar.propTypes = {
    url: PropTypes.string.isRequired,
    checkout: PropTypes.string.isRequired,
}

export default NavBar;