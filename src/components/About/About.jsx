import React from 'react';
import PropType from 'prop-types';

// styles
import './About.scss';

const About = ({ toggleAboutPage }) => (
    <div className="about">
        <p className="return" onClick={toggleAboutPage}>
            <i className="fas fa-arrow-left"></i> Back to the main page
        </p>
    </div>
);

About.propTypes = {
    toggleAboutPage: PropType.func.isRequired,
};

export default About
