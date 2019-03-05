import React from 'react';
import PropType from 'prop-types';

// styles
import './About.scss';

const About = ({ clearSpecialViews }) => (
    <div className="about">
        <p className="return" onClick={clearSpecialViews}>
            <i className="fas fa-arrow-left"></i> Back to the main page
        </p>
    </div>
);

About.propTypes = {
    clearSpecialViews: PropType.func.isRequired,
};

export default About
