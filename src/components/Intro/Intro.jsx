import React from 'react';
import PropTypes from 'prop-types';

// styles
import './Intro.scss';

const Intro = ({ meta }) => {
    const { desc, subscribeText, signupText, listenText, checkout, premiumEats, podcast, banner } = meta;
    return (
        <div className="intro">
            <img src={banner} className="img-responsive" />
            <div className="text">
                <p>{desc}</p>
            </div>
            <div className="call">
                <p><a href={checkout} target="_blank"><strong>Subscribe</strong></a>: {subscribeText}</p>
                <p><a href={premiumEats} target="_blank"><strong>Sign up</strong></a>: {signupText}</p>
                <p><a href={podcast} target="_blank"><strong>Listen</strong></a>: {listenText}</p>
            </div>
        </div>
    );
};

Intro.propTypes = {
    meta: PropTypes.shape({
        desc: PropTypes.string.isRequired,
        subscribeText: PropTypes.string.isRequired,
        signupText: PropTypes.string.isRequired,
        listenText: PropTypes.string.isRequired,
        checkout: PropTypes.string.isRequired,
        premiumEats: PropTypes.string.isRequired,
        podcast: PropTypes.string.isRequired,
        banner: PropTypes.string.isRequired,
    }).isRequired,
};

export default Intro;
