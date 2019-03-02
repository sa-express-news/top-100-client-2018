import React from 'react';
import PropType from 'prop-types';

// components
import Venue from '../Venue/Venue';

// styles
import './List.scss';

const List = ({ list }) => {
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
        />
    ))
    return (
        <div class="list">{venues}</div>
    );
};

List.propTypes = {
    list: PropType.shape({
        id: PropType.number.isRequired,
        Category: PropType.string.isRequired,
        Ranking: PropType.string.isRequired,
        Name: PropType.string.isRequired,
        Photo: PropType.string.isRequired,
        Address: PropType.string.isRequired,
        Phone: PropType.string.isRequired,
        Cuisine: PropType.string.isRequired,
        Description: PropType.string.isRequired,
        Neighborhood: PropType.string.isRequired,
        Price: PropType.string.isRequired,
        Website: PropType.string.isRequired,
        Review: PropType.string.isRequired,
    }).isRequired,
    isFiltered: PropType.bool.isRequired,
};

export default List;