import React, { Component } from 'react';
import PropType from 'prop-types';

// styles
import './Venue.scss';

const Banner = ({ photo }) => (
    <img className="img-responsive" src={photo} />
);

const Name = ({ isFiltered, ranking, name }) => (
    <div className="name">
        {!isFiltered && typeof ranking === 'number' &&
            <span>{ranking}. </span>
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

const addReviewLink = (props, LinkedComponent) => (
    <a href={props.review} target="_blank">
        <LinkedComponent {...props} />
    </a>
);

const reviewLinkExists = (props, LinkedComponent) => {
    if (props.review.length) {
        return addReviewLink(props, LinkedComponent);
    } else {
        return (<LinkedComponent {...props} />);
    }
};

const Venue = props => (
    <div className="venue">
        <div className="inner">
            {reviewLinkExists(props, Banner)}
            {reviewLinkExists(props, Name)}
            <p><span className="cuisine">{props.cusine}</span> | {props.neighborhood}</p>
            <hr />
            {props.review && <Review review={props.review} />}
            {!props.review && <Website website={props.website} />}
            <p className="reveal">Address, hours and other details</p>
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
    website: PropType.string.isRequired,
};

export default Venue
