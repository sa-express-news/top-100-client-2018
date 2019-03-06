import React from 'react';
import PropType from 'prop-types';

// styles
import './VenueDetails.scss';

const Name = ({ ranking, name, link }) => (
    <div className="name">
        {typeof ranking === 'number' &&
            <span>{ranking}. </span>
        }
        {ranking === 'Best' &&
            <span className="best">{ranking}: </span>
        }
        {name}
        <div className="review-wrap">
            <a className="review" href={link} target="_blank">
                Read more here
            </a>
            <p className="mobile-review">
                <a href={link} target="_blank">
                    More here
                </a>
            </p>
        </div>
    </div>
);

const VenueDetails = props => (
    <div className="venue-details">
        <hr />
        <div className="menu">
            <div className="wrapper">
                <div className="inner">
                    <div className="left">
                        <img className="img-responsive" src={props.Photo} />
                        <p className="return" onClick={props.clearSpecialViews}>
                            <i className="fas fa-arrow-left"></i> Back to the main page
                        </p>
                    </div>
                    <div className="right">
                        <Name ranking={props.Ranking} link={props.Link} name={props.Name} />
                        <div className="menu-details">
                            {props.Cuisine} | {props.Neighborhood} | Price: <span>{props.Price}</span>
                        </div>
                        <hr />
                        <p className="address">
                            <i className="fas fa-map"></i>&nbsp;
                            <strong>Address:</strong> {props.Address}
                        </p>
                        <p className="phone">
                            <i className="fas fa-phone"></i>&nbsp;
                            <strong>Phone:</strong> <a href={`tel:${props.Phone}`}>{props.Phone}</a>
                        </p>
                        <p className="website">
                            <i className="fas fa-laptop"></i>&nbsp;
                            <strong>Website:</strong> <a href={props.Website}>{props.Website}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

VenueDetails.propTypes = {
    id: PropType.number.isRequired,
    Category: PropType.string,
    Ranking: PropType.oneOfType([
        PropType.string,
        PropType.number
    ]),
    Name: PropType.string.isRequired,
    Photo: PropType.string.isRequired,
    Address: PropType.string.isRequired,
    Phone: PropType.string.isRequired,
    Cuisine: PropType.string.isRequired,
    Description: PropType.string.isRequired,
    Neighborhood: PropType.string.isRequired,
    Price: PropType.string.isRequired,
    Website: PropType.string.isRequired,
    Review: PropType.string,
    Link: PropType.string.isRequired,
    clearSpecialViews: PropType.func.isRequired,
};

export default VenueDetails
