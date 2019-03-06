import React from 'react';
import PropType from 'prop-types';

// components
import Venue from '../Venue/Venue';

// styles
import './List.scss';

const List = ({ list, isFiltered, setVenueInFocus }) => {
    const venues = list.map(row => (
        <Venue
            key={row.id}
            id={row.id}
            ranking={row.Ranking}
            name={row.Name}
            photo={row.Photo}
            cusine={row.Cuisine}
            neighborhood={row.Neighborhood}
            review={row.Review}
            website={row.Website}
            link={row.Link}
            isFiltered={isFiltered}
            setVenueInFocus={setVenueInFocus}
        />
    ))
    return (
        <div className="list">{venues}</div>
    );
};

List.propTypes = {
    list: PropType.arrayOf(PropType.exact({
        id: PropType.number.isRequired,
        Category: PropType.string.isRequired,
        Ranking: PropType.oneOfType([
            PropType.string,
            PropType.number
        ]),
        Name: PropType.string.isRequired,
        Photo: PropType.string.isRequired,
        Address: PropType.string.isRequired,
        Phone: PropType.string.isRequired,
        Cuisine: PropType.string.isRequired,
        Description: PropType.string,
        Neighborhood: PropType.string.isRequired,
        Price: PropType.string.isRequired,
        Website: PropType.string,
        Link: PropType.string.isRequired,
        Review: PropType.string,
    }).isRequired).isRequired,
    isFiltered: PropType.bool.isRequired,
    setVenueInFocus: PropType.func.isRequired,
};

export default List;