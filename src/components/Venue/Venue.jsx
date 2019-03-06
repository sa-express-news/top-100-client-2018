import React, { Component } from 'react';
import PropType from 'prop-types';

// styles
import './Venue.scss';

const Banner = ({ photo, isFiltered, ranking }) => {
    const className = !isFiltered && ranking === 'Best' ? 'img-responsive best' : 'img-responsive';
    return (
        <img className={className} src={photo} />
    );
}

const Name = ({ isFiltered, ranking, name }) => (
    <div className="name">
        {!isFiltered && typeof ranking === 'number' &&
            <span>{ranking}. </span>
        }
        {!isFiltered && ranking === 'Best' &&
            <span className="best">{ranking}: </span>
        }
        {name}
    </div>
);

const Review = ({ review }) => (
    <p className="review">
        <a href={review} target="_blank">Read the review</a>
    </p>
);

const Website = ({ website }) => (
    <p className="website">
        <a href={website} target="_blank">Visit website</a>
    </p>
);

const Venue = props => (
    <div className="venue">
        <div className="inner">
            <a href={props.link} target="_blank">
                <Banner {...props} />
                <Name {...props} />
            </a>
            <p><span className="cuisine">{props.cusine}</span> | {props.neighborhood}</p>
            <hr />
            {props.review && <Review review={props.review} />}
            {!props.review && <Website website={props.website} />}
            <p
                className="reveal"
                onClick={() => props.setVenueInFocus(props.id)}
            >
                Address, hours and other details
            </p>
        </div>
    </div>
);

Venue.propTypes = {
    id: PropType.number.isRequired,
    Ranking: PropType.oneOfType([
        PropType.string,
        PropType.number
    ]),
    name: PropType.string.isRequired,
    photo: PropType.string.isRequired,
    cusine: PropType.string.isRequired,
    neighborhood: PropType.string.isRequired,
    review: PropType.string,
    link: PropType.string.isRequired,
    website: PropType.string.isRequired,
    isFiltered: PropType.bool.isRequired,
    setVenueInFocus: PropType.func.isRequired,
};

export default Venue
