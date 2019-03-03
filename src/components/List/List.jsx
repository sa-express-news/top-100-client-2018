import React from 'react';
import PropType from 'prop-types';

// components
import Venue from '../Venue/Venue';

// styles
import './List.scss';

const List = ({ list, isFiltered }) => {
    const venues = list.map(row => (
        <Venue
            key={row.id}
            id={row.id}
            ranking={row.Ranking}
            name={row.Name}
            photo="https://projects.houstonchronicle.com/top100/images/restaurants/xochi.jpg"
            cusine={row.Cuisine}
            neighborhood={row.Neighborhood}
            review={row.Review}
            website={row.Website}
            isFiltered={isFiltered}
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
        Review: PropType.string,
    }).isRequired).isRequired,
    isFiltered: PropType.bool.isRequired,
};

export default List;